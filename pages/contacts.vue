<template>
  <v-row justify="center">
    <v-expansion-panels inset focusable>
      <v-expansion-panel>
        <v-expansion-panel-header ripple>
          <v-list-item>
            <v-list-item-avatar @click.stop="">
              <a
                href="https://wa.me/79166004290?text=У%20меня%20по%20товару%20вопрос."
                style="text-decoration: none;"
                ><v-img width="36" src="whatsapp.png"></v-img
              ></a>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline"
                >Спросить WhatsApp</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-expansion-panel-header>
      </v-expansion-panel>
      <v-expansion-panel v-for="address in addressess" :key="address.id">
        <v-expansion-panel-header ripple>
          <v-list-item>
            <v-list-item-avatar @click.stop="">
              <a
                :href="`callto:${address.phone_call}`"
                style="text-decoration: none;"
                ><v-icon large>mdi-phone-forward</v-icon></a
              >
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">
                {{ address.city }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="subtitle">{{
              address.phone
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-mail</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="subtitle">{{
              address.address
            }}</v-list-item-content>
          </v-list-item>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
// const consola = require('consola')
import { mapGetters } from 'vuex'
export default {
  name: 'ContactsPage',
  serverCacheKey() {
    return true
  },
  async asyncData({ app, params }) {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      addressess: 'addresses/getAllSortCity',
    }),
  },
  beforeCreate() {
    this.$store.commit('SET_HEADER_NAME', 'Контакты')
  },
}
</script>

<style scoped>
.v-card {
  border-radius: 5px !important;
}
</style>
