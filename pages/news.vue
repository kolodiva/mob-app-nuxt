<template>
  <div>
    <v-card v-for="(item, i) in newsBlock" :key="i" flat class="pa-0 px-5">
      <v-card-title>
        <span class="headline">{{ item.header }}</span>
        <v-chip class="subtitle-1" light ripple @click="goToNewsBlock(i)"
          >Подробнее...</v-chip
        >
      </v-card-title>

      <v-img :src="`https://www.newfurnitura.ru/news/${item.pic}`"></v-img>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

// import News from '@/components/News.vue'
// const consola = require('consola')
export default {
  components: {
    //  News,
  },
  async asyncData({ store, app, params }) {
    await store.dispatch('getNewsBlock')
  },
  computed: {
    ...mapGetters({
      newsBlock: 'getNewsBlock',
    }),
  },
  methods: {
    async goToNewsBlock(i) {
      let pathNewsBlock = this.newsBlock[i].pdf
      if (pathNewsBlock.includes('.pdf')) {
        await this.$store.commit('SET_PDF_FILE', i)
        pathNewsBlock = '/view_pdf'
        this.$router.push({ path: pathNewsBlock })
      } else {
        pathNewsBlock = '/' + pathNewsBlock
        this.$router.push({ path: pathNewsBlock })
      }
      // consola.info(pathNewsBlock)
    },
  },
}
</script>
