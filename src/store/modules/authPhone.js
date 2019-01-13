import firebase from '@/utils/firebase'
import router from '@/router'

import { isEmpty } from 'ramda'
import ls from '@/utils/ls'

export const state = {
  recaptchaVerifier: {},
  confirmationResult: {}
}

export const getters = {
  getRecaptcha: state => state.recaptchaVerifier,
  getIsRecaptchaVerified: state => !isEmpty(state.recaptchaVerifier)
}

export const actions = {
  initRecaptcha ({ commit, getters, state }) {
    if (getters.getIsRecaptchaVerified) {
      state.recaptchaVerifier.clear()
      state.recaptchaVerifier = {}
    }
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'small',
      'callback' () {
        commit('SET_RECAPTCHA_VERIFIER', recaptchaVerifier)
      },
      'expired-callback' () {
        this.dispatch('snackbar/showErrorMessage', {
          message: 'ReCaptcha callback expired'
        })
      }
    })
    recaptchaVerifier.render()
  },
  sendVerificationCode ({ commit }, phoneNumber) {
    firebase.auth().signInWithPhoneNumber(phoneNumber, state.recaptchaVerifier)
      .then(confirmationResult => {
        commit('SET_CONFIRMATION_RESULT', confirmationResult)
      }).catch(err => {
        this.dispatch('snackbar/showErrorMessage', err)
      })
  },
  async authorize ({ commit }, verificationCode) {
    try {
      const data = await state.confirmationResult.confirm(verificationCode)
      const profileData = {
        uid: data.user.uid,
        avatarUrl: data.user.photoURL,
        displayName: data.user.displayName,
        phoneNumber: data.user.phoneNumber
      }
      commit('profile/SET_PROFILE', profileData, { root: true })
      ls.set('kacheena__user', profileData)
      router.push('profile')
    } catch (err) {
      this.dispatch('snackbar/showErrorMessage', err)
    }
  }
}

export const mutations = {
  SET_RECAPTCHA_VERIFIER (state, payload) {
    state.recaptchaVerifier = payload
  },
  SET_CONFIRMATION_RESULT (state, payload) {
    state.confirmationResult = payload
  }
}
