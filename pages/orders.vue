<template>
  <v-container fill-height class="pa-5 font-weight-light headline text-justify">
    <content> <h4>Здесь будет размещена информация о Заказах</h4></content>
  </v-container>
</template>
<script>
export default {
  beforeCreate() {
    this.$store.commit('SET_HEADER_NAME', 'Заказы')
  },
}
</script>
