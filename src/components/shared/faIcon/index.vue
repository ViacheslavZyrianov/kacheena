<template>
  <v-icon>{{ iconName }}</v-icon>
</template>

<script>
  import '@fortawesome/fontawesome-free/css/all.css'
  export default {
    name: 'FaIcon',
    props: {
      name: {
        default: '',
        type: String,
        required: true
      }
    },
    computed: {
      iconName () {
        return `fas fa-${this.name}`
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>

