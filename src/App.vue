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
