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
