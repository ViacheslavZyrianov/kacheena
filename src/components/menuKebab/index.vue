<template>
  <v-menu v-if="isKebabMenuVisible">
    <v-btn
      slot="activator"
      icon
    >
      <fa-icon
        name="ellipsis-v"
      />
    </v-btn>

    <v-list>
      <v-list-tile
        v-for="menuItem in menu"
        :key="menuItem.title"
        @click="menuItem.click"
      >
        <v-list-tile-title>{{ menuItem.title }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'menuKebab',
  data () {
    return {
      menu: []
    }
  },
  created () {
    this.$root.$on('setKebabMenu', menu => {
      this.menu = menu
    })
  },
  computed: {
    isKebabMenuVisible () {
      return this.menu.length > 0
    }
  }
}
</script>
