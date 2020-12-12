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
          <v-img
            eager
            :src="`/index_pic/${pos.file_name}.png`"
            aspect-ratio="1"
            class="grey lighten-2"
            contain
            height="140"
            :alt="`${pos.name}`"
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
