/**
 * BaseScraper - Abstract base class for all event scrapers
 * Defines the common types that all scrapers must implement
 */
export interface SectionInfo {
	name: string;
	id: string;
}

export interface EventInfo {
	date: string;
	title: string;
	venue: string;
	location: string;
	image: string;
	mapImage: string;
	sections: SectionInfo[];
}

export abstract class BaseScraper {
	protected url: string;

	constructor(url: string) {
		this.url = url;
	}

	/**
	 * Get basic information about the event
	 * @returns Promise resolving to EventInfo object
	 */
	abstract getEventInfo(): Promise<EventInfo | null>;

	/**
	 * Main method to scrape all event data
	 * @returns Promise resolving to an object containing event info and sections
	 */
	abstract scrape(): Promise<null>;

	/**
	 * Utility method to fetch content from a URL
	 * @param url The URL to fetch
	 * @returns Promise resolving to the response text
	 */
	protected async fetchContent(url: string = this.url): Promise<string> {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
		}
		return await response.text();
	}
}
