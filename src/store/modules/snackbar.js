export const state = () => ({
  isSnackbarVisible: false,
  snackbarMessage: '',
  snackbarType: ''
})

export const getters = {
  getIsSnackbarVisible: state => state.isSnackbarVisible,
  getSnackbarType: state => state.snackbarType,
  getSnackbarMessage: state => state.snackbarMessage
}

export const actions = {
  showErrorMessage ({ commit }, snackbarMessage) {
    commit('SET_IS_SNACKBAR_VISIBLE', true)
    commit('SET_SNACKBAR_MESSAGE', snackbarMessage)
    commit('SET_SNACKBAR_TYPE', 'error')
  },
  showWarningMessage ({ commit }, snackbarMessage) {
    commit('SET_IS_SNACKBAR_VISIBLE', true)
    commit('SET_SNACKBAR_MESSAGE', snackbarMessage)
    commit('SET_SNACKBAR_TYPE', 'warning')
    setTimeout(() => {
      this.dispatch('closeSnackbar')
    }, 3000)
  },
  showSuccessMessage ({ commit }, snackbarMessage) {
    commit('SET_IS_SNACKBAR_VISIBLE', true)
    commit('SET_SNACKBAR_MESSAGE', snackbarMessage)
    commit('SET_SNACKBAR_TYPE', 'success')
    setTimeout(() => {
      this.dispatch('snackbar/closeSnackbar')
    }, 3000)
  },
  showInfoMessage ({ commit }, snackbarMessage) {
    commit('SET_IS_SNACKBAR_VISIBLE', true)
    commit('SET_SNACKBAR_MESSAGE', snackbarMessage)
    commit('SET_SNACKBAR_TYPE', 'info')
  },
  closeSnackbar ({ commit }) {
    commit('SET_IS_SNACKBAR_VISIBLE', false)
  }
}

export const mutations = {
  SET_IS_SNACKBAR_VISIBLE (state, payload) {
    state.isSnackbarVisible = payload
  },
  SET_SNACKBAR_MESSAGE (state, payload) {
    state.snackbarMessage = payload
  },
  SET_SNACKBAR_TYPE (state, payload) {
    state.snackbarType = payload
  }
}
