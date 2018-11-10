<template>
  <v-container class="page-auth">
    <h1>Authorization</h1>
    <phone-auth key="phone-auth"/>
    <div class="social-btn__list">
      <v-btn
        v-for="socialBtn in socialBtnList"
        :key="`${socialBtn.name}${socialBtn.color}`"
        :color="socialBtn.color"
        @click="onSetAuthStep(socialBtn.name)"
        dark large block
      >
        <fa-icon
          :name="socialBtn.icon"
          type="fab"
        />
        Authorize via {{ socialBtn.name }}
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import phoneAuth from './phone'

export default {
  name: 'pageAuth',
  components: {
    phoneAuth
  },
  data () {
    return {
      socialBtnList: [
        {
          name: 'Google+',
          icon: 'google-plus-g',
          color: '#dd3f3a'
        },
        {
          name: 'Facebook',
          icon: 'facebook-f',
          color: '#3a529f'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-auth {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .social-btn__list {
    width: 100%;
  }
</style>
