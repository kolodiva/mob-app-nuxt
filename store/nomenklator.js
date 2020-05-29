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
  cucumbers: [],
  nomenklTopLevel: nomenklTopLevel.rows,
  connectionid: undefined,
  waitNomenklatorLoad: undefined,
})

export const mutations = {
  SET_NOMENKLATOR(state, data) {
    state.nomenklator = data.recs
    state.countCart = data.countCart
  },
  SET_SUB_NOMENKLATOR(state, rows) {
    state.subNomenklator = rows
    state.connectionid = undefined
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
  SET_CONNECTION_ID(state, connid) {
    state.connectionid = connid
  },
  SET_WAIT_LOAD_NOMENKLATOR(state, val) {
    state.waitNomenklatorLoad = val
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
  getWaitLoadNomenklator: (state) => {
    // return _.sortBy(state.nomenklTopLevel, 'id')
    return state.waitNomenklatorLoad ? state.waitNomenklatorLoad : false
  },
}

export const actions = {
  async refreshCountCart({ commit, dispatch }) {
    const userid = this.$auth.user ? this.$auth.user.id : 1
    const conntoken = this.$cookies.connectionid
    const rows = await this.$api('orders', 'getCart', { userid, conntoken })
    // console.log(userid, conntoken)
    commit('SET_COUNT_CART', rows)
  },
  async loadAll({ commit, dispatch }) {
    // this.dispatch('nomenklator/refreshCountCart')
    // const data = await getData('/api/db', this.$axios)
    // const data = await this.$axios.$get('/api/db', {
    //   params: { userid: (this.$auth.user && this.$auth.user.id) || 1 },
    // })
    // commit('SET_NOMENKLATOR', data)
  },
  async loadSubNumenklator({ commit, dispatch, state }, { id }) {
    commit('SET_WAIT_LOAD_NOMENKLATOR', true)
    const userid = this.$auth.user ? this.$auth.user.id : 1
    const rows = await this.$api('nomenklator', 'getSubNomenklator', {
      userid,
      parentguid: id,
      connectionid: state.connectionid,
    })

    commit('SET_SUB_NOMENKLATOR', rows)
    commit('SET_WAIT_LOAD_NOMENKLATOR', false)
  },
  async chngeCart({ commit, dispatch, state }, ind) {
    const obj = state.subNomenklator[ind]
    const info = {
      guid: obj.guid,
      qty: obj.qty2,
      userid: this.$auth.loggedIn ? this.$auth.user.id : 1,
    }

    const rows = await this.$api('orders', 'chngeCart', info)

    return rows
  },
}
