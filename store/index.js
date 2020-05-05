export const strict = false

export const state = () => ({
  isLoaded: false,
  user: undefined,
  headerName: 'МФ Комплект',
  showOverlay: false,
  pdfFile: '/mf_komplekt_osoby_rezim_raboty.pdf',
})

export const mutations = {
  FINISH_LOADING(state) {
    state.isLoaded = true
  },
  SET_HEADER_NAME(state, value) {
    state.headerName = value
  },
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    // commit('setUser', req.headers)
  },
}
