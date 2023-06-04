<script lang="ts">
	import { defineComponent, type PropType } from 'vue';

	export default defineComponent({
		props: {
			playlist: {
				type: Object as PropType<Playlist>,
				required: true,
			},
		},
		methods: {
			async fetchTracks() {
				// call href from playlist
				// get tracks response
				// push to array
				// while next
				// push to array
				// finish loading
			},
		},
	});
</script>

<template>
	<div class="tracklist-wrapper">
		<h2>Track List</h2>
		<h3>{{ playlist.name }}</h3>
	</div>
</template>
