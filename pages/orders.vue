<template>
  <v-container class="font-weight-light headline text-justify">
    <content>
      <ul>
        <li v-for="(pos, i) in $store.state.nomenklator.cartList" :key="i">
          {{ pos.artikul }}, {{ pos.name }}, {{ pos.qty }}
        </li>
      </ul>
    </content>
  </v-container>
</template>
<script>
export default {
  fetch() {
    this.$store.dispatch('nomenklator/refreshCountCart')
  },
  data: () => ({}),
  beforeCreate() {
    this.$store.commit('SET_HEADER_NAME', 'Заказы')
  },
}
</script>
