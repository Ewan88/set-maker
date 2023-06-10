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
			selectPlaylist() {
				this.$emit('playlist-selected', this.playlist);
			},
		},
	});
</script>

<template>
	<div class="playlist-item-wrapper" @click="selectPlaylist">
		<img
			v-if="playlist.images.length > 0"
			:src="playlist.images[playlist.images.length - 1].url"
		/>
		<span>{{ playlist.name }}</span>
	</div>
</template>

<style scoped>
	img {
		width: 50px;
		height: 50px;
		margin: 5px;
	}

	span {
		margin-left: 1rem;
		font-size: 1em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
