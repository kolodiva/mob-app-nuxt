<template>
  <Groups v-if="isGroup" />
  <Goods v-else />
</template>
<script>
// import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import Groups from '@/components/Groups.vue'
import Goods from '@/components/Goods.vue'
// const consola = require('consola')
export default {
  components: { Groups, Goods },
  async asyncData({ app, params, query, store }) {
    if (params && params.id) {
      // consola.info(params)
      await store.dispatch('nomenklator/loadSubNumenklator', params)
    }
  },

  data: () => ({}),
  computed: {
    ...mapGetters({
      isGroup: 'nomenklator/isGroup',
    }),
  },
  beforeCreate() {
    this.$store.commit('SET_HEADER_NAME', 'МФ Комплект')
  },
}
</script>
