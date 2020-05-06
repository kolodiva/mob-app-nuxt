<template>
  <v-row>
    <v-col
      v-for="pos in dataNum"
      :key="pos.id"
      class="d-flex child-flex"
      cols="6"
    >
      <n-link
        :to="`catalog/${
          pos.itgroup ? pos.guid : pos.parentguid + '?itemcard=' + pos.synonym
        }`"
        style="text-decoration: none;"
      >
        <v-card>
          <v-img
            eager
            :src="pos.guid_picture"
            aspect-ratio="1"
            class="grey lighten-2"
            lazy-src="https://picsum.photos/500/300?image=15"
            contain
            height="140"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-card-text class="text--primary pa-2">
            <div class="text-center" style="height: 45px; overflow: hidden;">
              {{ pos.name }}
            </div>
          </v-card-text>
        </v-card>
      </n-link>
    </v-col>
  </v-row>
</template>
<script>
//import { getData } from '@/utils/store-utils'
const consola = require('consola')

export default {
  // middleware: 'load-nomenklator',
  async asyncData({ app, params, query, store }) {
    //const { data } = await getData('/api/db', app.$axios)
    const { data } = await app.$axios.$get('/api/db')
    consola.info(data)
    // await store.dispatch('nomenklator/loadAll')
    return { dataNum: data }
  },

  data: () => ({ dataNum: [] }),
  computed: {
    // nomenklators() {
    //   // return this.$store.getters['nomenklator/getNomenklator']
    //   return this.dataNum
    // },
  },
  beforeCreate() {
    this.$store.commit('SET_HEADER_NAME', 'МФ Комплект')
  },
}
</script>
