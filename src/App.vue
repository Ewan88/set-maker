<script lang="ts">
	import { defineComponent } from 'vue';
	import { getAuthorizationURL, getAccessToken } from './helpers/authHelper';
	import { getUserProfile } from './helpers/apiHelper';

	export default defineComponent({
		name: 'App',
		data() {
			return {
				accessToken: '',
				userProfile: null as unknown as UserProfile,
			};
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
				}
			},
		},
		mounted() {
			this.handleCallback();
		},
	});
</script>

<template>
	<body>
		<button v-if="!accessToken" @click="login()">Login via Spotify</button>
		<div v-else>
			<p>Welcome, {{ userProfile.display_name }}!</p>
		</div>
	</body>
</template>

<style lang="scss">
	@import '@/assets/styles.scss';
</style>
