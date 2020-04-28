<template>
  <v-overlay :opacity="opacity" :value="showOverlay">
    <div style="width: 50vw;" @click="showOverlay = !showOverlay">
      <img src="logo_big.png" />
      <a :href="`callto: ${tel_msc}`">
        <v-row justify="space-between">
          <h3 style="color: white;">Москва</h3>
          <v-icon>mdi-phone-forward</v-icon>
        </v-row>
      </a>
      <p>+7 (495) 149-00-02</p>
      <p></p>
      <p>Далее...</p>
    </div>
  </v-overlay>
</template>

<script>
export default {
  data: () => ({
    opacity: 0.6,
    tel_msc: '+7 (495) 149-00-02',
    showOverlay: true,
  }),
}
</script>
