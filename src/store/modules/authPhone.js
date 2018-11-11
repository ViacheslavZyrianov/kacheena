import firebase from '@/utils/firebase'

import { isEmpty } from 'ramda'

export const state = {
  phoneNumber: '',
  recaptchaVerifier: {},
  confirmationResult: {}
}

export const getters = {
  G_isRecaptchaVerified: state => !isEmpty(state.recaptchaVerifier)
}

export const actions = {
  initRecaptcha ({ commit }) {
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'small',
      'callback' () {
        commit('setRecaptchaVerifier', recaptchaVerifier)
      },
      'expired-callback' () {
        console.error('Captcha fucked up :(')
      }
    })
    recaptchaVerifier.render()
  },
  sendVerificationCode ({ commit }, phoneNumber) {
    commit('setPhoneNumber', phoneNumber)
    firebase.auth().signInWithPhoneNumber(phoneNumber, state.recaptchaVerifier)
      .then(confirmationResult => {
        commit('setConfirmationResult', confirmationResult)
      }).catch(error => {
        throw error
      })
  },
  authorize ({ commit }, verificationCode) {
    state.confirmationResult.confirm(verificationCode)
      .then(data => {
        commit('setUser', data.user, { root: true })
      }).catch(error => {
        throw error
      })
  }
}

export const mutations = {
  setPhoneNumber (state, payload) {
    state.phoneNumber = payload
  },
  setRecaptchaVerifier (state, payload) {
    state.recaptchaVerifier = payload
  },
  setConfirmationResult (state, payload) {
    state.confirmationResult = payload
  }
}
