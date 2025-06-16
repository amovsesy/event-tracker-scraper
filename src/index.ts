/**
 * Welcome to Cloudflare Workers!
 *
 * This is a template for a Scheduled Worker: a Worker that can run on a
 * configurable interval:
 * https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Run `curl "http://localhost:8787/__scheduled?cron=*+*+*+*+*"` to see your Worker in action
 * - Run `npm run deploy` to publish your Worker
 *
 * Bind resources to your Worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { ScraperFactory } from './scrapers/scraper-factory';
import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { event } from './lib/server/db/schema';
import { formatInTimeZone } from 'date-fns-tz';

export default {
	async fetch(req, env) {
		const db = drizzle(env.DB);
		const url = new URL(req.url);

		// Check if this is a scheduled test request
		if (url.pathname === '/__scheduled') {
			url.searchParams.append('cron', '* * * * *');
			return new Response(
				`To test the scheduled handler, ensure you have used the "--test-scheduled" then try running "curl ${url.href}".`,
			);
		}

		// Handle scraper requests
		if (url.pathname === '/scrape') {
			const eventID = url.searchParams.get('id');
			const action = url.searchParams.get('action');
			const forceRefresh = url.searchParams.get('refresh') === 'true';

			// Validate required parameters
			if (!eventID) {
				return new Response(JSON.stringify({ error: 'Missing required parameters: id' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			// Get event info from DB
			const eventData = await db
				.select()
				.from(event)
				.where(eq(event.id, parseInt(eventID)))
				.get();

			// Return 400 if event not found
			if (!eventData) {
				return new Response(JSON.stringify({ error: 'Event not found' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			const targetUrl = eventData.url;

			try {
				// Create the appropriate scraper based on the url
				const scraper = ScraperFactory.createScraper(targetUrl);
				let result;

				// Execute the requested action
				switch (action) {
					case 'info':
						result = eventData.data && !forceRefresh ? JSON.parse(eventData.data) : await scraper.getEventInfo();
						break;
					default:
						return new Response(JSON.stringify({ error: 'Unsupported action' }), {
							status: 400,
							headers: { 'Content-Type': 'application/json' },
						});
				}

				// Update the event data in the database
				const currentDate = new Date().toISOString();

				// Get the location from the result and determine timezone
				const locationParts = result.location ? result.location.split(', ') : [];
				const state = locationParts[1] || '';

				// Map location to timezone - this is a simple mapping for common US cities/states
				// For a production app, consider using a more comprehensive timezone database
				const getTimezoneFromLocation = (state: string): string => {
					// Simple mapping of states to timezones
					const stateToTimezone: Record<string, string> = {
						AL: 'America/Chicago',
						AK: 'America/Anchorage',
						AZ: 'America/Phoenix',
						AR: 'America/Chicago',
						CA: 'America/Los_Angeles',
						CO: 'America/Denver',
						CT: 'America/New_York',
						DE: 'America/New_York',
						FL: 'America/New_York',
						GA: 'America/New_York',
						HI: 'Pacific/Honolulu',
						ID: 'America/Denver',
						IL: 'America/Chicago',
						IN: 'America/New_York',
						IA: 'America/Chicago',
						KS: 'America/Chicago',
						KY: 'America/New_York',
						LA: 'America/Chicago',
						ME: 'America/New_York',
						MD: 'America/New_York',
						MA: 'America/New_York',
						MI: 'America/New_York',
						MN: 'America/Chicago',
						MS: 'America/Chicago',
						MO: 'America/Chicago',
						MT: 'America/Denver',
						NE: 'America/Chicago',
						NV: 'America/Los_Angeles',
						NH: 'America/New_York',
						NJ: 'America/New_York',
						NM: 'America/Denver',
						NY: 'America/New_York',
						NC: 'America/New_York',
						ND: 'America/Chicago',
						OH: 'America/New_York',
						OK: 'America/Chicago',
						OR: 'America/Los_Angeles',
						PA: 'America/New_York',
						RI: 'America/New_York',
						SC: 'America/New_York',
						SD: 'America/Chicago',
						TN: 'America/Chicago',
						TX: 'America/Chicago',
						UT: 'America/Denver',
						VT: 'America/New_York',
						VA: 'America/New_York',
						WA: 'America/Los_Angeles',
						WV: 'America/New_York',
						WI: 'America/Chicago',
						WY: 'America/Denver',
					};

					return stateToTimezone[state] || 'UTC';
				};

				// Get timezone for the event location
				const timezone = getTimezoneFromLocation(state);

				// Parse the date string and convert to ISO in the event's timezone
				let eventDateIso: string | null = null;
				if (result.date) {
					try {
						// Parse the date in the format "Sat Sep 27 2025 7:00 PM"
						const dateObj = new Date(result.date);
						// Format in the event's timezone and convert to ISO
						eventDateIso = formatInTimeZone(dateObj, timezone, "yyyy-MM-dd'T'HH:mm:ssXXX");
					} catch (error) {
						console.error('Error parsing event date:', error);
					}
				}

				await db
					.update(event)
					.set({
						data: JSON.stringify(result),
						updatedAt: currentDate,
						eventDate: eventDateIso,
					})
					.where(eq(event.id, parseInt(eventID)))
					.run();

				return new Response(JSON.stringify(result), {
					headers: { 'Content-Type': 'application/json' },
				});
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
				return new Response(JSON.stringify({ error: errorMessage }), {
					status: 500,
					headers: { 'Content-Type': 'application/json' },
				});
			}
		}

		// Default response for unknown routes
		return new Response('Not found', { status: 404 });
	},

	// The scheduled handler is invoked at the interval set in our wrangler.jsonc's
	// [[triggers]] configuration.
	async scheduled(event): Promise<void> {
		// async scheduled(event, env, ctx): Promise<void> {
		// A Cron Trigger can make requests to other endpoints on the Internet,
		// publish to a Queue, query a D1 Database, and much more.
		//
		// We'll keep it simple and make an API call to a Cloudflare API:
		const resp = await fetch('https://api.cloudflare.com/client/v4/ips');
		const wasSuccessful = resp.ok ? 'success' : 'fail';

		// You could store this result in KV, write to a D1 Database, or publish to a Queue.
		// In this template, we'll just log the result:
		console.log(`trigger fired at ${event.cron}: ${wasSuccessful}`);
	},
} satisfies ExportedHandler<Env>;
