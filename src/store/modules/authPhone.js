import firebase from '@/utils/firebase'

import { isEmpty } from 'ramda'

export const state = {
  phoneNumber: '',
  recaptchaVerifier: {},
  confirmationResult: {}
}

export const getters = {
  getIsRecaptchaVerified: state => !isEmpty(state.recaptchaVerifier)
}

export const actions = {
  initRecaptcha ({ commit }) {
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'small',
      'callback' () {
        commit('setRecaptchaVerifier', recaptchaVerifier)
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
    commit('setPhoneNumber', phoneNumber)
    firebase.auth().signInWithPhoneNumber(phoneNumber, state.recaptchaVerifier)
      .then(confirmationResult => {
        commit('setConfirmationResult', confirmationResult)
      }).catch(err => {
        this.dispatch('snackbar/showErrorMessage', err)
      })
  },
  authorize ({ commit }, verificationCode) {
    state.confirmationResult.confirm(verificationCode)
      .then(data => {
        commit('setUser', data.user, { root: true })
      }).catch(err => {
        this.dispatch('snackbar/showErrorMessage', err)
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
