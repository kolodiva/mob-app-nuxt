import { getData } from '@/utils/store-utils'

// const consola = require('consola')

// import _ from 'lodash'

export const state = () => ({
  nomenklator: [],
  subNomenklator: [],
  countCart: 0,
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
  SET_COUNT_CART(state, countCart) {
    state.countCart = countCart
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
    const data = await getData('/api/db', this.$axios)
    commit('SET_NOMENKLATOR', data)
  },
  async loadSubNumenklator({ commit, dispatch }, params) {
    const data = await getData(`/api/db/${params.id}`, this.$axios)
    commit('SET_SUB_NOMENKLATOR', data)
  },
  async chngeCart({ commit, dispatch }, ind) {
    const obj = this.state.nomenklator.subNomenklator[ind]
    const info = {
      guid: obj.guid,
      qty: obj.qty2,
      idUser: this.$auth.loggedIn ? this.$auth.user.id : 1,
    }

    const { data } = await this.$axios.post('/api/chngeCart', info)

    // consola.info(data)

    // this.state.nomenklator.countCart = data.countCart

    if (data.err.length === 0) {
      obj.qty1 = obj.qty2

      await this.dispatch('snackbar/setSnackbar', {
        color: 'green',
        text: `Поз добавлена/изменена`,
        timeout: 2000,
      })
    } else {
      obj.qty2 = obj.qty1

      await this.dispatch('snackbar/setSnackbar', {
        color: 'red',
        text: `Поз НЕ добавлена. Ошибка: ${data.err.join()}`,
        timeout: 5000,
      })
    }

    commit('SET_COUNT_CART', data.countCart)
  },
}
