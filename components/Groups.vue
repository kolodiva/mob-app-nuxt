<template>
  <v-row style="align-self: start;">
    <v-col
      v-for="pos in nomenklator"
      :key="pos.id"
      class="d-flex child-flex"
      cols="6"
    >
      <n-link
        :to="`${
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
import { mapGetters } from 'vuex'
// import { mapState } from 'vuex'
// const consola = require('consola')
// import winOverlay from '@/components/overlay.vue'
export default {
  data: () => ({}),
  computed: {
    ...mapGetters({
      nomenklator: 'nomenklator/getSubNomenklator',
    }),
  },
  beforeCreate() {
    this.$store.commit('SET_HEADER_NAME', 'МФ Комплект')
  },
}
</script>
