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
    const list = _.sortBy(state.address, 'id')

    _.forEach(list, (v) => {
      v.phone_call = v.phone.replace(/[^0-9||+]/g, '')
    })

    return list
  },
}
