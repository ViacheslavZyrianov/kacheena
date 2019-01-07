import firebase from '@/utils/firebase'
import router from '@/router'

export const actions = {
  async authorize ({ commit }) {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().useDeviceLanguage()
      firebase.auth().signInWithPopup(provider).then(result => {
        const userData = {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          phoneNumber: result.user.phoneNumber,
          uid: result.user.uid
        }
        commit('setUser', userData, { root: true })
        router.push({name: 'profile'})
      }).catch(err => {
        this.dispatch('snackbar/showErrorMessage', err)
      })
    } catch (err) {
      this.dispatch('snackbar/showErrorMessage', err)
    }
  }
}
