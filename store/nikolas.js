// const consola = require('consola')

// import _ from 'lodash'

export const state = () => ({
  nomenklatorY: [],
})

export const mutations = {
  SET_NOMENKLATOR_Y(state, data) {
    state.nomenklatorY = data
  },
}

export const getters = {
  getNomenklatorY: (state) => {
    return state.nomenklatorY
  },
}

export const actions = {
  async getNomenklatorY({ commit, dispatch, state }) {
    const rows = await this.$api('nikolas', 'getNomenklatorY')

    commit('SET_NOMENKLATOR_Y', rows)

    // return rows
  },
}
