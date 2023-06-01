import creds from '../credentials.json'

const clientId = creds.clientId
const redirectUri = 'https://localhost:8080/callback'

export default async function requestUserAuthentication() {
	let codeVerifier = generateRandomString(128)

	generateCodeChallenge(codeVerifier).then((codeChallenge) => {
		let state = generateRandomString(16)
		let scope = 'user-read-private user-read-email'

		localStorage.setItem('code_verifier', codeVerifier)

		let args = new URLSearchParams({
			response_type: 'code',
			client_id: clientId,
			scope: scope,
			redirect_uri: redirectUri,
			state,
			code_challenge_method: 'S256',
			code_challenge: codeChallenge
		})
		;(<any>window).location = 'https://accounts.spotify.com/authorize?' + args
	})

	const urlParams = new URLSearchParams(window.location.search)
	let code = urlParams.get('code')
    if (code) { 
        setAccessToken(code);
    }
}

async function setAccessToken(code: string) {
	let codeVerifier = localStorage.getItem('code_verifier')
	if (codeVerifier) {
		let body = new URLSearchParams({
			grant_type: 'authorization_code',
			code: code,
			redirect_uri: redirectUri,
			client_id: clientId,
			code_verifier: codeVerifier
		})

		const response = fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: body
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('HTTP status ' + response.status)
				}
				return response.json()
			})
			.then((data) => {
				localStorage.setItem('access_token', data.access_token)
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}
}

function generateRandomString(length: number): string {
	let text = ''
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}

async function generateCodeChallenge(codeVerifier: string) {
	const data = new TextEncoder().encode(codeVerifier)
	const digest = await window.crypto.subtle.digest('SHA-256', data)
	return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '')
}
