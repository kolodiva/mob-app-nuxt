<template>
  <v-container class="font-weight-light headline text-justify">
    <content>
      <ul>
        <li v-for="(pos, i) in orders" :key="i">
          {{ pos.artikul }}, {{ pos.name }}, {{ pos.qty }}
        </li>
      </ul>
    </content>
  </v-container>
</template>
<script>
export default {
  async asyncData({ store, app, params }) {
    const userid = app.$auth.user ? app.$auth.user.id : 1

    const url = `/api/order/${userid}`

    try {
      const rows = await app.$axios.$get(url)

      return { orders: rows }

      // store.commit('setNewsRows', rows)
    } catch (e) {
      // consola.log(e)
    } finally {
    }
  },
  data: () => ({
    orders: [],
  }),
  beforeCreate() {
    this.$store.commit('SET_HEADER_NAME', 'Заказы')
  },
}
</script>
