// const consola = require('consola')

export default function ({ $auth, route, redirect, store }) {
  if ($auth && $auth.loggedIn) {
    // consola.info($auth)
    // consola.info(store)
    // await store.dispatch('setSnackbar', {
    //   text: 'You are logged yet.',
    // })
    redirect('/')
    // await store.commit('SET_SNACKBAR', {
    //   text: 'You are logged yet.',
    //   color: 'success',
    //   showing: true,
    // })
    // consola.info('45645646545646456')
    // const REDIRECT_URL = '/auth?redirect=' + route.path
    // const REDIRECT_URL = '/'
    // redirect(REDIRECT_URL)
  }
}
