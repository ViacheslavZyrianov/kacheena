import axios from 'axios'

export const state = {
  countryName: '',
  countryPhoneCode: ''
}

export const getters = {
  getCountryPhoneCode: state => state.countryPhoneCode
}

export const actions = {
  async fetchCountryName ({ commit }) {
    try {
      const { data: { country } } = await axios.get('http://ip-api.com/json')
      commit('setCountryName', country)
    } catch (err) {
      this.dispatch('snackbar/showErrorMessage', {
        message: 'Failed to fetch country name'
      })
    }
  },
  async fetchCountryPhoneCode ({ dispatch, commit }) {
    try {
      await dispatch('fetchCountryName')
      const { data } = await axios.get(`https://restcountries.eu/rest/v2/name/${state.countryName}`)
      commit('setCountryPhoneCode', data[0].callingCodes[0])
    } catch (err) {
      this.dispatch('snackbar/showErrorMessage', {
        message: 'Failed to fetch country phone code'
      })
    }
  }
}

export const mutations = {
  setCountryName (state, payload) {
    state.countryName = payload
  },
  setCountryPhoneCode (state, payload) {
    state.countryPhoneCode = payload
  }
}

export default {
  state,
  actions,
  mutations
}
