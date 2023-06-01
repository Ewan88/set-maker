<script lang="ts">
	import { defineComponent } from 'vue'
	import requestUserAuthentication from './helpers/authHelper'

	export default defineComponent({
		name: 'App',
		data() {
			return {
				username: 'bob'
			}
		},
		methods: {
			requestUserAuthentication
		}
	})
</script>

<template>
	<body>
		<button @click="requestUserAuthentication()">login</button>
	</body>
</template>

<style lang="scss">
	@import '@/assets/styles.scss';
</style>
