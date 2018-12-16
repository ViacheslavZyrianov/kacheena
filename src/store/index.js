import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export const getters = {
  getUser: state => state.user
}

export const state = {
  user: {}
}

const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setPhotoUrl (state, payload) {
    state.user.photoURL = payload
  },
  setDisplayName (state, payload) {
    state.user.displayName = payload
  },
  setPhoneNumber (state, payload) {
    state.user.phoneNumber = payload
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  modules
})

export default store
