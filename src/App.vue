<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
    <snackbar />
  </v-app>
</template>

<script>
import snackbar from '@/components/shared/snackbar'
export default {
  name: 'App',
  components: {
    snackbar
  }
}
</script>

<style lang="scss">
  html,
  body {
      overscroll-behavior-y: contain;
  }
  .page {
    padding: 8px;
    min-height: 100vh;
  }
</style>
