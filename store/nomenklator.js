import { getData } from '@/utils/store-utils'

// const consola = require('consola')

// import _ from 'lodash'

export const state = () => ({
  nomenklator: [],
  subNomenklator: [],
  test: [],
})

export const mutations = {
  SET_NOMENKLATOR(state, rows) {
    state.nomenklator = rows
  },
  SET_SUB_NOMENKLATOR(state, rows) {
    state.subNomenklator = rows
  },
  SET_SUB_NOMENKLATOR_QTY2(state, info) {
    // consola.info(this)

    if (info.qty2 === -1) {
      state.subNomenklator[info.ind].qty2 = state.subNomenklator[info.ind].qty1
    } else {
      state.subNomenklator[info.ind].qty1 = state.subNomenklator[info.ind].qty2
    }
  },
}

export const getters = {
  isGroup: (state) => {
    return (
      state.subNomenklator &&
      state.subNomenklator.length > 0 &&
      state.subNomenklator[0].itgroup
    )
  },
  getNomenklator: (state) => {
    return state.nomenklator
  },
  getSubNomenklator: (state) => {
    return state.subNomenklator
  },
}

export const actions = {
  async loadAll({ commit, dispatch }) {
    const { data: nomenklator } = await getData('/api/db', this.$axios)
    commit('SET_NOMENKLATOR', nomenklator)
  },
  async loadSubNumenklator({ commit, dispatch }, params) {
    const { data: nomenklator } = await getData(
      `/api/db/${params.id}`,
      this.$axios
    )
    commit('SET_SUB_NOMENKLATOR', nomenklator)
  },
  async chngeCart({ commit, dispatch }, { info }) {
    // consola.info(info)
    const { data } = await this.$axios.post('/api/chngeCart', info)

    if (data.err.length > 0) {
      // consola.info(data.err)
      commit('SET_SUB_NOMENKLATOR_QTY2', { qty2: -1, ind: info.ind })

      await this.dispatch('snackbar/setSnackbar', {
        color: 'red',
        text: `Поз НЕ добавлена. Оибка: ${data.err.split(',')}`,
        timeout: 5000,
      })
    } else {
      commit('SET_SUB_NOMENKLATOR_QTY2', { qty2: data.rows.qty, ind: info.ind })

      await this.dispatch('snackbar/setSnackbar', {
        color: 'green',
        text: `Поз добавлена`,
        timeout: 2000,
      })
    }
  },
}
