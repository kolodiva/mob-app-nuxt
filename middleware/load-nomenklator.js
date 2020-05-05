// import RSVP from 'rsvp'
const consola = require('consola')

export default async function ({ store, from }) {
  consola.info(store.state)
  if (!store.state.isLoaded) {
    await store.dispatch('nomenklator/loadAll')
    store.commit('FINISH_LOADING')
    // store.dispatch('snackbar/setSnackbar', {
    //   color: 'green',
    //   text: `Top level Nomenklator loaded, Vittorio`,
    //   timeout: 2000,
    // })
  }
}
