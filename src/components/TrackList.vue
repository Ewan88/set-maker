<script lang="ts">
	import { getPlaylistTracks, getTracksFromHref } from '@/helpers/apiHelper';
	import { defineComponent, type PropType } from 'vue';
	import Spinner from './Spinner.vue';
	type Media = Track | Episode;

	export default defineComponent({
		props: {
			playlist: {
				type: Object as PropType<Playlist>,
				required: true,
			},
		},
		data() {
			return {
				tracks: [] as Media[],
				isLoading: true,
				hasLoaded: false,
			};
		},
		watch: {
			playlist: {
				//immediate: true,
				handler() {
					this.isLoading = true;
					this.tracks = [];
					this.populate();
				},
			},
		},
		methods: {
			async populate() {
				let response: TracksResponse = await getPlaylistTracks(
					this.playlist.id,
				);
				this.tracks = response.items.map((item) => item.track);
				let next: string | null = response.next;

				while (next !== null) {
					response = await getTracksFromHref(next);
					this.tracks = this.tracks.concat(
						response.items.map((item) => item.track),
					);
					next = response.next;
				}

				this.isLoading = false;
			},
		},
		mounted() {
			this.populate();
		},
		components: { Spinner },
	});
</script>

<template>
	<div class="tracklist-wrapper">
		<h3>{{ playlist.name }}</h3>
		<ul v-if="tracks.length > 0">
			<h3>{{ tracks.length }}</h3>
			<li v-for="track in tracks">{{ track.name }}</li>
		</ul>
		<Spinner v-if="isLoading" />
	</div>
</template>
