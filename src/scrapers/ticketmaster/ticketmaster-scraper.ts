import { BaseScraper, EventInfo } from '../base-scraper';

export class TicketmasterScraper extends BaseScraper {
	constructor(url: string) {
		super(url);
	}

	async getEventInfo(): Promise<EventInfo | null> {
		return null;
	}

	async scrape(): Promise<null> {
		return null;
	}
}
