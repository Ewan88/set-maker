<script lang="ts">
	import { defineComponent, type PropType } from 'vue';

	export default defineComponent({
		data() {
			return {
				isHovering: false,
			};
		},
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
		<div
			class="image-wrapper"
			@mouseenter="isHovering = true"
			@mouseleave="isHovering = false"
		>
			<img
				v-if="track.album.images.length > 0"
				:src="track.album.images[track.album.images.length - 1].url"
			/>
			<div class="play-icon">
				<i v-if="isHovering" class="material-icons">play_arrow</i>
			</div>
			<div class="name-wrapper">
				<div>{{ track.name }}</div>
				<div class="artist-wrapper">
					<div
						v-for="(artist, index) in track.artists"
						class="artist"
						:key="index"
					>
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

<style scoped lang="scss">
	.image-wrapper {
		flex: 1;
		max-width: calc(100% - 5rem);
		display: flex;
		align-items: center;
	}

	.play-icon {
		width: 2rem;
		margin-right: 5px;
		i.material-icons {
			color: whitesmoke;
			font-size: 2rem;
		}

		&:hover {
			cursor: pointer;
		}
	}

	img {
		width: 45px;
		height: 45px;
		margin: 5px;
		position: relative;
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
