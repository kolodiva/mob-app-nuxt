<template>
  <News />
</template>

<script>
import News from '@/components/News.vue'
// const consola = require('consola')
export default {
  components: {
    News,
  },
  async asyncData({ store, app, params }) {
    const url = '/api/db_news'
    try {
      const rows = await app.$axios.$get(url)

      store.commit('setNewsRows', rows)
    } catch (e) {
      // consola.log(e)
    } finally {
    }
  },
}
</script>
