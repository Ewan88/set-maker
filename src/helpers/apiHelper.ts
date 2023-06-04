import axios, { type AxiosResponse } from 'axios';

export async function getUserProfile(token: string): Promise<UserProfile> {
	const response = await axios.get('https://api.spotify.com/v1/me', {
		headers: { Authorization: `Bearer ${token}` },
	});

	return response.data;
}

export async function getUserPlaylists(
	token: string,
): Promise<PlaylistResponse> {
	const response: AxiosResponse<PlaylistResponse> = await axios.get(
		'https://api.spotify.com/v1/me/playlists',
		{
			headers: { Authorization: `Bearer ${token}` },
		},
	);

	return response.data;
}

export async function getPlaylistsFromHref(
	token: string,
	href: string,
): Promise<PlaylistResponse> {
	const response: AxiosResponse<PlaylistResponse> = await axios.get(href, {
		headers: { Authorization: `Bearer ${token}` },
	});

	return response.data;
}

export async function getPlaylistTracks(
	token: string,
	playlistId: string,
): Promise<TracksResponse> {
	const response: AxiosResponse<TracksResponse> = await axios.get(
		`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
		{
			headers: { Authorization: `Bearer ${token}` },
		},
	);

	return response.data;
}
