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
      commit('SET_COUNTRY_PHONE_CODE', data.callingCodes[0])
    } catch (err) {
      this.dispatch('snackbar/showErrorMessage', {
        message: 'Failed to fetch country phone code'
      })
    }
  }
}

export const mutations = {
  SET_COUNTRY_PHONE_CODE (state, payload) {
    state.countryPhoneCode = payload
  }
}

export default {
  state,
  actions,
  mutations
}
