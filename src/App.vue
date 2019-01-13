<template>
  <v-app>
    <template v-if="isMenuAvailable">
      <v-navigation-drawer
        v-model="isToolbarOpened"
        app
      >
        <v-list dense class="nav-list">
          <v-list-tile
            v-for="nav in navRouteList"
            :key="`${nav.title}-${nav.route}`"
            @click="onNavItemClick(nav.route)"
            :style="{ order: nav.order }"
          >
            <v-list-tile-action>
              <fa-icon
                :name="nav.icon"
                align="center"
              />
            </v-list-tile-action>
            <v-list-tile-title>
              {{ nav.title }}
            </v-list-tile-title>
          </v-list-tile>
          <v-list-group
            v-for="navWithSub in navWithSubList"
            :key="`${navWithSub.title}-${navWithSub.icon}`"
            :style="{ order: navWithSub.order }"
          >
            <v-list-tile slot="activator">
              <v-list-tile-action>
                <fa-icon
                  :name="navWithSub.icon"
                  align="center"
                />
              </v-list-tile-action>
              <v-list-tile-title>
                {{ navWithSub.title }}
              </v-list-tile-title>
            </v-list-tile>
            <v-list-tile
              v-for="navSub in navWithSub.list"
              :key="`${navSub.title}-${navSub.route}`"
              @click="onNavItemClick(navSub.route)"
            >
              <v-list-tile-action>
                <fa-icon
                  :name="navSub.icon"
                  align="center"
                />
              </v-list-tile-action>
              <v-list-tile-title>
                {{ navSub.title }}
              </v-list-tile-title>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app>
        <v-toolbar-side-icon @click="onToggleToolbar" />
        <v-toolbar-title>
          {{ toolbarTitle }}
        </v-toolbar-title>
        <v-spacer />
        <menu-kebab />
      </v-toolbar>
    </template>
    <v-content>
      <v-container fill-height>
        <router-view/>
      </v-container>
    </v-content>
    <snackbar />
  </v-app>
</template>

<script>
import snackbar from '@/components/snackbar'
import menuKebab from '@/components/menuKebab'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    snackbar,
    menuKebab
  },
  data () {
    return {
      isToolbarOpened: false,
      navList: [
        {
          title: 'Home',
          route: 'home',
          icon: 'home',
          order: 1
        },
        {
          title: 'Profile',
          route: 'profile',
          icon: 'user',
          order: 2
        },
        {
          title: 'Trainings',
          route: 'trainings',
          icon: 'dumbbell',
          order: 3
        },
        {
          title: 'Training programs',
          route: 'training-programs',
          icon: 'list-ul',
          order: 4
        },
        {
          title: 'Schedules',
          icon: 'calendar-alt',
          order: 5,
          list: [
            {
              title: 'Trainings',
              route: 'schedule-trainings'
            },
            {
              title: 'Gym payment',
              route: 'schedule-gym-payment'
            },
            {
              title: 'Trainer payment',
              route: 'schedule-trainer-payment'
            }
          ]
        },
        {
          title: 'Measurements',
          route: 'measurements',
          icon: 'weight-hanging',
          order: 6
        },
        {
          title: 'Settings',
          route: 'settings',
          icon: 'cog',
          order: 7
        }
      ]
    }
  },
  created () {
    this.setProfile()
  },
  computed: {
    isMenuAvailable () {
      return this.$route.name !== 'auth'
    },
    toolbarTitle () {
      return `${this.$route.name[0].toUpperCase()}${this.$route.name.slice(1)}`
    },
    navRouteList () {
      return this.navList.filter(navItem => 'route' in navItem)
    },
    navWithSubList () {
      return this.navList.filter(navItem => 'list' in navItem)
    }
  },
  methods: {
    ...mapActions({
      setProfile: 'profile/setProfile'
    }),
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
  .nav-list {
    display: flex;
    flex-direction: column;
  }
</style>
