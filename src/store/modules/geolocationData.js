import axios from 'axios'

export const state = {
  countryName: '',
  countryPhoneCode: ''
}

export const getters = {
  G_countryPhoneCode: state => state.countryPhoneCode
}

export const actions = {
  async A_fetchCountryName ({ commit }) {
    try {
      const { data: { country } } = await axios.get('http://ip-api.com/json')
      commit('M_countryName', country)
    } catch (err) {
      throw err
    }
  },
  async A_fetchCountryPhoneCode ({ dispatch, commit }) {
    try {
      await dispatch('A_fetchCountryName')
      const { data } = await axios.get(`https://restcountries.eu/rest/v2/name/${state.countryName}`)
      commit('M_countryPhoneCode', data[0].callingCodes[0])
    } catch (err) {
      throw err
    }
  }
}

export const mutations = {
  M_countryName (state, payload) {
    state.countryName = payload
  },
  M_countryPhoneCode (state, payload) {
    state.countryPhoneCode = payload
  }
}

export default {
  state,
  actions,
  mutations
}
