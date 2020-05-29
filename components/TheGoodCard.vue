<template>
  <v-card flat class="mx-auto pa-5">{{ guid }}</v-card>
</template>

<script>
// import { mapState } from 'vuex'
// const consola = require('consola')
export default {
  props: ['guid'],
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
