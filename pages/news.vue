<template>
  <v-carousel cycle height="100vh" hide-delimiters progress style="">
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-sheet color="grey" height="100%">
        <v-row class="fill-height" align="center" justify="center">
          <!-- <div class="display-3">{{ slide }} Slide</div> -->
          <!-- <v-img src="/baner_korona_mob.jpg"></v-img> -->
          <div @click="$store.commit('setPdfFilePath', `${slide.pdf}`)">
            <n-link to="/view_pdf">
              <v-img contain :src="slide.pic" :height="slide.height" />
            </n-link>
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
    <v-btn color="blue" ripple dark fab fixed bottom left>
      <n-link to="/" style="color: white;"><v-icon>mdi-home</v-icon></n-link>
    </v-btn>
  </v-carousel>
</template>

<script>
const consola = require('consola')
export default {
  async asyncData({ app, params }) {
    const url = '/api/db_news'
    try {
      const row = await app.$axios.$get(url)

      return { slides: row }
    } catch (e) {
      consola.log(e)
    } finally {
    }
  },
  data() {
    return {
      slides: [
        {
          pic: '/baner_korona_mob.jpg',
          pdf: '/mf_komplekt_osoby_rezim_raboty.pdf',
          height: '80%',
        },
      ],
    }
  },
  beforeCreate() {
    this.$store.commit('setHeaderName', 'Новости')
  },
}
</script>
