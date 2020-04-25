<template>
  <div v-if="caseStart == 1"><Groups :nomenklators="nomenklators" /></div>
  <div v-else-if="caseStart == 2"><Goods :nomenklators="nomenklators" /></div>
  <div v-else><Heroes1 :pos_nom="posNom" /></div>
</template>
<script>
// import winOverlay from '@/components/overlay.vue'
import Groups from '@/components/Groups.vue'
import Goods from '@/components/Goods.vue'
import Heroes1 from '@/components/Heroes1.vue'
const consola = require('consola')

export default {
  // validate({ params, query, router }) {
  //   // consola.log(params)
  //   // consola.log(query)
  //   // consola.log(router)
  //   // if (query && query.itemcard) {
  //   //   const url = `${params.id}?itemCard=${query.itemcard}`
  //   //   // consola.log(url)
  //   //   router.push(url)
  //   // }
  //   return true
  // },
  components: {
    // winOverlay,
    Groups,
    Goods,
    Heroes1,
  },
  async asyncData({ app, params, query }) {
    // consola.log(params, query)
    let nCase = 0
    let url = ''
    let posNom = ''
    if (query && query.itemcard) {
      // url = `/api/db/itemCard/${query.itemcard}`
      url = `/api/db/${params.id}`
      nCase = 3
      posNom = query.itemcard
    } else {
      url = `/api/db/${params.id}`
    }
    try {
      const row = await app.$axios.$get(url)

      if (row.length === 0) {
        row.push({ id: 1, itgroup: false, name: 'The streets have no name.' })
      }

      const resCase = nCase > 0 ? nCase : row[0].itgroup ? 1 : 2
      // consola.log(resCase)
      return {
        nomenklators: row,
        caseStart: resCase,
        posNom,
      }
    } catch (e) {
      consola.log(e)
    } finally {
    }
  },
  data: () => ({
    nomenklators: [],
    caseStart: 1,
    posNom: '',
  }),
}
</script>
