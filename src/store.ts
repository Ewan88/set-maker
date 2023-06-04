interface State {
	accessToken: string | null;
}

const state: State = {
	accessToken: null,
};

export function setAccessToken(token: string) {
	state.accessToken = token;
}

export function getAccessToken(): string | null {
	return state.accessToken;
}

export default {
	setAccessToken,
	getAccessToken,
};
