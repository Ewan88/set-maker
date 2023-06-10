<template>
	<div class="spinner-container">
		<div class="spinner"></div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({});
</script>

<style>
	@keyframes spinner {
		to {
			transform: rotate(360deg);
		}
	}

	.spinner-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.spinner::before {
		content: '';
		box-sizing: border-box;
		position: absolute;
		top: 50%;
		left: 50%;
		width: 60px;
		height: 60px;
		margin: 0;
		border-radius: 50%;
		border-top: 2px solid whitesmoke;
		border-right: 2xp solid transparent;
		animation: spinner 0.6s linear infinite;
	}
</style>
