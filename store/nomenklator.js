import { getData } from '@/utils/store-utils'
// import _ from 'lodash'

export const state = () => ({
  nomenklator: [],
  subNomenklator: [],
})

export const mutations = {
  SET_NOMENKLATOR(state, rows) {
    state.nomenklator = rows
  },
  SET_SUB_NOMENKLATOR(state, rows) {
    state.subNomenklator = rows
  },
}

export const getters = {
  isGroup: (state) => {
    return state.subNomenklator && state.subNomenklator.length > 0 && state.subNomenklator[0].itgroup || true
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
}
