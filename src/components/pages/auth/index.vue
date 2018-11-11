<template>
  <v-container class="page-auth">
    <h1>Authorization</h1>
    <phone-auth key="phone-auth"/>
    <div class="social-auth">
      <span>Or authorize via social network</span>
      <div class="social-auth__btn-list">
        <v-btn
          v-for="socialBtn in socialBtnList"
          :key="`${socialBtn.name}${socialBtn.color}`"
          :color="socialBtn.color"
          @click="onSetAuthStep(socialBtn.name)"
          dark depressed
          class="social-auth__btn"
        >
          <fa-icon
            :name="socialBtn.icon"
            type="fab"
          />
          {{ socialBtn.name }}
        </v-btn>
      </div>
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
          icon: 'google-plus-g',
          color: '#dd3f3a',
          name: 'Google+'
        },
        {
          icon: 'facebook-f',
          color: '#3a529f',
          name: 'Facebook'
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

  .social-auth {
    width: 100%;
    margin-top: auto 0 16px;

    &__btn-list {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin: 0 -8px;
    }

    &__btn {
      flex-basis: calc(50% - 16px);
    }
  }
</style>
