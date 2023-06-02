import axios, { type AxiosResponse } from 'axios';

export async function getUserProfile(token: string): Promise<UserProfile> {
	const response = await axios.get('https://api.spotify.com/v1/me', {
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});

	return response.data;
}
