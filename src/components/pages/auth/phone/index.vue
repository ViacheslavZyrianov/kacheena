<template>
  <v-layout column justify-center align-center>
    <v-window
      v-model="activeWindow"
      horizontal
    >
      <v-window-item>
        <v-card
          max-width="300"
        >
          <v-card-text>
            <v-layout column align-center>
              <v-layout row align-center justify-center>
                <v-flex xs3>
                  <v-layout
                    v-if="isPhoneNumberCodeLoaded"
                    mr-2
                  >
                    <v-text-field
                      v-model="phoneNumberCode"
                      type="tel"
                      prefix="+"
                    />
                  </v-layout>
                  <v-progress-circular
                    v-else
                    indeterminate
                    color="primary"
                  />
                </v-flex>
                <v-flex>
                  <v-text-field
                    label="Phone number"
                    placeholder="00 000 00 00"
                    v-model="phoneNumber"
                    type="tel"
                    mask="## ### ## ##"
                  />
                </v-flex>
              </v-layout>
              <v-layout>
                <div id="recaptcha-container" />
                <v-progress-circular
                  indeterminate
                  color="primary"
                />
              </v-layout>
              <v-flex
                xs6
                mt-4
              >
                <v-btn
                  v-if="isStepEnterPhone"
                  @click="onSendVerificationCode"
                  color="info"
                  :disabled="isSendVerificationCodeBtnDisabled"
                >
                  Send verification code
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-window-item>
      <v-window-item>
        <v-card
          :min-width="300"
          :max-width="300"
        >
          <v-card-text>
            <v-flex xs12>
              <v-text-field
                label="Enter verification code"
                placeholder="000000"
                v-model="verificationCode"
                type="tel"
                mask="######"
              />
            </v-flex>
            <v-layout>
              <v-flex xs4>
                <v-btn
                  flat
                  block
                  @click="onOpenBackToFirstWindowDialog"
                >
                  Back
                </v-btn>
              </v-flex>
              <v-flex>
                <v-btn
                  :disabled="isAuthorizeViaPhoneBtnDisabled"
                  color="success"
                  block
                  @click="onAuthorizeViaPhone"
                >
                  Authorize
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-window-item>
    </v-window>
    <v-dialog v-model="isBackToFirstWindowDialogActive">
      <v-card>
        <v-card-title>Are you sure?</v-card-title>
        <v-layout justify-center>
          <v-btn
            flat
            @click="onCloseBackToFirstWindowDialog"
          >
            No
          </v-btn>
          <v-btn
            @click="onResetAuthorizeViaPhone"
            color="info"
          >
            Yes
          </v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'phoneAuth',
    data () {
      return {
        phoneNumber: '',
        phoneNumberCode: null,
        verificationCode: '',
        activeWindow: 0,
        isBackToFirstWindowDialogActive: false
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
        this.sendVerificationCode(`+${this.phoneNumberCode}${this.phoneNumber}`)
        this.activeWindow += 1
      },
      onAuthorizeViaPhone () {
        this.authorize(this.verificationCode)
      },
      onResetAuthorizeViaPhone () {
        this.onCloseBackToFirstWindowDialog()
        this.activeWindow = 0
        this.verificationCode = ''
        this.initRecaptcha()
      },
      onCloseBackToFirstWindowDialog () {
        this.isBackToFirstWindowDialogActive = false
      },
      onOpenBackToFirstWindowDialog () {
        this.isBackToFirstWindowDialogActive = true
      }
    },
    computed: {
      ...mapGetters({
        getRecaptcha: 'authPhone/getRecaptcha',
        getIsRecaptchaVerified: 'authPhone/getIsRecaptchaVerified',
        getCountryPhoneCode: 'geolocationData/getCountryPhoneCode'
      }),
      isAuthorizeViaPhoneBtnDisabled () {
        return this.verificationCode.length !== 6
      },
      isPhoneNumberCodeLoaded () {
        return this.phoneNumberCode !== null
      },
      isPhoneNumberCodeFilled () {
        if (this.phoneNumberCode !== null) return this.phoneNumberCode.length > 1
      },
      isPhoneNumberFilled () {
        return this.phoneNumber.length === 9
      },
      isStepEnterPhone () {
        return this.activeWindow === 0
      },
      isStepEnterVerificationCode () {
        return this.activeWindow === 1
      },
      isSendVerificationCodeBtnDisabled () {
        return !this.isPhoneNumberFilled || !this.getIsRecaptchaVerified || !this.isPhoneNumberCodeFilled
      }
    },
    async created () {
      await this.fetchCountryPhoneCode()
      this.phoneNumberCode = this.getCountryPhoneCode
    },
    mounted () {
      this.initRecaptcha()
    }
  }
</script>

<style lang="scss" scoped>
#recaptcha-container {
  transform: scale(0.9);
  height: 70px;
  z-index: 1;

  & + .v-progress-circular {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
 