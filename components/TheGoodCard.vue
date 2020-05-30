<template>
  <v-card flat class="mx-auto pa-5">{{
    goodCard ? goodCard.describe : 'no data'
  }}</v-card>
</template>

<script>
import { mapGetters } from 'vuex'
// import { mapState } from 'vuex'
// const consola = require('consola')
export default {
  computed: {
    ...mapGetters({
      goodCard: 'nomenklator/getGoodCard',
    }),
  },
  // asyncData({ app, params, query }) {
  //   consola.log('2222222222222222222222', query)
  // },
  // data: () => ({
  //   data1: {
  //     res: '11111111111111111111111111111',
  //   },
  // }),
  // computed: {
  //   ...mapState({
  //     countCart: (state) => state.nomenklator.countCart,
  //   }),
  // },
}
</script>

<style lang="scss" scoped></style>
