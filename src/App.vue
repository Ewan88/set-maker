<script lang="ts">
	import { defineComponent } from 'vue';
	import { getAuthorizationURL, getAccessToken } from './helpers/authHelper';
	import { getUserProfile } from './helpers/apiHelper';
	import PlaylistsWrapper from './components/PlaylistsWrapper.vue';

	export default defineComponent({
		name: 'App',
		data() {
			return {
				accessToken: '',
				userProfile: null as unknown as UserProfile,
			};
		},
		components: {
			PlaylistsWrapper: PlaylistsWrapper,
		},
		methods: {
			async login() {
				const authUrl = await getAuthorizationURL();
				window.location.assign(authUrl);
			},
			async handleCallback() {
				const urlParams = new URLSearchParams(window.location.search);
				const code = urlParams.get('code');
				if (code) {
					this.accessToken = await getAccessToken(code);
					this.userProfile = await getUserProfile(this.accessToken);
					window.history.replaceState(
						{},
						document.title,
						window.location.pathname,
					);
				}
			},
		},
		mounted() {
			this.handleCallback();
		},
	});
</script>

<template>
	<button v-if="!accessToken" @click="login()">Login via Spotify</button>
	<PlaylistsWrapper v-else :access-token="accessToken"></PlaylistsWrapper>
</template>

<style lang="scss">
	@import '@/assets/spinner.scss';
	@import '@/assets/styles.scss';
</style>
