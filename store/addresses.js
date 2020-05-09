import _ from 'lodash'
import addresses from '@/assets/addresses.json'
import mainPictures from '@/assets/main-pictures.json'

export const state = () => ({
  address: addresses.address,
  mainPicture: mainPictures.mainPicture,
})

export const getters = {
  getByCity: (state) => (city) => {
    return _.filter(state.address, (v) => v.city === city)
  },
  getAllSortCity: (state) => {
    return _.sortBy(state.address, 'city')
  },
  getAllMainPic: (state) => {
    return _.sortBy(state.mainPicture, 'id')
  },
}
