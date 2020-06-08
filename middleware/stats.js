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
    return redirect(newPath)
  }

  if (route && route.fullPath && route.fullPath.includes('///?utm_source=')) {
    const newPath = route.fullPath.replace('//?utm_source=', '/?utm_source=')
    return redirect(newPath)
  }

  if (route && route.fullPath && route.fullPath.includes('//?utm_source=')) {
    const newPath = route.fullPath.replace('//?utm_source=', '/?utm_source=')
    return redirect(newPath)
  }

  if (
    route &&
    route.fullPath &&
    route.fullPath.includes('/advs/') &&
    !route.fullPath.includes('.html')
  ) {
    const newPath = route.fullPath + '.html'
    return redirect(newPath)
  }
}
