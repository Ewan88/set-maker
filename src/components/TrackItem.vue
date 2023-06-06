<script lang="ts">
	import { defineComponent, type PropType } from 'vue';

	export default defineComponent({
		props: {
			track: {
				type: Object as PropType<Track>,
				required: true,
			},
		},
		methods: {
			displayDuration(ms: number) {
				const date = new Date(ms);
				return `${date.getMinutes()}:${date.getSeconds()}`;
			},
		},
	});
</script>

<template>
	<div class="playlist-item-wrapper">
		<img
			v-if="track.album.images.length > 0"
			:src="track.album.images[track.album.images.length - 1].url"
		/>
		<div class="name-wrapper">
			<span>{{ track.name }}</span>
			<span v-for="artist in track.artists">{{ artist.name }}</span>
		</div>
		<span>{{ track.album.name }}</span>
		<span>{{ displayDuration(track.duration_ms) }}</span>
	</div>
</template>

<style scoped>
	img {
		width: 45px;
		height: 45px;
		border-radius: 15%;
		margin: 5px;
	}

	.name-wrapper {
		display: flex;
		flex-direction: column;
	}

	span {
		font-size: small;
	}
</style>
