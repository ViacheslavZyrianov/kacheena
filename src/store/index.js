import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export const getters = {
}

export const state = {
}

const mutations = {
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  modules
})

export default store
