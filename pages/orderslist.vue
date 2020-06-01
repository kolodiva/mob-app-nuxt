<template>
  <div>
    <v-card flat class="px-5">
      <v-card-title>
        Заказы польз.
        {{ this.$auth.loggedIn ? this.$auth.user.name : 'Anonimus' }}
      </v-card-title>
      <v-card-subtitle> </v-card-subtitle>

      <v-card-actions> </v-card-actions>

      <v-list three-line ripple>
        <template v-for="(item, i) in ordersList">
          <v-list-item :key="i" class="px-0" ripple>
            <v-list-item-content>
              <v-list-item-title
                >{{ item.id }} от {{ item.data_on }}</v-list-item-title
              >
              <v-list-item-subtitle
                >статус: {{ item.status }} опл.картой
                {{ item.card_payment_order }}</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text
                class="title"
                v-text="parseFloat(item.sum)"
              ></v-list-item-action-text>
              <v-list-item-action-text
                class="title"
                v-text="parseFloat(item.sum_for_payment)"
              ></v-list-item-action-text>
              <v-list-item-action-text
                class="title"
                v-text="parseFloat(item.sum_paid)"
              ></v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
          <v-divider :key="(i + 1) * 1000"></v-divider>
        </template>
      </v-list>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  asyncData({ app, params, query, store }) {
    // await store.dispatch('nomenklator/getOrdersList')
  },
  computed: {
    ...mapGetters({
      ordersList: 'nomenklator/getOrdersList',
    }),
  },
  mounted() {
    this.$store.dispatch('nomenklator/getOrdersList')
    // consola.info('test LOGIN')
  },
}
</script>
