<script lang="ts">
	import { defineComponent } from 'vue';
	import { getUserPlaylists, getPlaylistsFromHref } from '@/helpers/apiHelper';
	import PlaylistItem from './PlaylistItem.vue';
	import Spinner from './LoadingSpinner.vue';

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
				selectedPlaylist: null as string | null,
			};
		},
		methods: {
			async populate() {
				let response: PlaylistResponse = await getUserPlaylists();
				this.playlists = this.playlists.concat(response.items);
				let next: string | null = response.next;
				while (next !== null) {
					response = await getPlaylistsFromHref(next);
					this.playlists = this.playlists.concat(response.items);
					next = response.next;
				}
				this.isLoading = false;
			},
			handlePlaylistSelected(playlist: Playlist) {
				this.selectedPlaylist = playlist.id;
				this.$emit('playlist-selected', playlist);
			},
			isSelected(playlist: Playlist) {
				return (
					this.selectedPlaylist !== null &&
					playlist.id === this.selectedPlaylist
				);
			},
		},
		mounted() {
			this.populate();
		},
		components: { PlaylistItem, Spinner },
	});
</script>

<template>
	<div class="playlist-wrapper">
		<div v-if="playlists.length > 0">
			<PlaylistItem
				v-for="playlist of playlists"
				:key="playlist.id"
				:playlist="playlist"
				@playlist-selected="handlePlaylistSelected"
				:class="{ selected: isSelected(playlist) }"
			/>
		</div>
		<Spinner v-if="isLoading" />
	</div>
</template>
