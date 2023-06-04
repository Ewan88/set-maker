import axios, { type AxiosResponse } from 'axios';
import store from '../store';

export async function getUserProfile(): Promise<UserProfile> {
	const response = await axios.get('https://api.spotify.com/v1/me', {
		headers: { Authorization: `Bearer ${store.getAccessToken()}` },
	});

	return response.data;
}

export async function getUserPlaylists(): Promise<PlaylistResponse> {
	const response: AxiosResponse<PlaylistResponse> = await axios.get(
		'https://api.spotify.com/v1/me/playlists',
		{
			headers: { Authorization: `Bearer ${store.getAccessToken()}` },
		},
	);

	return response.data;
}

export async function getPlaylistsFromHref(
	href: string,
): Promise<PlaylistResponse> {
	const response: AxiosResponse<PlaylistResponse> = await axios.get(href, {
		headers: { Authorization: `Bearer ${store.getAccessToken()}` },
	});

	return response.data;
}

export async function getPlaylistTracks(
	playlistId: string,
): Promise<TracksResponse> {
	const response: AxiosResponse<TracksResponse> = await axios.get(
		`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
		{
			headers: { Authorization: `Bearer ${store.getAccessToken()}` },
		},
	);

	return response.data;
}

export async function getTracksFromHref(href: string): Promise<TracksResponse> {
	const response: AxiosResponse<TracksResponse> = await axios.get(href, {
		headers: { Authorization: `Bearer ${store.getAccessToken()}` },
	});

	return response.data;
}
