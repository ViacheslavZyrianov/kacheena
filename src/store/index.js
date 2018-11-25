import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export const getters = {
  getUser: state => JSON.parse(localStorage.getItem('kacheenaUserDataL')) || state.user
}

export const state = {
  user: {}
}

const mutations = {
  setUser (state, payload) {
    state.user = payload
    localStorage.setItem('kacheenaUserDataL', JSON.stringify(payload))
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  modules
})

export default store
