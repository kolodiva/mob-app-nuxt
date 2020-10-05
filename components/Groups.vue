<template>
  <div>
    <h1 class="v-card__title pa-0 pa-2" style="margin-top: 55px">
      {{ breadcrumb[breadcrumb.length - 1].name }}
    </h1>
    <v-row style="" class="px-2">
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
          style="text-decoration: none"
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
              <div class="text-center" style="height: 45px; overflow: hidden">
                {{ pos.name }}
              </div>
            </v-card-text>
          </v-card>
        </n-link>
      </v-col>
    </v-row>
  </div>
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
      breadcrumb: 'nomenklator/getBreadCrumb',
    }),
  },
  beforeCreate() {
    this.$store.commit('SET_HEADER_NAME', 'МФ Комплект')
  },
  mounted() {
    this.$store.commit('nomenklator/SET_WAIT_LOAD_NOMENKLATOR', false)
  },
}
</script>
