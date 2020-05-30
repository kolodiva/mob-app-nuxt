// const consola = require('consola')
export default function ({ route, store, redirect }) {
  // return axios.post('http://my-stats-api.com', {
  //   url: route.fullPath,
  // })
  // consola.info(route.path === undefined || route.path === '/')
  store.commit(
    'SET_BACKSPACE_BTN',
    !(route.path === undefined || route.path === '/')
  )

  if (route && route.fullPath && route.fullPath.includes('?itemcard=')) {
    const newPath = route.fullPath.replace('?itemcard=', '/')
    // consola.info('1111111111111111111', newPath)
    return redirect(newPath)
  }
}
