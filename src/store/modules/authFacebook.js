import firebase from '@/utils/firebase'

export const actions = {
  async authorize ({ commit }) {
    try {
      const provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().useDeviceLanguage()
      firebase.auth().signInWithPopup(provider).then(result => {
        const userData = {
          displayName: result.additionalUserInfo.profile.name,
          email: result.additionalUserInfo.profile.email,
          photoURL: result.additionalUserInfo.profile.picture.data.url
        }
        commit('setUser', userData, { root: true })
      }).catch(error => {
        console.log('error', error)
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...
      })
    } catch (err) {
      throw err
    }
  }
}
