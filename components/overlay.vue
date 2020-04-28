<template>
  <div class="text-center">
    <v-overlay :value="overlay">
      <v-img src="baner_korona.jpg" width="100vw" contain></v-img>
      <v-btn icon @click="overlay = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-overlay>
  </div>
</template>

<script>
export default {
  data: () => ({
    overlay: true,
  }),
}
</script>
