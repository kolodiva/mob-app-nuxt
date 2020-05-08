// const consola = require('consola')
export default function ({ route, store }) {
  // return axios.post('http://my-stats-api.com', {
  //   url: route.fullPath,
  // })
  // consola.info(route.path === undefined || route.path === '/')
  store.commit(
    'SET_BACKSPACE_BTN',
    !(route.path === undefined || route.path === '/')
  )
}
