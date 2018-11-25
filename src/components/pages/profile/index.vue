<template>
  <section class="page page-profile">
    <h1>Profile</h1>
    <h2>Name: {{ getUser.displayName }}</h2>
    <img
      :src="getUser.photoURL"
      :alt="getUser.displayName"
    >
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageProfile',
  computed: {
    ...mapGetters({
      getUser: 'getUser'
    })
  }
}
</script>

<style lang="scss">
  html,
  body {
      overscroll-behavior-y: contain;
  }
</style>
