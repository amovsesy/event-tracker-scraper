import { BaseScraper, EventInfo } from '../base-scraper';

export class SeatgeekScraper extends BaseScraper {
	constructor(url: string) {
		super(url);
	}

	async getEventInfo(): Promise<EventInfo | null> {
		// const content = await this.fetchContent();
		// Implementation would parse the HTML/JSON from SeatGeek
		// This is a placeholder implementation
		return null;
	}

	async scrape(): Promise<null> {
		return null;
	}
}
