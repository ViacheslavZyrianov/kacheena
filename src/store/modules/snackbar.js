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
    commit('setIsSnackbarVisible', true)
    commit('setSnackbarMessage', snackbarMessage)
    commit('setSnackbarType', 'error')
  },
  showWarningMessage ({ commit }, snackbarMessage) {
    commit('setIsSnackbarVisible', true)
    commit('setSnackbarMessage', snackbarMessage)
    commit('setSnackbarType', 'warning')
    setTimeout(() => {
      this.dispatch('closeSnackbar')
    }, 3000)
  },
  showSuccessMessage ({ commit }, snackbarMessage) {
    commit('setIsSnackbarVisible', true)
    commit('setSnackbarMessage', snackbarMessage)
    commit('setSnackbarType', 'success')
    setTimeout(() => {
      this.dispatch('snackbar/closeSnackbar')
    }, 3000)
  },
  showInfoMessage ({ commit }, snackbarMessage) {
    commit('setIsSnackbarVisible', true)
    commit('setSnackbarMessage', snackbarMessage)
    commit('setSnackbarType', 'info')
  },
  closeSnackbar ({ commit }) {
    commit('setIsSnackbarVisible', false)
  }
}

export const mutations = {
  setIsSnackbarVisible (state, payload) {
    state.isSnackbarVisible = payload
  },
  setSnackbarMessage (state, payload) {
    state.snackbarMessage = payload
  },
  setSnackbarType (state, payload) {
    state.snackbarType = payload
  }
}
