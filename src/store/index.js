import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

import { VueOfflineStorage } from 'vue-offline'

Vue.use(Vuex)

export const state = {
  user: {}
}

const mutations = {
  setUser (state, payload) {
    state.user = payload
    VueOfflineStorage.set('kacheena-userData', payload)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  modules
})

export default store
