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

export default {
	async fetch(req) {
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
			const targetUrl = url.searchParams.get('url');
			const action = url.searchParams.get('action');

			// Validate required parameters
			if (!targetUrl) {
				return new Response(JSON.stringify({ error: 'Missing required parameters: url' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			try {
				// Create the appropriate scraper based on the url
				const scraper = ScraperFactory.createScraper(targetUrl);
				let result;

				// Execute the requested action
				switch (action) {
					case 'info':
						result = await scraper.getEventInfo();
						break;
					case 'sections':
						result = await scraper.getSections();
						break;
					default:
						result = await scraper.scrape();
						break;
				}

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
