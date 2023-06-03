<script lang="ts">
	import { defineComponent } from 'vue';
	import { getUserPlaylists, getPlaylistsFromHref } from '@/helpers/apiHelper';
	import PlaylistItem from './PlaylistItem.vue';

	export default defineComponent({
		props: {
			accessToken: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				playlists: [] as Playlist[],
				isLoading: true,
			};
		},
		methods: {
			async populate() {
				let response: PlaylistResponse = await getUserPlaylists(
					this.accessToken,
				);
				response.items.forEach((item) => {
					this.playlists.push(item);
				});
				let next: string | null = response.next;
				while (next !== null) {
					response = await getPlaylistsFromHref(this.accessToken, next);
					response.items.forEach((item) => {
						this.playlists.push(item);
					});
					next = response.next;
				}
				this.isLoading = false;
			},
		},
		mounted() {
			this.populate();
		},
		components: { PlaylistItem },
	});
</script>

<template>
	<div class="spinner" v-if="isLoading"></div>
	<div v-if="playlists.length > 0" class="playlists-wrapper">
		<PlaylistItem
			v-for="playlist of playlists"
			:key="playlist.id"
			:playlist="playlist"
		/>
	</div>
</template>
