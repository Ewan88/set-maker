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
				const minutes = date.getMinutes();
				const seconds = date.getSeconds().toString().padStart(2, '0');
				return `${minutes}:${seconds}`;
			},
		},
	});
</script>

<template>
	<div class="track-item-wrapper">
		<div class="image-wrapper">
			<img
				v-if="track.album.images.length > 0"
				:src="track.album.images[track.album.images.length - 1].url"
			/>
			<div class="name-wrapper">
				<div>{{ track.name }}</div>
				<div class="artist-wrapper">
					<div v-for="(artist, index) in track.artists" class="artist">
						<div class="artist-text">{{ artist.name }}</div>
						<div v-if="index !== track.artists.length - 1">,</div>
					</div>
				</div>
			</div>
		</div>
		<div class="album">{{ track.album.name }}</div>
		<div class="duration">{{ displayDuration(track.duration_ms) }}</div>
	</div>
</template>

<style scoped>
	.image-wrapper {
		flex: 1;
		max-width: calc(100% - 5rem);
		display: flex;
		align-items: center;
	}

	img {
		width: 45px;
		height: 45px;
		border-radius: 15%;
		margin: 5px;
	}

	.name-wrapper {
		font-size: 1em;
		display: flex;
		flex-direction: column;
	}

	div {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.artist-wrapper {
		display: flex;
	}

	.artist {
		display: flex;
		font-size: 0.75em;
		padding-right: 5px;
	}

	.artist-text {
		margin: none;
	}

	.artist-text:hover {
		color: rgb(178, 115, 175);
		cursor: pointer;
	}

	.album {
		flex: 1;
		text-align: center;
		text-overflow: ellipsis;
		margin: 0 2rem;
	}

	.album:hover {
		color: rgb(178, 115, 175);
		cursor: pointer;
	}

	.duration {
		margin-right: 2rem;
	}
</style>
