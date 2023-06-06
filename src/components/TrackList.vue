<script lang="ts">
	import { getPlaylistTracks, getTracksFromHref } from '@/helpers/apiHelper';
	import { defineComponent, type PropType } from 'vue';
	import Spinner from './Spinner.vue';
	import TrackItem from './TrackItem.vue';

	export default defineComponent({
		props: {
			playlist: {
				type: Object as PropType<Playlist>,
				required: true,
			},
		},
		data() {
			return {
				tracks: [] as Track[],
				isLoading: true,
			};
		},
		watch: {
			playlist: {
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
				this.tracks = response.items
					.filter((item) => item.track.type == 'track')
					.map((item) => item.track as Track);
				let next: string | null = response.next;

				while (next !== null) {
					response = await getTracksFromHref(next);
					this.tracks = this.tracks.concat(
						response.items
							.filter((item) => item.track.type == 'track')
							.map((item) => item.track as Track),
					);
					next = response.next;
				}

				this.isLoading = false;
			},
		},
		mounted() {
			this.populate();
		},
		components: { Spinner, TrackItem },
	});
</script>

<template>
	<div class="tracklist-wrapper">
		<h3>{{ playlist.name }}</h3>
		<TrackItem
			v-if="tracks.length > 0"
			v-for="track of tracks"
			:key="track.id"
			:track="track"
		/>
		<Spinner v-if="isLoading" />
	</div>
</template>
