<template>
  <v-snackbar
    :value="getIsSnackbarVisible"
    :timeout="0"
    top
    :color="getSnackbarType"
    auto-height
  >
    {{ this.snackbarMessage }}
    <v-btn
      flat
      @click="onCloseSnackbar"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Snackbar',
  computed: {
    ...mapGetters({
      getIsSnackbarVisible: 'snackbar/getIsSnackbarVisible',
      getSnackbarType: 'snackbar/getSnackbarType',
      getSnackbarMessage: 'snackbar/getSnackbarMessage'
    }),
    snackbarMessage () {
      const messageName = this.getSnackbarMessage.name ? `${this.getSnackbarMessage.name}: ` : ''
      if (typeof this.getSnackbarMessage === 'string') return this.getSnackbarMessage
      if (typeof this.getSnackbarMessage === 'object') return `${messageName}${this.getSnackbarMessage.message}`
    }
  },
  methods: {
    ...mapActions({
      onCloseSnackbar: 'snackbar/closeSnackbar'
    })
  }
}
</script>

