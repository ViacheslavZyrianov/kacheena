import firebase from '@/utils/firebase'

export const actions = {
  async authorize ({ commit }) {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().useDeviceLanguage()
      firebase.auth().signInWithPopup(provider).then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken
        const userData = {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          phoneNumber: result.user.phoneNumber
        }
        commit('setUser', userData, { root: true })
      }).catch(err => {
        this.dispatch('snackbar/showErrorMessage', err)
      })
    } catch (err) {
      this.dispatch('snackbar/showErrorMessage', err)
    }
  }
}
