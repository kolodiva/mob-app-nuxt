<template>
  <v-carousel cycle height="100vh" hide-delimiters>
    <v-carousel-item v-for="(slide, i) in $store.state.news" :key="i">
      <v-sheet color="grey" height="100%">
        <v-row class="fill-height" align="center" justify="center">
          <!-- <div class="display-3">{{ slide }} Slide</div> -->
          <!-- <v-img src="/baner_korona_mob.jpg"></v-img> -->
          <div
            @click="
              $store.commit('switchShowOverlayOff')
              $store.commit('setPdfFilePath', `${slide.pdf}`)
            "
          >
            <n-link to="/view_pdf">
              <v-img contain :src="slide.pic" :height="slide.height" />
            </n-link>
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>

    <v-btn
      v-if="$store.state.showOverlay"
      color="blue"
      ripple
      dark
      fab
      fixed
      bottom
      left
      small
      @click="$store.commit('switchShowOverlayOff')"
      ><v-icon>mdi-close</v-icon></v-btn
    >
    <n-link v-else to="/">
      <v-btn color="blue" ripple dark fab fixed bottom left small
        ><v-icon>mdi-home</v-icon></v-btn
      ></n-link
    >
  </v-carousel>
</template>

<script>
// const consola = require('consola')
export default {
  beforeCreate() {
    this.$store.commit('setHeaderName', 'Новости')
  },
}
</script>
