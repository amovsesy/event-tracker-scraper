export type StubhubEventData = {
	appName: string;
	grid: EventGrid;
	eventName: string;
	eventId: number;
	isPrimaryEvent: boolean;
	eventMetadata: EventMetadata;
	ticketClasses: TicketClass[];
	instantDeliveryAvailable: boolean;
	sellerListingNotes: SellerListingNote[];
	venueMapConfiguration: Record<string, unknown>;
	ticketTypeGroups: TicketTypeGroup[];
	svgMapUrl: string;
	sectionViews: number;
	availableQuantities: number[];
	totalListings: number;
	availableTickets: number;
	formattedAvailableTickets: string;
	categoryUrl: string;
	backUrl: string;
	sellLink: string;
	categoryTitle: string;
	categoryName: string;
	categoryImageUrl: string;
	categoryImageCredit: string;
	categoryReformatImageUrl: string;
	categoryReformatImageCredit: string;
	venueId: number;
	venueName: string;
	venueCity: string;
	venueCountry: string;
	venueStateProvinceId: number;
	venueCountryCode: string;
	venueStateProvinceName: string;
	venueConfigId: number;
	formattedEventDateTime: string;
	eventUrl: string;
	eventRestrictions: FeatureMessage;
	isGeneralAdmissionOnly: boolean;
	topSellingSectionIds: number[];
	numberOfPeopleViewedEventInPastHour: number;
	privacyPolicyMessage: FeatureMessage;
	mapBoxSpriteVersion: number;
	simpleMode: boolean;
	header: Header;
	footer: Footer;
	formattedLocalEventDateTime: string;
	daysToEvent: number;
	geoJsonMetadata: GeoJsonMetadata;
	eventState: number;
	parentCategoryId: number;
	showSthRelistMerchBanner: boolean;
	soldOutMessage: FeatureMessage;
	showEstimatedFeeToggle: boolean;
	showSectionHighlightMap: boolean;
	histogram: Histogram;
	isFavorite: boolean;
	isPercentDiscountBannerEnabled: boolean;
	venueConfigFormatType: number;
	aggregateFavorites: number;
	highDemandMessage: FeatureMessage;
	priceDisplayStrategy: number;
	gridListingPriceAndFeeDisclosureStrategy: number;
	listingComplianceDisplayStrategy: ListingComplianceDisplayStrategy;
	mapBoxMapVersion: number;
	geoJsonUrl: string;
	geoJsonInlayUrl: string;
	geoJsonEmptySeatsOverlayUrl: string;
	showMapBox: boolean;
	isCrossListedOnRelistNotAllowed: boolean;
	shouldRequestCheckoutDrivenPaymentTypes: boolean;
	venueImageUrl: string;
	showRowLayerByDefault: boolean;
	leagueId: number;
};

export type EventGrid = {
	items: ListingItem[];
	quantity: number;
	isInitialQuantityChange: boolean;
	sortBy: string;
	venueConfigId: number;
	sectionIds: number[];
	rowIds: number[];
	seatIds: number[];
	ticketClassIds: number[];
	sortDirection: number;
	listingNoteIds: number[];
	ticketTypeGroupIds: number[];
	inventoryUpdates: InventoryUpdates;
	sectionViews: number;
	estimatedFees: boolean;
	priceAndFeeDisclosure: FeatureMessage;
	listingPriceAndFeeDisclosure: FeatureMessage;
	instantDelivery: boolean;
	favorites: boolean;
	newListingsOnly: boolean;
	priceDropListingsOnly: boolean;
	priceDropSeenListings: Record<string, unknown>;
	betterValueTickets: boolean;
	betterValueMessage: FeatureMessage;
	sellerAllListingHidden: boolean;
	sellerSomeListingHidden: boolean;
	sellerTotalListings: number;
	sellerListingHiddenPreUploadable: boolean;
	minPrice: number;
	maxPrice: number;
	averagePrice: number;
	gridMinPrice: number;
	gridMaxPrice: number;
	minPriceWithFilters: number;
	maxPriceWithFilters: number;
	priceBuckets: PriceBucket[];
	cheapestFeatureIdsForQty: string[];
	formattedMinPrice: string;
	formattedMaxPrice: string;
	highPricePercentage: string;
	lowPrice: string;
	highPrice: string;
	availableTicketClassPairs: Record<string, string>;
	xTicketsAtCheapestPrice: number;
	eventId: number;
	isGeneralAdmissionOnly: boolean;
	isParkingEvent: boolean;
	totalFilteredListings: number;
	excludeSoldListings: boolean;
	removeObstructedView: boolean;
	hasFlexiblePricing: boolean;
	conciergeTickets: boolean;
	hasSponsoredListing: boolean;
	hasFlashSaleCarousel: boolean;
	sectionLikelyToSellOutMessage: FeatureMessage;
	totalCount: number;
	currentPage: number;
	pageSize: number;
	isPaginatedEventDetail: boolean;
	itemsRemaining: number;
};

export type ListingItem = {
	id: number;
	eventId: number;
	section: string;
	sectionId: number;
	sectionMapName: string;
	sectionType: number;
	row: string;
	seat?: string;
	seatFrom?: string;
	seatTo?: string;
	seatFromInternal?: string;
	hasSeatDetails: boolean;
	hasSeatDetailsUS: boolean;
	availableTickets: number;
	listingPreviewPriceAndFeeDisclosure: FeatureMessage;
	gridListingPriceAndFeeDisclosure: FeatureMessage;
	soldXTimeAgoSiteMessage?: FeatureMessage;
	inventoryListingScore?: InventoryListingScore;
	showRecentlySold: boolean;
	showPartnershipLogo: boolean;
	availableQuantities: number[];
	ticketClass: number;
	ticketClassName: string;
	maxQuantity: number;
	bestSellingInSectionMessage?: FeatureMessage;
	lastTicketInSectionMessage?: FeatureMessage;
	hasListingNotes: boolean;
	listingNotes: ListingNote[];
	rowId: number;
	isUsersListing: boolean;
	isPreUploaded: boolean;
	rowContent: string;
	isSpeculativeRow: boolean;
	rawPrice: number;
	price: string;
	priceWithFees?: string;
	ticketTypeId: number;
	ticketTypeName: string;
	ticketTypeGroupId: number;
	listingTypeId: number;
	listingCurrencyCode: string;
	buyerCurrencyCode: string;
	faceValue?: number;
	faceValueCurrencyCode?: string;
	vfsUrl: string;
	formattedActiveSince: string;
	formattedDealScore?: string;
	isSeatedTogether: boolean;
	showVfsInListing: boolean;
	hideSeatAndRowInfo: boolean;
	aipHash: string;
	isMLBVerified: boolean;
	isStanding: boolean;
	createdDateTime: string;
	isHighestListingScore: boolean;
	isMostAffordable: boolean;
	isSponsored: boolean;
	isCheapestListing: boolean;
	isBestView: boolean;
	isFavorite: boolean;
	aggregateFavorites: number;
	listingId: number;
	canBeRelisted: boolean;
	formattedFees?: string;
};

export type InventoryListingScore = {
	discount: string;
	starRating: number;
	dealScore: string;
	seatQualityScore: string;
	listingRating: number;
};

export type ListingNote = {
	listingNoteId: number;
	listingNoteContentId: number;
	formattedListingNoteContent: string;
	listingNoteTypeId: number;
	showToBuyer: boolean;
	hideInMock: boolean;
	siteAddedListingNote: boolean;
	aisleListingNoteWithSplit: boolean;
	listingNoteDescriptionContentId: number;
	formattedListingNoteDescription: string;
};

export type InventoryUpdates = {
	obfuscatedSoldTicketsContent: string;
	soldTicketsContent: string;
	obfuscatedNewTicketsFilterContent: string;
	newTicketsFilterContent: string;
	inventoryDecreasedMessage: string;
	inventoryDecreasedDisclaimer: string;
	inventoryDecreasedPercentageMessage: string;
	inventoryDecreasedPercentageDisclaimer: string;
	inventoryUpdatesCutoffDateTime: string;
};

export type PriceBucket = {
	minPrice: number;
	maxPrice: number;
	rank: number;
	formattedMinPrice: string;
	formattedMaxPrice: string;
	formattedDisplayText: string;
};

export type FeatureMessage = {
	message?: string;
	disclaimer?: string;
	qualifier?: string;
	hasValue: boolean;
	featureTrackingKey?: string;
};

export type Header = {
	profileUrl: ProfileUrl;
	marketplaceDisclosure: FeatureMessage;
};

export type ProfileUrl = {
	id: number;
	text: string;
	url: string;
	minPrice: number;
	isFavorite: boolean;
	aggregateFavorites: number;
	isVenue: boolean;
};

export type Footer = {
	countries: Country[];
	companyLinks: Link[];
	supportLinks: Link[];
	getLocationSettingsUrl: string;
};

export type Country = {
	countryName?: string;
	url: string;
	countryCode: string;
};

export type Link = {
	id: number;
	text: string;
	url: string;
	minPrice: number;
	isFavorite: boolean;
	aggregateFavorites: number;
	isVenue: boolean;
};

export type GeoJsonMetadata = {
	geoJsonMapVersion: number;
	geoJsonMapType: number;
	hasRow: boolean;
	hasPOI: boolean;
	hasZone: boolean;
	isHybridMap: boolean;
	hasSeatMap: boolean;
};

export type Histogram = {
	adjustedMaxPrice: number;
	buckets: HistogramBucket[];
};

export type HistogramBucket = {
	startPrice: number;
	endPrice: number;
	sectionIds: number[];
	frequency: number;
};

export type ListingComplianceDisplayStrategy = {
	isDisplayedOnListingsGrid: boolean;
	isSeatInfoRequired: boolean;
	isSeatInfoRequiredUS: boolean;
	isTraderInfoRequired: boolean;
	isConnectedSellerInfoRequired: boolean;
	isFaceValueInfoRequired: boolean;
};

export type TicketClass = {
	ticketClassId: number;
	name: string;
	cssPostFix: string;
	minListingsRawPriceMessage: string;
	minListingsRawPrice: number;
	isSoldOut: boolean;
	isSellingOutSoon: boolean;
	isSeated: boolean;
	isStanding: boolean;
	isSellingFast: boolean;
	showSeatedTogetherLabel: boolean;
};

export type SellerListingNote = {
	listingNoteId: number;
	listingNoteTypeId: number;
	formattedListingNoteContent: string;
	formattedListingNoteDescription: string;
	hasAvailableListings: boolean;
};

export type TicketTypeGroup = {
	ticketTypeGroupId: number;
	buyerContent: string;
};

export type EventMetadata = {
	metadataForAllCategoriesInEvent: Record<string, unknown>;
};
