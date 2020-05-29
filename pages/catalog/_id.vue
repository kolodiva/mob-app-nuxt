<template>
  <div>
    <GoodCard v-if="guidGoodCard" :guid="guidGoodCard" />
    <Groups v-else-if="isGroup" />
    <Goods v-else />
    <TheCucumbers />
    <v-overlay :value="waitLoadNomenklator">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
// import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import Groups from '@/components/Groups.vue'
import Goods from '@/components/Goods.vue'
import GoodCard from '@/components/TheGoodCard.vue'

import TheCucumbers from '@/components/TheCucumbers.vue'

// const consola = require('consola')
export default {
  async validate({ params, store, query }) {
    const guid = query && query.itemcard ? query.itemcard : ''
    // consola.log(guid)
    await store.commit('nomenklator/SET_GOOD_CARD', guid)
    //   consola.log(store.getters('nomenklator/guidGoodCard'))
    return true
  },
  components: { Groups, Goods, GoodCard, TheCucumbers },
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
      waitLoadNomenklator: 'nomenklator/getWaitLoadNomenklator',
      guidGoodCard: 'nomenklator/guidGoodCard',
    }),
  },
  beforeCreate() {
    this.$store.commit('SET_HEADER_NAME', 'МФ Комплект')
  },
  async mounted() {
    await this.$store.commit('nomenklator/SET_WAIT_LOAD_NOMENKLATOR', false)
    // consola.log(this.$route)
  },
  methods: {},
}
</script>
