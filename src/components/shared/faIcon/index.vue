<template>
  <v-icon
    :style="{color: color}"
    left
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
        default: '#fff',
        type: String
      },
      type: {
        default: '',
        type: String
      },
      side: {
        default: 'left',
        type: String
      }
    },
    computed: {
      iconName () {
        return `fa ${this.type} fa-${this.name}`
      }
    }
  }
</script>
