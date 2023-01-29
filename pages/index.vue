<template>
  <v-row class="px-2" style="">
    <v-col
      v-for="pos in nomenklator"
      :key="pos.id"
      class="d-flex child-flex"
      cols="6"
    >
      <n-link :to="`catalog/${pos.file_name}`" style="text-decoration: none;">
        <v-card>
          <v-avatar tile class="grey lighten-2 ma-0" width="100%" height="140">
            <img
              :src="`/index_pic/${pos.file_name}.png`"
              style="max-height: 120px; max-width: 140px;"
              :alt="`${pos.name}`"
            />
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
    orgSchemaArticle() {
      return this.$store.getters['addresses/getSchemaArticle']({
        url: this.$route.fullPath,
        headline: 'Главная страница',
      })
    },
  },
  beforeCreate() {
    this.$store.commit('SET_HEADER_NAME', 'МФ Комплект')
  },

  head() {
    return {
      meta: [
        {
          name: 'keywords',
          content:
            'Мебельная фурнитура МФ-Комплект, кухонная фурнитура, мебельные ручки, DIY',
          hid: 'keywords',
        },
        {
          name: 'fragment',
          content: '!',
          hid: 'fragment',
        },
        {
          property: 'og:title',
          content: 'Мебельная фурнитура от компании МФ-Комплект.',
          hid: 'og:title',
        },
        {
          property: 'og:description',
          content:
            'Мебельная фурнитура. Наша складская программа, насчитывающая более 5000 наименований продукции, постоянно пополняется с учетом ваших потребностей.',
          hid: 'og:description',
        },
        {
          property: 'og:url',
          content: 'https://www.newfurnitura.ru',
          hid: 'og:url',
        },
        {
          property: 'og:type',
          content: 'website',
          hid: 'og:type',
        },
        {
          property: 'og:site_name',
          content: 'Мебельная фурнитура Подрезково',
          hid: 'og:site_name',
        },
        {
          property: 'og:locale',
          content: 'ru_RU',
          hid: 'og:locale',
        },
        {
          property: 'og:update_time',
          content: '2020-12-19T18:45:15+03:00',
          hid: 'og:update_time',
        },
        {
          property: 'og:image:type',
          content: 'image/jpeg',
          hid: 'og:image:type',
        },
        {
          property: 'og:image',
          content: '/logo_big.png',
          hid: 'og:image',
        },
        {
          property: 'og:image:alt',
          content: 'Логотип компании',
          hid: 'og:image:alt',
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://www.newfurnitura.ru',
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          json: this.orgSchemaArticle,
        },
      ],
    }
  },
}
</script>
