<template>
  <v-icon
    :color="color"
    :size="size"
    :left="isLeft"
    :right="isRight"
  >
    {{ iconName }}
  </v-icon>
</template>

<script>
  import '@fortawesome/fontawesome-free/css/all.css'
  import '@fortawesome/fontawesome-free/css/brands.css'
  export default {
    name: 'FaIcon',
    props: {
      name: {
        default: '',
        type: String,
        required: true
      },
      color: {
        default: '',
        type: String
      },
      type: {
        default: '',
        type: String
      },
      side: {
        default: '',
        type: String
      },
      size: {
        default: 16,
        type: Number
      }
    },
    computed: {
      iconName () {
        return `fa ${this.type} fa-${this.name}`
      },
      isLeft () {
        return this.side === 'left'
      },
      isRight () {
        return this.side === 'right'
      }
    }
  }
</script>
