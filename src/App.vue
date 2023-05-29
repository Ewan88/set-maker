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
  async mounted() {
    await fetchData()
  },
  name: 'App',
  components: {
    SearchBar,
  }
})
</script>

<template>
  <body>
    <h1>Display your Spotify profile data</h1>

    <section id="profile">
      <h2>Logged in as {{username}}</h2>
      <span id="avatar"></span>
      <ul>
        <li>User ID: <span id="id"></span></li>
        <li>Email: <span id="email"></span></li>
        <li>Spotify URI: <a id="uri" href="#"></a></li>
        <li>Link: <a id="url" href="#"></a></li>
        <li>Profile Image: <span id="imgUrl"></span></li>
      </ul>
    </section>
  </body>
</template>

<style lang="scss">
@import "@/assets/styles.scss";
</style>
