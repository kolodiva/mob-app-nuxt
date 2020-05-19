// const consola = require('consola')
export const strict = false

export const state = () => ({
  showBackSpace: false,
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
  SET_BACKSPACE_BTN(state, value) {
    state.showBackSpace = value
  },
}

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    await commit('nomenklator/SET_CONNECTION_ID', req.cookies.connectionid)
  },
}
