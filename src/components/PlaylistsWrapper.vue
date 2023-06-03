<script lang="ts">
	import { defineComponent } from 'vue';
	import { getUserPlaylists, getPlaylistsFromHref } from '@/helpers/apiHelper';

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
	});
</script>

<template>
	<div v-if="isLoading"></div>
	<ul>
		<li v-for="playlist in playlists" :key="playlist.id">
			{{ playlist.name }}
		</li>
	</ul>
</template>
