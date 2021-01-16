export const state = () => ({
  snackbars: [],
  showMainDisclaimer: true,
})

export const mutations = {
  SET_SNACKBAR(state, snackbar) {
    state.snackbars = state.snackbars.concat(snackbar)
  },
  SET_SHOW_MAIN_DISCLAIMER(state, val) {
    state.showMainDisclaimer = val
  },
}
export const getters = {
  showMainDisclaimer: (state) => {
    return state.showMainDisclaimer
  },
}
export const actions = {
  setSnackbar({ commit }, snackbar) {
    snackbar.showing = true
    snackbar.color = snackbar.color || 'success'
    commit('SET_SNACKBAR', snackbar)
  },
}
