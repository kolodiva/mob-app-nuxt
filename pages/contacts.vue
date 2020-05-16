<template>
  <v-container class="">
    <v-row dense>
      <v-col v-for="address in addressess" :key="address.id" cols="12">
        <v-card dark color="blue darken-4">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline"
                v-text="address.city"
              ></v-card-title>

              <v-card-title v-text="address.phone"></v-card-title>

              <v-card-subtitle v-text="address.address"></v-card-subtitle>
            </div>

            <v-avatar class="ma-5" tile>
              <a
                :href="`callto:${address.phone_call}`"
                style="color: white; text-decoration: none;"
                ><v-icon large>mdi-phone-forward</v-icon></a
              >
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// const consola = require('consola')
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
    addressess() {
      const res = this.$store.getters['addresses/getAllSortCity']
      return res
    },
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
