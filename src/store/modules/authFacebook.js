import firebase from '@/utils/firebase'
import router from '@/router'

export const actions = {
  async authorize ({ commit }) {
    try {
      const provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().useDeviceLanguage()
      firebase.auth().signInWithPopup(provider).then(result => {
        const userData = {
          displayName: result.additionalUserInfo.profile.name,
          email: result.additionalUserInfo.profile.email,
          photoURL: result.additionalUserInfo.profile.picture.data.url,
          uid: result.additionalUserInfo.profile.uid
        }
        commit('setUser', userData, { root: true })
        router.push({name: 'Profile'})
      }).catch(err => {
        this.dispatch('snackbar/showErrorMessage', err)
      })
    } catch (err) {
      this.dispatch('snackbar/showErrorMessage', err)
    }
  }
}
