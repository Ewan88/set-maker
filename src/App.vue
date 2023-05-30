<script lang="ts">
import { defineComponent } from 'vue'
import fetchData from './helpers/authHelper'
import SearchBar from './components/SearchBar.vue'

export default defineComponent({
  data() {
    return {
      username: 'bob'
    }
  },
  methods: {
    fetchData
  },
  name: 'App',
  components: {
    SearchBar,
  }
})
</script>

<template>
  <body>
    <button @click="fetchData()">login</button>
  </body>
</template>

<style lang="scss">
@import "@/assets/styles.scss";
</style>
