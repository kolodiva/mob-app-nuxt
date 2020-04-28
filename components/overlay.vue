<template>
  <div class="text-center">
    <v-overlay>
      <v-img src="baner_korona_mob.jpg" width="80vw" contain></v-img>
      <v-btn icon @click="$store.commit('switchShowOverlay')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-overlay>
  </div>
</template>

<script>
export default {}
</script>
