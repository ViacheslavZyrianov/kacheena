<template>
  <v-dialog
    v-model="isOpened"
    persistent
    :max-width="300"
  >
    <v-card>
      <v-container>
        <v-layout mb-2>
          <h3>{{ title }}</h3>
        </v-layout>
        <p>
          {{ text }}
        </p>
        <v-layout justify-end>
          <v-btn
            flat
            @click="onReject"
          >
            {{ rejectButtonText }}
          </v-btn>
          <v-btn
            color="info"
            @click="onConfirm"
          >
            {{ confirmButtonText }}
          </v-btn>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'confirmDialog',
  props: {
    isOpened: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Title'
    },
    text: {
      type: String,
      default: 'Are you sure?'
    },
    rejectButtonText: {
      type: String,
      default: 'Cancel'
    },
    confirmButtonText: {
      type: String,
      default: 'Ok'
    }
  },
  methods: {
    onReject () {
      this.$emit('reject')
    },
    onConfirm () {
      this.$emit('confirm')
    }
  }
}
</script>
