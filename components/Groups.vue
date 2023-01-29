<template>
  <div>
    <h1 class="v-card__title pa-0 pa-2" style="">
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
          :to="`/catalog/${
            pos.itgroup ? pos.guid : pos.parentguid + '/' + pos.synonym
          }`"
          style="text-decoration: none;"
          exact
        >
          <v-card>
            <v-avatar tile class="grey lighten-2 ma-0" size="100%">
              <img :src="pos.guid_picture" style="width: 85%;" />
            </v-avatar>
            <v-card-text class="text--primary pa-2">
              <div class="text-center" style="height: 45px; overflow: hidden;">
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
      orgSchemaBreadcrumb: 'nomenklator/getSchemaBreadcrumb',
      orgSchemaProductList: 'nomenklator/getSchemaProductList',
    }),
    orgSchemaArticle() {
      return this.$store.getters['addresses/getSchemaArticle']({
        url: this.$route.fullPath,
        headline: this.breadcrumb[this.breadcrumb.length - 1].name,
      })
    },
  },
  beforeCreate() {
    this.$store.commit('SET_HEADER_NAME', 'МФ Комплект')
  },
  mounted() {
    this.$store.commit('nomenklator/SET_WAIT_LOAD_NOMENKLATOR', false)
  },
  head() {
    return {
      script: [
        {
          type: 'application/ld+json',
          json: this.orgSchemaArticle,
        },
        {
          type: 'application/ld+json',
          json: this.orgSchemaBreadcrumb,
        },
        {
          type: 'application/ld+json',
          json: this.orgSchemaProductList,
        },
      ],
    }
  },
}
</script>
