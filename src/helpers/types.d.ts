interface UserProfile {
	country: string;
	display_name: string;
	email: string;
	explicit_content: {
		filter_enabled: boolean;
		filter_locked: boolean;
	};
	external_urls: { spotify: string };
	followers: { href: string; total: number };
	href: string;
	id: string;
	images: Image[];
	product: string;
	type: string;
	uri: string;
}

interface Image {
	url: string;
	height: number | null;
	width: number | null;
}

interface PlaylistResponse {
	href: string;
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
	items: Playlist[];
}

interface Playlist {
	collaborative: boolean;
	description: string;
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: Image[];
	name: string;
	owner: {
		external_urls: {
			spotify: string;
		};
		followers: {
			href: string | null;
			total: number;
		};
		href: string;
		id: string;
		type: string;
		uri: string;
		display_name: string | null;
	};
	public: boolean;
	snapshot_id: string;
	tracks: {
		href: string;
		total: number;
	};
	type: string;
	uri: string;
}

interface TracksResponse {
	href: string;
	limit: string;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
	items: {
		added_at: Date | null;
		added_by: {
			external_urls: {
				spotify: string;
			};
			followers: {
				href: string | null;
				total: number;
			};
			href: string;
			id: string;
			type: string;
			uri: string;
		} | null;
		is_local: boolean;
		track: Track | Episode;
	}[];
}

interface Track {
	album: Album;
	artists: Artist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: {
		isrc: string;
		ean: string;
		upc: string;
	};
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	is_playable: boolean;
	linked_from: {};
	restrictions: {
		reson: string;
	};
	name: string;
	popularity: number;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
	is_local: boolean;
}

interface Album {
	album_type: string;
	total_tracks: number;
	available_markets: string[];
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: Image[];
	name: string;
	release_date_precision: string;
	restrictions: {
		reason: string;
	};
	type: string;
	uri: string;
	copyrights: {
		text: string;
		type: string;
	}[];
	external_ids: {
		isrc: string;
		ean: string;
		upc: string;
	};
	genres: string[];
	label: string;
	popularity: number;
	album_group: string;
	artists: Artist[];
}

interface Artist {
	external_urls: {
		spotify: string;
	};
	followers: {
		href: string | null;
		total: number;
	};
	genres: string[];
	href: string;
	id: string;
	images: Image[];
	name: string;
	popularity: number;
	type: string;
}

interface Episode {
	audio_preview_url: string;
	description: string;
	html_description: string;
	duration_ms: number;
	explicit: boolean;
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: Image[];
	is_playable: boolean;
	languages: string[];
	name: string;
	release_date: string;
	release_date_precision: string;
	resume_point: {
		fully_played: boolean;
		resume_position_ms: number;
	};
	type: string;
	uri: string;
	restrictions: {
		reason: string;
	};
	show: Show;
}

interface Show {
	available_markets: string[];
	copyrights: {
		text: string;
		type: string;
	}[];
	description: string;
	html_description: string;
	explicit: boolean;
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: Image[];
	is_externally_hosted: boolean;
	languages: string[];
	media_type: string;
	name: string;
	type: string;
	uri: string;
	total_episodes: number;
}
