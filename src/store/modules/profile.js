import firebase from 'firebase'
import router from '@/router'
import ls from '@/utils/ls'

export const state = {
  profile: {}
}

export const getters = {
  getProfile: state => state.profile,
  getUID: state => state.profile.uid
}

export const actions = {
  async saveAvatarBlob ({ commit, getters }, blob) {
    try {
      const storageRef = firebase.storage().ref()
      const avatarRef = storageRef.child(`avatar_${getters.getUID}.jpg`)
      const puttingBlobResult = await avatarRef.put(blob)
      const avatarUrl = await puttingBlobResult.ref.getDownloadURL()
      commit('setAvatarUrl', avatarUrl)
      this.dispatch('snackbar/showSuccessMessage', 'New avatar saved!')
    } catch (err) { this.dispatch('snackbar/showErrorMessage', err) }
  },
  async fetchAvatarURL ({ commit, getters }) {
    const storageRef = firebase.storage().ref()
    const avatarRef = storageRef.child(`avatar_${getters.getUID}.jpg`)
    try {
      const avatarUrl = await avatarRef.getDownloadURL()
      commit('setAvatarUrl', avatarUrl)
    } catch (err) { throw err }
  },
  async saveDisplayName ({ commit }, displayName) {
    try {
      await firebase.auth().currentUser.updateProfile({ displayName })
      commit('setDisplayName', displayName)
      this.dispatch('snackbar/showSuccessMessage', 'Display name saved!')
    } catch (err) { this.dispatch('snackbar/showErrorMessage', err) }
  },
  async savePhoneNumber ({ commit }, phoneCredential) {
    try {
      await firebase.auth().currentUser.updatePhoneNumber(`+${phoneCredential}`)
      commit('setPhoneNumber', phoneCredential)
      this.dispatch('snackbar/showSuccessMessage', 'Display name saved!')
    } catch (err) {
      this.dispatch('snackbar/showErrorMessage', err)
    }
  },
  setProfile ({ commit }) {
    const profileFromLocalStorage = ls.get('kacheena__user')
    if (profileFromLocalStorage) commit('setProfile', profileFromLocalStorage)
  },
  async signOut ({ commit }) {
    try {
      await firebase.auth().signOut()
      commit('setProfile', {})
      ls.remove('kacheena__user')
      router.push({name: 'auth'})
    } catch (err) { this.dispatch('snackbar/showErrorMessage', err) }
  }
}

export const mutations = {
  setProfile (state, payload) {
    state.profile = payload
  },
  setUID (state, payload) {
    state.profile.UID = payload
  },
  setAvatarUrl (state, payload) {
    state.profile.avatarUrl = payload
  },
  setDisplayName (state, payload) {
    state.profile.displayName = payload
  },
  setPhoneNumber (state, payload) {
    state.profile.phoneNumber = payload
  }
}

export default {
  state,
  actions
}
