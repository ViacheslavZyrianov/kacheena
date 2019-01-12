<template>
  <v-layout column align-center justify-center>
    <v-flex shrink mb-4>
      <img
        src="/static/img/logo.svg"
        alt="Logo"
        class="logo"
      >
    </v-flex>
    <phone-auth key="phone-auth"/>
    <!-- <v-layout row wrap>
      <v-flex xs12 align-center>
        <div>Or authorize via social network</div>
      </v-flex>
      <v-flex 
        xs6
        v-for="socialBtn in socialBtnList"
        :key="`${socialBtn.name}${socialBtn.color}`"
        >
        <v-btn
          :color="socialBtn.color"
          @click="authViaSocialNetwork(socialBtn.name)"
          dark depressed
        >
          <fa-icon
            :name="socialBtn.icon"
            type="fab"
          />
          {{ socialBtn.label }}
        </v-btn>
      </v-flex>
    </v-layout> -->
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

import phoneAuth from './phone'

export default {
  name: 'PageAuth',
  components: {
    phoneAuth
  },
  data () {
    return {
      socialBtnList: [
        {
          icon: 'google-plus-g',
          color: '#dd3f3a',
          name: 'google',
          label: 'Google'
        },
        {
          icon: 'facebook-f',
          color: '#3a529f',
          name: 'facebook',
          label: 'Facebook'
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      googleAuth: 'authGoogle/authorize',
      facebookAuth: 'authFacebook/authorize'
    }),
    authViaSocialNetwork (socialNetworkName) {
      this[`${socialNetworkName}Auth`]()
    }
  }
}
</script>
