<template>
  <div class="">
    <v-card flat class="pa-5 py-0 mx-0">
      <v-card-title>{{ res.rows[0].name }} </v-card-title>
      <v-card-subtitle
        >{{ res.rows[0].artikul }}, {{ res.rows[0].artikul_new }}
      </v-card-subtitle>
      <v-card-text>
        <v-chip>кол-во: {{ parseFloat(res.rows[0].qty1) }}</v-chip>
      </v-card-text>
      <v-carousel
        hide-delimiters
        height="300"
        class="mb-3"
        :show-arrows="res && res.rowphoto ? res.rowphoto.length > 1 : false"
      >
        <v-carousel-item
          v-for="(photo, i) in res.rowphoto"
          :key="i"
          :src="photo.pic_path"
        ></v-carousel-item>
      </v-carousel>
      <v-card-text v-html="res.rows[0].describe"> </v-card-text>
    </v-card>
    <TheCucumbers />
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import TheCucumbers from '@/components/TheCucumbers.vue'

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
  components: { TheCucumbers },
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
  mounted() {
    const el1 = document.getElementsByClassName('v-window__prev')[0]
    const el2 = document.getElementsByClassName('v-window__next')[0]

    if (el1) {
      el1.style.top = '25px'
      el2.style.top = '25px'
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
