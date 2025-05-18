import { BaseScraper, EventInfo, SectionInfo } from '../base-scraper';
import states from 'us-state-converter';
import { StubhubEventData } from './types';

export class StubhubScraper extends BaseScraper {
	constructor(url: string) {
		super(url);
	}

	/**
	 * Extracts and parses JSON data from the script tag with id="index-data"
	 * @returns Parsed JSON data from the script tag
	 */
	private async extractEventData(): Promise<StubhubEventData> {
		const content = await this.fetchContent();

		// Find the script tag with id="index-data"
		const scriptTagRegex = /<script id="index-data" type="application\/json">(.*?)<\/script>/s;
		const match = content.match(scriptTagRegex);

		if (!match || !match[1]) {
			throw new Error('Could not find index-data script tag in the StubHub page');
		}

		try {
			// Parse the content of the script tag as JSON
			return JSON.parse(match[1]);
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';
			throw new Error(`Failed to parse JSON data from StubHub: ${errorMessage}`);
		}
	}

	async getEventInfo(): Promise<EventInfo | null> {
		try {
			const indexData = await this.extractEventData();
			const stateObj = states(indexData.venueStateProvinceName);

			// Make sure stateObj is a single StateInfo object before accessing properties
			const stateCode =
				typeof stateObj === 'object' && !Array.isArray(stateObj) && stateObj !== null ? stateObj.usps : indexData.venueStateProvinceName; // Fallback to the original state name

			// Convert availableTicketClassPairs object to array of objects with id and name properties
			const sections: SectionInfo[] = Object.entries(indexData.grid.availableTicketClassPairs).map(([id, name]) => ({
				id,
				name: name as string,
			}));

			return {
				title: indexData.eventName,
				date: indexData.formattedEventDateTime,
				venue: indexData.venueName,
				location: `${indexData.venueCity}, ${stateCode}`,
				image: indexData.categoryImageUrl,
				mapImage: indexData.svgMapUrl,
				sections,
			};
		} catch (error) {
			console.error('Error getting event info from StubHub:', error);
		}

		return null;
	}

	async scrape(): Promise<null> {
		return null;
	}
}
