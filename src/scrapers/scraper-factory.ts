import { BaseScraper } from './base-scraper';
import { TicketmasterScraper } from './ticketmaster/ticketmaster-scraper';
import { StubhubScraper } from './stubhub/stubhub-scraper';
import { SeatgeekScraper } from './seatgeek/seatgeek-scraper';

export class ScraperFactory {
	static createScraper(url: string): BaseScraper {
		const hostname = new URL(url).hostname;
		// Extract the domain name without TLD (e.g., 'ticketmaster' from 'www.ticketmaster.com')
		const domainParts = hostname.split('.');
		const site = domainParts.length > 2 ? domainParts[1] : domainParts[0];

		switch (site.toLowerCase()) {
			case 'ticketmaster':
				return new TicketmasterScraper(url);
			case 'stubhub':
				return new StubhubScraper(url);
			case 'seatgeek':
				return new SeatgeekScraper(url);
			default:
				throw new Error(`Unsupported scraper site: ${site}`);
		}
	}
}
