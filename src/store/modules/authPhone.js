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
        const profileData = {
          uid: data.user.uid,
          avatarUrl: data.user.avatarUrl,
          displayName: data.user.displayName,
          phoneNumber: data.user.phoneNumber
        }
        commit('profile/setProfile', profileData, { root: true })
        ls.set('kacheena__user', profileData)
        router.push({name: 'profile'})
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
