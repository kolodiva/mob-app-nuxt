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

  if (
    route &&
    route.fullPath &&
    route.fullPath.includes('&') &&
    !route.fullPath.includes('/?') &&
    !route.fullPath.includes('?itemcard=')
  ) {
    const firstOf = route.fullPath.indexOf('&')
    let newPath =
      '/' +
      route.fullPath.substr(1, firstOf - 1) +
      '/?' +
      route.fullPath.substr(firstOf + 1)
    // consola.info(newPath)

    if (newPath.slice(-1) === '/') {
      newPath = newPath.slice(0, -1)
    }
    return redirect(newPath.toLowerCase())
  }

  if (route && route.fullPath && route.fullPath.includes('?itemcard=')) {
    let newPath = route.fullPath.replace('?itemcard=', '/')
    if (newPath.slice(-1) === '/') {
      newPath = newPath.slice(0, -1)
    }
    return redirect(newPath.toLowerCase())
  }

  if (route && route.fullPath && route.fullPath.includes('///?utm_source=')) {
    let newPath = route.fullPath.replace('///?utm_source=', '/?utm_source=')
    if (newPath.slice(-1) === '/') {
      newPath = newPath.slice(0, -1)
    }
    return redirect(newPath.toLowerCase())
  }

  if (route && route.fullPath && route.fullPath.includes('//?utm_source=')) {
    let newPath = route.fullPath.replace('//?utm_source=', '/?utm_source=')
    if (newPath.slice(-1) === '/') {
      newPath = newPath.slice(0, -1)
    }
    return redirect(newPath.toLowerCase())
  }

  if (
    route &&
    route.fullPath &&
    route.fullPath !== route.fullPath.toLowerCase()
  ) {
    let newPath = route.fullPath.toLowerCase()

    if (newPath.slice(-1) === '/') {
      newPath = newPath.slice(0, -1)
    }

    return redirect(newPath)
  }

  if (route && route.fullPath && route.fullPath.slice(-1) === '/') {
    const newPath = route.fullPath.slice(0, -1)
    return redirect(newPath.toLowerCase())
  }

  if (route && route.path && route.path.includes('/advs/')) {
    let tmpPath0 = route.path
    // const tmpPath1 = route.fullPath.replace(tmpPath0, '').trim()

    const aPath0 = tmpPath0.split('/')

    const aPath1 = aPath0.filter(function (el) {
      return el !== ''
    })

    tmpPath0 = '/' + aPath1.join('/')

    if (!tmpPath0.includes('.html')) {
      tmpPath0 = tmpPath0 + '.html'
    }

    // consola.info(tmpPath0, tmpPath1)
    // if (tmpPath1) {
    //   tmpPath0 = tmpPath0 + '/' + tmpPath1
    // }

    return redirect(tmpPath0)
  }
}
