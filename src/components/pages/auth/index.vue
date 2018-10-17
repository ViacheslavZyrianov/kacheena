<template>
  <v-card
    width="400"
  >
    <div class="auth__phone">
      <v-text-field
        placeholder="Phone"
        v-model="phoneNumber"
      />
      <div id="recaptcha-container"></div>
      <v-btn
        @click="onSendVerificationCode"
        :disabled="isAuthorizeViaPhoneBtnDisabled"
      >
        Send verification code
      </v-btn>
      <v-text-field
        placeholder="Verification code"
        v-model="verificationCode"
      />
      <v-btn
        @click="onAuthorize"
      >
        Authorize
      </v-btn>
    </div>
  </v-card>
</template>

<script>
  import { mapActions } from 'vuex'

  // import { initRecaptcha } from '@/utils/recaptcha'

  export default {
    name: 'pageAuth',
    data () {
      return {
        phoneNumber: '',
        verificationCode: ''
      }
    },
    methods: {
      ...mapActions({
        initRecaptcha: 'authPhone/initRecaptcha',
        sendVerificationCode: 'authPhone/sendVerificationCode',
        authorize: 'authPhone/authorize'
      }),
      onSendVerificationCode () {
        this.sendVerificationCode(this.phoneNumber)
      },
      onAuthorize () {
        this.authorize(this.verificationCode)
      }
    },
    computed: {
      isAuthorizeViaPhoneBtnDisabled () {
        return false
      }
    },
    mounted () {
      this.initRecaptcha()
    }
  }
</script>

<style lang="scss" scoped>
</style>

