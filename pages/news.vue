<template>
  <div>
    <v-card v-for="(item, i) in newsBlock" :key="i" flat class="pa-0 px-5">
      <v-card-title>
        <span class="headline" @click="goToNewBlock(i)">{{ item.header }}</span>
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
    async goToNewBlock(i) {
      await this.$store.commit('SET_PDF_FILE', i)

      this.$router.push({ path: '/view_pdf' })
    },
  },
}
</script>
