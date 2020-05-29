<template>
  <div>
    <Groups v-if="isGroup" />
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
import TheCucumbers from '@/components/TheCucumbers.vue'
// const consola = require('consola')
export default {
  components: { Groups, Goods, TheCucumbers },
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
    }),
  },
  beforeCreate() {
    this.$store.commit('SET_HEADER_NAME', 'МФ Комплект')
  },
}
</script>
