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
        localStorage.setItem('userData', JSON.stringify(userData))
        commit('setUser', userData, { root: true })
      }).catch(error => {
        throw error
        // Handle Errors here.
        // var errorCode = error.code
        // var errorMessage = error.message
        // The email of the user's account used.
        // var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential
      })
    } catch (err) {
      throw err
    }
  }
}
