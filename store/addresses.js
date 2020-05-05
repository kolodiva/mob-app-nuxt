import _ from 'lodash'
import addresses from '@/assets/addresses.json'

export const state = () => ({
  address: addresses.address,
})

export const getters = {
  getByCity: (state) => (city) => {
    return _.filter(state.address, (v) => v.city === city)
  },
  getAllSortCity: (state) => {
    return _.sortBy(state.address, 'city')
  },
}
