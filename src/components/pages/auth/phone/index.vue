<template>
  <div>
    <div class="auth__phone">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs2>
            <v-progress-circular
              v-if="isPhoneNumberCodeLoaded"
              indeterminate
              color="primary"
            />
            <v-text-field
              v-else
              v-model="phoneNumberCode"
            />
          </v-flex>
          <v-flex>
            <v-text-field
              placeholder="Enter your phone number"
              label="Phone number"
              v-model="phoneNumber"
              mask="#########"
              ref="phoneNumberField"
            />
          </v-flex>
        </v-layout>
      </v-container>
      <div id="recaptcha-container"></div>
      <v-btn
        @click="onSendVerificationCode"
        :disabled="isSendVerificationCodeBtnDisabled"
        color="info"
        block
      >
        Send verification code
      </v-btn>
      <v-text-field
        v-if="isVerificationCodeFieldVisible"
        placeholder="Verification code"
        v-model="verificationCode"
      />
      <v-btn
        v-if="isAuthorizeViaPhoneBtnVisible"
        color="#43c5a5"
        dark block
        @click="onAuthorizeViaPhone"
      >
        <fa-icon name="phone" />
        Authorize via phone
      </v-btn>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'phoneAuth',
    data () {
      return {
        phoneNumber: '',
        phoneNumberCode: '',
        isPhoneNumberCodeLoaded: false,
        verificationCode: '',
        isVerificationCodeFieldVisible: false
      }
    },
    methods: {
      ...mapActions({
        initRecaptcha: 'authPhone/initRecaptcha',
        sendVerificationCode: 'authPhone/sendVerificationCode',
        authorize: 'authPhone/authorize',
        fetchCountryPhoneCode: 'geolocationData/fetchCountryPhoneCode'
      }),
      onSendVerificationCode () {
        this.sendVerificationCode(`${this.phoneNumberCode}${this.phoneNumber}`)
        this.isVerificationCodeFieldVisible = true
      },
      onAuthorizeViaPhone () {
        this.authorize(this.verificationCode)
      },
      goBack () {
        this.$emit('showChooseAuth')
      }
    },
    computed: {
      ...mapGetters({
        getIsRecaptchaVerified: 'authPhone/getIsRecaptchaVerified',
        getCountryPhoneCode: 'geolocationData/getCountryPhoneCode'
      }),
      isPhoneNumberFilled () {
        return this.phoneNumber.length === 9
      },
      isSendVerificationCodeBtnDisabled () {
        return !this.getIsRecaptchaVerified || !this.isPhoneNumberFilled
      },
      isAuthorizeViaPhoneBtnVisible () {
        return this.verificationCode.length === 6
      }
    },
    async created () {
      this.isPhoneNumberCodeLoaded = true
      try {
        await this.fetchCountryPhoneCode()
        this.phoneNumberCode = `+${this.getCountryPhoneCode}`
      } catch (err) {
        throw err
      } finally {
        this.isPhoneNumberCodeLoaded = false
      }
    },
    mounted () {
      this.initRecaptcha()
    }
  }
</script>

<style lang="scss" scoped>
  #recaptcha-container {
    height: 78px;
  }

  .auth__phone {
    min-height: 340px;
  }

  .btn-list {
    width: 300px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
