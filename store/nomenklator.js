// import _ from 'lodash'
import nomenklTopLevel from '@/assets/nomenkl-top-level.json'

// import { getData } from '@/utils/store-utils'

// const consola = require('consola')

// import _ from 'lodash'

export const state = () => ({
  nomenklator: [],
  subNomenklator: [],
  countCart: 0,
  cartList: [],
  nomenklTopLevel: nomenklTopLevel.rows,
})

export const mutations = {
  SET_NOMENKLATOR(state, data) {
    state.nomenklator = data.recs
    state.countCart = data.countCart
  },
  SET_SUB_NOMENKLATOR(state, rows) {
    state.subNomenklator = rows
    // state.countCart = data.countCart
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
  getNomenklTopLevel: (state) => {
    // return _.sortBy(state.nomenklTopLevel, 'id')
    return state.nomenklTopLevel
  },
}

export const actions = {
  async refreshCountCart({ commit, dispatch }) {
    const userid = this.$auth.user ? this.$auth.user.id : 1
    const rows = await this.$api('orders', 'getCart', { userid })
    commit('SET_COUNT_CART', rows)
  },
  async loadAll({ commit, dispatch }) {
    this.dispatch('nomenklator/refreshCountCart')
    // const data = await getData('/api/db', this.$axios)
    const data = await this.$axios.$get('/api/db', {
      params: { userid: (this.$auth.user && this.$auth.user.id) || 1 },
    })
    commit('SET_NOMENKLATOR', data)
  },
  async loadSubNumenklator({ commit, dispatch }, { id }) {
    const userid = this.$auth.user ? this.$auth.user.id : 1
    const rows = await this.$api('nomenklator', 'getSubNomenklator', {
      id: userid,
      parentguid: id,
    })

    commit('SET_SUB_NOMENKLATOR', rows)
  },
  async chngeCart({ commit, dispatch, state }, ind) {
    const obj = state.subNomenklator[ind]
    const info = {
      guid: obj.guid,
      qty: obj.qty2,
      userid: this.$auth.loggedIn ? this.$auth.user.id : 1,
    }

    // const { data } = await this.$axios.$post('/api/chngeCart', info)
    const rows = await this.$api('orders', 'chngeCart', info)

    return rows

    // let typeoper = 1
    //
    // if (data.err.length === 0) {
    //   await this.dispatch('snackbar/setSnackbar', {
    //     color: 'green',
    //     text: `Поз добавлена/изменена`,
    //     timeout: 2000,
    //   })
    // } else {
    //   typeoper = 0
    //
    //   await this.dispatch('snackbar/setSnackbar', {
    //     color: 'red',
    //     text: `Поз НЕ добавлена. Ошибка: ${data.err.join()}`,
    //     timeout: 5000,
    //   })
    // }
    //
    // commit('SET_NEW_QTY', { ind, typeoper })
    // this.dispatch('nomenklator/refreshCountCart')
  },
}
