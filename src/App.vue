<template>
  <v-app>
  <v-navigation-drawer
      v-model="isToolbarOpened"
      app
    >
      <v-list dense>
        <v-list-tile
          v-for="nav in navList"
          :key="`${nav.title}-${nav.route}`"
          @click="onNavItemClick(nav.route)"
        >
          <v-list-tile-action>
            <fa-icon
              :name="nav.icon"
              color="#808080"
              align="center"
            />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ nav.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click="onToggleToolbar" />
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
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
  },
  data () {
    return {
      isToolbarOpened: false,
      navList: [
        {
          title: 'Home',
          route: 'home',
          icon: 'home'
        },
        {
          title: 'Profile',
          route: 'profile',
          icon: 'user'
        },
        {
          title: 'Trainings',
          route: 'trainings',
          icon: 'dumbbell'
        },
        {
          title: 'Training programs',
          route: 'training-programs',
          icon: 'list-ul'
        },
        {
          title: 'Schedules',
          route: 'schedules',
          icon: 'calendar-alt'
        },
        {
          title: 'Measurements',
          route: 'measurements',
          icon: 'weight-hanging'
        },
        {
          title: 'Settings',
          route: 'settings',
          icon: 'cog'
        }
      ]
    }
  },
  methods: {
    onToggleToolbar () {
      this.isToolbarOpened = !this.isToolbarOpened
    },
    onNavItemClick (name) {
      this.$router.push({ name })
      this.isToolbarOpened = false
    }
  }
}
</script>

<style lang="scss">
  html,
  body {
      overscroll-behavior-y: contain;
  }
  .page {
    min-height: 100vh;
  }
</style>
