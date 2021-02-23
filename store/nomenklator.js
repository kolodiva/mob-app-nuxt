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
  goodCard: [],
  breadCrumb: [],
  ordersList: [],
  searchNomenklator: [],
  searchText: '',
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
    const obj = ind < 0 ? state.goodCard.rows[0] : state.subNomenklator[ind]
    if (typeoper === 1) {
      obj.qty1 = obj.qty2
      obj.total = parseFloat(obj.qty1 * obj.price1).toFixed(2)
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
  SET_GOOD_CARD(state, { rows, rowsphoto, breadcrumb }) {
    state.goodCard = { rows, rowsphoto }
    state.breadCrumb = breadcrumb
  },
  SET_BREAD_CRUMB(state, rows) {
    state.breadCrumb = rows
  },
  SET_ORDERS_LIST(state, rows) {
    state.ordersList = rows
  },
  SET_SEARCH_NOMENKLATOR(state, rows) {
    state.searchNomenklator = rows
  },
  SET_SEARCH_TEXT(state, searchtext) {
    state.searchText = searchtext
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
  getGoodCard: (state) => {
    return state.goodCard
  },
  getCartList: (state) => {
    return state.cartList
  },
  getBreadCrumb: (state) => {
    return state.breadCrumb
  },
  getNomenklTopLevel: (state) => {
    // return _.sortBy(state.nomenklTopLevel, 'id')
    return state.nomenklTopLevel
  },
  getWaitLoadNomenklator: (state) => {
    // return _.sortBy(state.nomenklTopLevel, 'id')
    return state.waitNomenklatorLoad ? state.waitNomenklatorLoad : false
  },
  getOrdersList: (state) => {
    return state.ordersList
  },
  getNomenklatorBySearchText: (state) => {
    return state.searchNomenklator
  },
  getSearchText: (state) => {
    return state.searchText
  },
  getSchemaBreadcrumb: (state) => {
    const list = []

    let path = ''

    state.breadCrumb.forEach((item, i) => {
      if (item.guid) {
        path = path + '/' + item.guid
        list.push({
          '@type': 'ListItem',
          name: item.name,
          position: i,
          item: `https://www.newfurnitura.ru/catalog${path}`,
        })
      }
    })

    const res = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: list,
    }

    return res
  },
  getSchemaProduct: (state) => {
    const goodCardData = state.goodCard.rows[0].intrnt_microdata
    const goodCardDataPics = state.goodCard.rowsphoto

    const img = []
    goodCardDataPics.forEach((item, i) => {
      img.push(item.pic_path.replace('_250x250', ''))
    })

    const res = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      image: img,
      name: goodCardData.title,
      description: goodCardData.description,
      sku: state.goodCard.rows[0].artikul_new,
      mpn: state.goodCard.rows[0].artikul,
      brand: {
        '@type': 'Brand',
        name: goodCardData.Product_manufacturer,
      },
      offers: {
        '@type': 'Offer',
        url: `https://www.newfurnitura.ru/catalog/${state.goodCard.rows[0].parentguid}/${state.goodCard.rows[0].synonym}`,
        priceCurrency: 'RUR',
        price: state.goodCard.rows[0].price1,
        itemCondition: 'https://schema.org/UsedCondition',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2030-12-31',
      },
    }

    return res
  },
  getSchemaProductList: (state) => {
    const productList = state.subNomenklator

    const itemList = []

    productList.forEach((item, i) => {
      if (item.itgroup) {
        itemList.push({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            url: `https://www.newfurnitura.ru/catalog/${item.guid}`,
            name: item.name,
          },
        })
      } else {
        itemList.push({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@context': 'https://schema.org',
            '@type': 'Product',
            position: i + 1,
            url: `https://www.newfurnitura.ru/catalog/${item.parentguid}/${item.synonym}`,
            image: item.guid_picture.replace('_250x250', ''),
            name: item.intrnt_microdata.title,
            description: item.intrnt_microdata.description,
            sku: item.artikul_new,
            mpn: item.artikul,
            brand: {
              '@type': 'Brand',
              name: item.intrnt_microdata.Product_manufacturer,
            },
            offers: {
              '@type': 'Offer',
              url: `https://www.newfurnitura.ru/catalog/${item.parentguid}/${item.synonym}`,
              priceCurrency: 'RUR',
              price: item.price1,
              itemCondition: 'https://schema.org/UsedCondition',
              availability: 'https://schema.org/InStock',
              priceValidUntil: '2030-12-31',
            },
          },
        })
      }
    })

    const res = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: itemList,
      name: 'Перечень товаров и категорий',
    }

    return res
  },
  getHeaderDescription: (state) => {
    return (
      state.breadCrumb &&
      state.breadCrumb.length > 0 &&
      state.breadCrumb[state.breadCrumb.length - 1]
    )
  },
}

export const actions = {
  async refreshCountCart({ commit, dispatch }) {
    const userid = this.$auth.user ? this.$auth.user.id : 1
    const connectionid = state.connectionid
    const rows = await this.$api('orders', 'getCart', { userid, connectionid })
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
    const { rows, breadcrumb } = await this.$api(
      'nomenklator',
      'getSubNomenklator',
      {
        userid,
        parentguid: id,
        connectionid: state.connectionid,
      }
    )

    commit('SET_SUB_NOMENKLATOR', rows)
    // commit('SET_WAIT_LOAD_NOMENKLATOR', false)
    commit('SET_BREAD_CRUMB', breadcrumb)

    // consola.info(breadcrumb)
    return state.subNomenklator.length > 0
  },
  async loadSearchNumenklator({ commit, dispatch, state }, { searchtext }) {
    const { rows } = await this.$api('nomenklator', 'getSearchNomenklator', {
      searchtext,
    })

    commit('SET_SEARCH_NOMENKLATOR', rows)
    commit('SET_SEARCH_TEXT', searchtext)
  },
  async loadGoodCard({ commit, dispatch, state }, { id2 }) {
    // commit('SET_WAIT_LOAD_NOMENKLATOR', true)
    const userid = this.$auth.user ? this.$auth.user.id : 1
    const { rows, rowsphoto, breadcrumb } = await this.$api(
      'nomenklator',
      'getGoodCard',
      {
        userid,
        synonym: id2,
        connectionid: state.connectionid,
      }
    )

    // consola.info(res)
    commit('SET_GOOD_CARD', { rows, rowsphoto, breadcrumb })

    return rows && rows.length > 0
  },
  async chngeCart({ commit, dispatch, state }, ind) {
    // ind < 0 case chnge from cardGood
    const obj = ind < 0 ? state.goodCard.rows[0] : state.subNomenklator[ind]
    // consola.info(obj)

    const info = {
      guid: obj.guid,
      qty: obj.qty2,
      price1: obj.price1,
      unit_type_id: obj.unit_type_id,
      userid: this.$auth.loggedIn ? this.$auth.user.id : 1,
      connectionid: state.connectionid,
    }

    const rows = await this.$api('orders', 'chngeCart', info)

    commit('SET_NEW_QTY', { ind, typeoper: 1 })

    return rows
  },
  async procOrder(
    { commit, dispatch, state },
    { mister, filial, email, phone, info, mastercard }
  ) {
    const infoOrder = {
      mister,
      filial,
      email,
      phone,
      info: info + '_mob',
      userid: this.$auth.loggedIn ? this.$auth.user.id : 1,
      connectionid: state.connectionid,
      mastercard,
    }

    const rows = await this.$api('orders', 'procOrder', infoOrder)

    return rows
  },

  async getOrdersList({ commit, dispatch, state }) {
    // consola.info(this.$auth.user)
    if (!this.$auth.loggedIn) {
      commit('SET_ORDERS_LIST', [])
      return
    }
    const info = {
      userid: this.$auth.loggedIn ? this.$auth.user.id : 1,
      connectionid: state.connectionid,
    }

    const rows = await this.$api('orders', 'getOrdersList', info)

    commit('SET_ORDERS_LIST', rows)

    // return rows
  },
}
