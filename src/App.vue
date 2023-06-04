<script lang="ts">
	import { defineComponent, ref } from 'vue';
	import { getAuthorizationURL, getAccessToken } from './helpers/authHelper';
	import { getUserProfile } from './helpers/apiHelper';
	import PlaylistWrapper from './components/PlaylistWrapper.vue';
	import TrackList from './components/TrackList.vue';
	import store from './store';

	export default defineComponent({
		name: 'App',
		data() {
			return {
				userProfile: null as UserProfile | null,
				selectedPlaylist: null as Playlist | null,
				accessToken: store.getAccessToken(),
			};
		},
		components: {
			PlaylistWrapper,
			TrackList,
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
					const accessToken = await getAccessToken(code);
					store.setAccessToken(accessToken);
					this.accessToken = accessToken;
					this.userProfile = await getUserProfile();
					window.history.replaceState(
						{},
						document.title,
						window.location.pathname,
					);
				}
			},
			handlePlaylistSelected(playlist: Playlist) {
				this.selectedPlaylist = playlist;
			},
		},
		mounted() {
			this.handleCallback();
		},
	});
</script>

<template>
	<button v-if="!accessToken" @click="login()">Login via Spotify</button>
	<div v-else class="app-wrapper">
		<PlaylistWrapper
			:access-token="accessToken"
			@playlist-selected="handlePlaylistSelected"
		></PlaylistWrapper>
		<TrackList v-if="selectedPlaylist" :playlist="selectedPlaylist"></TrackList>
	</div>
</template>

<style lang="scss">
	@import '@/assets/styles.scss';
</style>
