<template>
  <v-row class="px-2" style="">
    <v-col
      v-for="pos in nomenklator"
      :key="pos.id"
      class="d-flex child-flex"
      cols="6"
    >
      <n-link :to="`catalog/${pos.file_name}`" style="text-decoration: none">
        <v-card>
          <v-avatar tile class="grey lighten-2 ma-0" width="100%" height="140">
            <img
              :src="`/index_pic/${pos.file_name}.png`"
              style="max-height: 120px; max-width: 140px"
              :alt="`${pos.name}`"
            />
          </v-avatar>
          <v-card-text class="text--primary pa-2">
            <div class="text-center" style="height: 45px; overflow: hidden">
              {{ pos.name }}
            </div>
          </v-card-text>
        </v-card>
      </n-link>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'IndexPage',
  serverCacheKey() {
    return true
  },
  // middleware: 'load-nomenklator',
  data: () => ({}),
  computed: {
    ...mapGetters({
      nomenklator: 'nomenklator/getNomenklTopLevel',
    }),
  },
  beforeCreate() {
    this.$store.commit('SET_HEADER_NAME', 'МФ Комплект')
  },
}
</script>
