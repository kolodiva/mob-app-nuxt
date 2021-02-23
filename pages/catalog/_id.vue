<template>
  <div>
    <Groups v-if="isGroup" />
    <Goods v-else />
    <TheCucumbers />
    <v-overlay :value="waitLoadNomenklator">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
// import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import Groups from '@/components/Groups.vue'
import Goods from '@/components/Goods.vue'
// import GoodCard from '@/components/TheGoodCard.vue'

import TheCucumbers from '@/components/TheCucumbers.vue'

// const consola = require('consola')
export default {
  // async validate({ params, store, query }) {
  //   const guid = query && query.itemcard ? query.itemcard : ''
  //   // consola.log(guid)
  //   await store.commit('nomenklator/SET_GOOD_CARD', guid)
  //   //   consola.log(store.getters('nomenklator/guidGoodCard'))
  //   return true
  // },
  components: { Groups, Goods, TheCucumbers },
  async asyncData({ app, params, query, store, error }) {
    if (params && params.id) {
      // consola.info(params)
      const res = await store.dispatch('nomenklator/loadSubNumenklator', params)
      if (!res) {
        error({ statusCode: 404, message: 'Товарная позиция НЕ найдена' })
      }
    }
  },

  data: () => ({}),
  computed: {
    ...mapGetters({
      isGroup: 'nomenklator/isGroup',
      waitLoadNomenklator: 'nomenklator/getWaitLoadNomenklator',
      getSearchText: 'nomenklator/getSearchText',
      getDescription: 'nomenklator/getHeaderDescription',
    }),
  },
  beforeCreate() {
    this.$store.commit('SET_HEADER_NAME', 'МФ Комплект')
  },
  async mounted() {
    await this.$store.commit('nomenklator/SET_WAIT_LOAD_NOMENKLATOR', false)
    // consola.log(this.$route)
    // if (this.getSearchText) {
    // window.find('9378')
    // }
  },
  methods: {},
  head() {
    return {
      title: `${this.getDescription.intrnt_microdata.title} - Купить в Москва, Санкт-Петербург, Казань, Екатеринбург, Ростов-на-Дону, Краснодар | Описание, фото, характеристики, цены в Интернет магазине МФ-Комплект`,
      meta: [
        {
          name: 'description',
          content: `${this.getDescription.intrnt_microdata.description}`,
        },
        {
          name: 'og:title',
          content: `Лучшая цена 👍: ${this.getDescription.intrnt_microdata.title} ⭐ ⭐ ⭐ ⭐ ⭐`,
        },
        {
          name: 'og:description',
          content: `Лучшая цена 👍: ${this.getDescription.intrnt_microdata.description} ⭐ ⭐ ⭐ ⭐ ⭐`,
        },
        {
          name: 'og:site_name',
          content: `Мебельная фурнитура Подрезково`,
        },
        {
          name: 'og:url',
          content: `https://www.newfurnitura.ru/catalog/${this.getDescription.guid}`,
        },
        {
          name: 'og:type',
          content: `website`,
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://www.newfurnitura.ru${this.$route.fullPath}`,
        },
      ],
    }
  },
}
</script>
