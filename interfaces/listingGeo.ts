export interface ListingsGeo {
	type: string;
	geometry: Geometry;
	properties: Properties;
}

interface Properties {
	id: string;
	listing_url: string;
	scrape_id: string;
	last_scraped: string;
	name: string;
	summary: string;
	space: string;
	description: string;
	experiences_offered: string;
	neighborhood_overview: null;
	notes: string;
	transit: string;
	access: string;
	interaction: null;
	house_rules: string;
	thumbnail_url: string;
	medium_url: string;
	picture_url: Pictureurl;
	xl_picture_url: string;
	host_id: string;
	host_url: string;
	host_name: string;
	host_since: string;
	host_location: string;
	host_about: string;
	host_response_time: string;
	host_response_rate: number;
	host_acceptance_rate: null;
	host_thumbnail_url: string;
	host_picture_url: string;
	host_neighbourhood: null;
	host_listings_count: number;
	host_total_listings_count: number;
	host_verifications: string[];
	street: string;
	neighbourhood: null;
	neighbourhood_cleansed: string;
	neighbourhood_group_cleansed: string;
	city: string;
	state: string;
	zipcode: string;
	market: string;
	smart_location: string;
	country_code: string;
	country: string;
	latitude: string;
	longitude: string;
	property_type: string;
	room_type: string;
	accommodates: number;
	bathrooms: number;
	bedrooms: number;
	beds: number;
	bed_type: string;
	amenities: string[];
	square_feet: null;
	price: number;
	weekly_price: null;
	monthly_price: null;
	security_deposit: null;
	cleaning_fee: number;
	guests_included: number;
	extra_people: number;
	minimum_nights: number;
	maximum_nights: number;
	calendar_updated: string;
	has_availability: null;
	availability_30: number;
	availability_60: number;
	availability_90: number;
	availability_365: number;
	calendar_last_scraped: string;
	number_of_reviews: number;
	first_review: string;
	last_review: string;
	review_scores_rating: number;
	review_scores_accuracy: number;
	review_scores_cleanliness: number;
	review_scores_checkin: number;
	review_scores_communication: number;
	review_scores_location: number;
	review_scores_value: number;
	license: null;
	jurisdiction_names: null;
	cancellation_policy: string;
	calculated_host_listings_count: number;
	reviews_per_month: number;
	features: string[];
}

interface Pictureurl {
	thumbnail: boolean;
	filename: string;
	format: string;
	width: number;
	mimetype: string;
	etag: string;
	id: string;
	last_synchronized: string;
	color_summary: string[];
	height: number;
}

interface Geometry {
	type: string;
	coordinates: number[];
}
