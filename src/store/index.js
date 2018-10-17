import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export const state = {
  user: {}
}

const mutations = {
  setUser (state, payload) {
    state.user = payload
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  modules
})

export default store
