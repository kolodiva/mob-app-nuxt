<template>
  <v-card flat class="px-5">
    <v-card-title>
      Заказ польз.
      {{ this.$auth.loggedIn ? this.$auth.user.name : 'Anonimus' }}
    </v-card-title>
    <v-card-subtitle>
      <v-row class="title">номер: {{ numOrder }} </v-row>
      <v-row class="title"
        >на сумму: {{ sumOrder }} <v-icon small>mdi-currency-rub</v-icon></v-row
      >
    </v-card-subtitle>

    <v-list three-line ripple>
      <template v-for="(item, i) in cartList">
        <v-list-item :key="i" @click="goToGoodCard(i)">
          <v-list-item-avatar>
            <v-img size="40" :src="item.guid_picture_small"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.artikul"></v-list-item-title>
            <v-list-item-subtitle v-html="item.name"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text
              class="title"
              v-text="parseFloat(item.qty)"
            ></v-list-item-action-text>
            <v-list-item-action-text
              class="title"
              v-text="parseFloat(item.price)"
            ></v-list-item-action-text>
            <v-list-item-action-text
              class="title"
              v-text="parseFloat(item.sum)"
            ></v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
        <v-divider :key="i * 10" inset></v-divider>
      </template>
    </v-list>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData({ app, params, query, store }) {
    await store.dispatch('nomenklator/refreshCountCart')
  },
  data: () => ({}),
  beforeCreate() {
    this.$store.commit('SET_HEADER_NAME', 'Заказы')
  },
  computed: {
    ...mapGetters({
      cartList: 'nomenklator/getCartList',
    }),
    numOrder() {
      return this.cartList && this.cartList.length > 0
        ? this.cartList[0].order_id + ' от ' + this.cartList[0].data_on
        : '***'
    },
    sumOrder() {
      return this.cartList && this.cartList.length > 0
        ? parseFloat(this.cartList[0].sum_total)
        : '0'
    },
  },
  methods: {
    getCoodCardPath(i) {
      return this.cartList && this.cartList.length > 0
        ? `/catalog/${this.cartList[i].parentguid}/${this.cartList[i].synonym}`
        : undefined
    },
    goToGoodCard(i) {
      const path = this.getCoodCardPath(i)
      if (path) {
        this.$router.push({ path })
      }
    },
  },
}
</script>
