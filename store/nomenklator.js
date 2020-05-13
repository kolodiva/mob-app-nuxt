import { getData } from '@/utils/store-utils'

// const consola = require('consola')

// import _ from 'lodash'

export const state = () => ({
  nomenklator: [],
  subNomenklator: [],
  countCart: 0,
  cartList: [],
})

export const mutations = {
  SET_NOMENKLATOR(state, data) {
    state.nomenklator = data.recs
    state.countCart = data.countCart
  },
  SET_SUB_NOMENKLATOR(state, data) {
    state.subNomenklator = data.recs
    state.countCart = data.countCart
  },
  SET_NEW_QTY(state, { ind, typeoper }) {
    const obj = state.subNomenklator[ind]
    if (typeoper === 1) {
      obj.qty1 = obj.qty2
    } else {
      obj.qty2 = obj.qty1
    }
  },
  SET_COUNT_CART(state, rows) {
    state.cartList = rows
    state.countCart = rows.length
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
  async refreshCountCart({ commit, dispatch }) {
    const userid = this.$auth.user ? this.$auth.user.id : 1
    const url = `/api/order/${userid}`
    const rows = await getData(url, this.$axios)
    commit('SET_COUNT_CART', rows)
  },
  async loadAll({ commit, dispatch }) {
    this.dispatch('nomenklator/refreshCountCart')
    const data = await getData('/api/db', this.$axios)
    commit('SET_NOMENKLATOR', data)
  },
  async loadSubNumenklator({ commit, dispatch }, params) {
    const data = await getData(`/api/db/${params.id}`, this.$axios)
    commit('SET_SUB_NOMENKLATOR', data)
    this.dispatch('nomenklator/refreshCountCart')
  },
  async chngeCart({ commit, dispatch, state }, ind) {
    const obj = state.subNomenklator[ind]
    const info = {
      guid: obj.guid,
      qty: obj.qty2,
      idUser: this.$auth.loggedIn ? this.$auth.user.id : 1,
    }

    const { data } = await this.$axios.post('/api/chngeCart', info)

    let typeoper = 1

    if (data.err.length === 0) {
      await this.dispatch('snackbar/setSnackbar', {
        color: 'green',
        text: `Поз добавлена/изменена`,
        timeout: 2000,
      })
    } else {
      typeoper = 0

      await this.dispatch('snackbar/setSnackbar', {
        color: 'red',
        text: `Поз НЕ добавлена. Ошибка: ${data.err.join()}`,
        timeout: 5000,
      })
    }

    commit('SET_NEW_QTY', { ind, typeoper })
    this.dispatch('nomenklator/refreshCountCart')
  },
}
