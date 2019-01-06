// import axios from 'axios'
import firebase from 'firebase'
import router from '@/router'

export const state = {
  phoneNumber: '',
  displayName: ''
}

export const actions = {
  async savePhotoBlob ({ commit, rootGetters }, blob) {
    try {
      const storageRef = firebase.storage().ref()
      const { uid } = rootGetters.getUser
      const avatarRef = storageRef.child(`avatar_${uid}.jpg`)
      const puttingBlobResult = await avatarRef.put(blob)
      const photoUrl = await puttingBlobResult.ref.getDownloadURL()
      commit('setPhotoUrl', photoUrl, { root: true })
      this.dispatch('snackbar/showSuccessMessage', 'New avatar saved!')
    } catch (err) { this.dispatch('snackbar/showErrorMessage', err) }
  },
  async fetchPhotoUrl ({ commit, rootGetters }) {
    const storageRef = firebase.storage().ref()
    const { uid } = rootGetters.getUser
    const avatarRef = storageRef.child(`avatar_${uid}.jpg`)
    if (uid && avatarRef) {
      try {
        const photoUrl = await avatarRef.getDownloadURL()
        commit('setPhotoUrl', photoUrl, { root: true })
      } catch (err) { throw err }
    }
  },
  async saveDisplayName ({ commit }, displayName) {
    try {
      await firebase.auth().currentUser.updateProfile({ displayName })
      commit('setDisplayName', displayName, { root: true })
      this.dispatch('snackbar/showSuccessMessage', 'Display name saved!')
    } catch (err) { this.dispatch('snackbar/showErrorMessage', err) }
  },
  async savePhoneNumber ({ commit }, phoneCredential) {
    try {
      await firebase.auth().currentUser.updatePhoneNumber(`+${phoneCredential}`)
      commit('setPhoneNumber', phoneCredential, { root: true })
      this.dispatch('snackbar/showSuccessMessage', 'Display name saved!')
    } catch (err) {
      this.dispatch('snackbar/showErrorMessage', err)
    }
  },
  async signOut ({ commit }) {
    try {
      await firebase.auth().signOut()
      commit('setUser', {}, { root: true })
      router.push({name: 'Auth'})
    } catch (err) { this.dispatch('snackbar/showErrorMessage', err) }
  }
}

export default {
  state,
  actions
}
