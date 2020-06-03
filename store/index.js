// const consola = require('consola')
export const strict = false

export const state = () => ({
  showBackSpace: false,
  isLoaded: false,
  user: undefined,
  headerName: 'МФ Комплект',
  showOverlay: false,
  pdfFile: '',
  newsBlock: [],
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
  SET_NEWS_BLOCK(state, rows) {
    state.newsBlock = rows
  },
  SET_PDF_FILE(state, i) {
    if (i >= 0) {
      state.pdfFile = 'https://newfurnitura.ru/news/' + state.newsBlock[i].pdf
    }
  },
}

export const getters = {
  getNewsBlock: (state) => {
    return state.newsBlock
  },
  getPdfFile: (state) => {
    return state.pdfFile
  },
}

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    await commit('nomenklator/SET_CONNECTION_ID', req.cookies.connectionid)
  },
  async getNewsBlock({ commit, dispatch, state }) {
    const rows = await this.$api('news', 'getNewsBlock')

    await commit('SET_NEWS_BLOCK', rows)
  },
}
