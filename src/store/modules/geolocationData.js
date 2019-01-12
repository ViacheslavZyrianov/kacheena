import axios from 'axios'

export const state = {
  countryPhoneCode: null
}

export const getters = {
  getCountryPhoneCode: state => state.countryPhoneCode
}

export const actions = {
  async fetchCountryPhoneCode ({ commit }) {
    try {
      const countryName = navigator.language.split('-')[1]
      const { data } = await axios.get(`https://restcountries.eu/rest/v2/alpha/${countryName}`)
      commit('setCountryPhoneCode', data.callingCodes[0])
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
