<template>
  <v-container
    fill-height
    class="pa-5 mt-10 font-weight-light headline text-justify"
  >
    <content> <v-img src="gleb.jpg" max-width="100vw" /></content>
  </v-container>
</template>
<script>
export default {
  beforeCreate() {
    this.$store.commit('setHeaderName', 'Герои нашего двора.')
  },
}
</script>
