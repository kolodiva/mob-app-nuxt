<template>
  <v-card flat class="pa-5 py-0 mx-0">
    <v-card-title>{{ res.rows[0].name }} </v-card-title>
    <v-card-subtitle
      >{{ res.rows[0].artikul }}, {{ res.rows[0].artikul_new }}
    </v-card-subtitle>
    <v-card-content>
      <v-chip>кол-во: {{ parseFloat(res.rows[0].qty1) }}</v-chip>
    </v-card-content>
    <v-carousel hide-delimiters height="300" class="mb-3">
      <v-carousel-item :src="res.rowphoto[0].pic_path"></v-carousel-item>
      <v-carousel-item :src="res.rowphoto[1].pic_path"></v-carousel-item>
    </v-carousel>
    <v-card-content v-html="res.rows[0].describe"> </v-card-content>
  </v-card>
</template>

<script>
// import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
// import Groups from '@/components/Groups.vue'
// import GoodCard from '@/components/TheGoodCard.vue'
// import GoodCard from '@/components/TheGoodCard.vue'

// import TheCucumbers from '@/components/TheCucumbers.vue'

// const consola = require('consola')
export default {
  // async validate({ params, store, query }) {
  //   const guid = query && query.itemcard ? query.itemcard : ''
  //   // consola.log(guid)
  //   await store.commit('nomenklator/SET_GOOD_CARD', guid)
  //   //   consola.log(store.getters('nomenklator/guidGoodCard'))
  //   return true
  // },
  // components: { GoodCard },
  async asyncData({ app, params, query, store }) {
    // consola.info(params)
    if (params && params.id2) {
      // consola.info(params)
      await store.dispatch('nomenklator/loadGoodCard', params)
    }
  },

  data: () => ({}),
  computed: {
    ...mapGetters({
      res: 'nomenklator/getGoodCard',
    }),
  },
  methods: {},
}
</script>
