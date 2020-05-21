<template>
  <v-container class="font-weight-light headline text-justify">
    <content>
      <ul>
        <li v-for="(pos, i) in $store.state.nomenklator.cartList" :key="i">
          <h6>
            {{ pos.artikul }}, {{ pos.name }}, {{ pos.qty }} , ({{ pos.guid }})
          </h6>
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
