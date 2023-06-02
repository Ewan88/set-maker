import creds from '../credentials.json';
import axios, { type AxiosResponse } from 'axios';

const clientId = creds.clientId;
const redirectUri = 'https://localhost:8080/callback';

export async function getAuthorizationURL(): Promise<string> {
	const codeVerifier = generateRandomString(128);

	const url = await generateCodeChallenge(codeVerifier).then(
		(codeChallenge) => {
			const state = generateRandomString(16);
			const scope = 'user-read-private user-read-email';

			localStorage.setItem('code_verifier', codeVerifier);

			const args = new URLSearchParams({
				response_type: 'code',
				client_id: clientId,
				scope: scope,
				redirect_uri: redirectUri,
				state,
				code_challenge_method: 'S256',
				code_challenge: codeChallenge,
			});

			return 'https://accounts.spotify.com/authorize?' + args;
		},
	);

	return url;

	// const urlParams = new URLSearchParams(window.location.search)
	// let code = urlParams.get('code')
	// return await getAccessToken(code)
}

export async function getAccessToken(code: string): Promise<string> {
	const codeVerifier = localStorage.getItem('code_verifier');
	const body = new URLSearchParams({
		grant_type: 'authorization_code',
		code: code,
		redirect_uri: redirectUri,
		client_id: clientId,
		code_verifier: codeVerifier!,
	});

	const response: AxiosResponse<{ access_token: string }> = await axios.post(
		'https://accounts.spotify.com/api/token',
		body,
	);
	return response.data.access_token;
}

function generateRandomString(length: number): string {
	let text = '';
	const possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

async function generateCodeChallenge(codeVerifier: string) {
	const data = new TextEncoder().encode(codeVerifier);
	const digest = await window.crypto.subtle.digest('SHA-256', data);
	return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');
}
