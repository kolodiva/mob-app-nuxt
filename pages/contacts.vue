<template>
  <v-container class="my-8">
    <v-row dense>
      <v-col cols="12">
        <v-card
          v-for="address in $store.state.addresses"
          :key="address.id"
          dark
          color="blue darken-4"
          class="mt-2"
        >
          <v-card-title class="headline">{{ address.city }}</v-card-title>

          <v-card-subtitle>Позвоните Соулу {{ address.phone }}</v-card-subtitle>

          <v-card-actions>
            <a :href="`callto:${address.phone_call}`" style="color: white;"
              >Сделать звонок</a
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {}
  },
  beforeCreate() {
    this.$store.commit('setHeaderName', 'Контакты')
  },
}
</script>
