<template>
  <v-container class="mt-10">
    <v-row dense>
      <v-col
        v-for="address in $store.state.addresses"
        :key="address.id"
        cols="12"
      >
        <v-card dark color="blue darken-4">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline"
                v-text="address.city"
              ></v-card-title>

              <v-card-title v-text="address.phone"></v-card-title>
            </div>

            <v-avatar class="ma-5" tile>
              <a
                :href="`callto:${address.phone_call}`"
                style="color: white; text-decoration: none;"
                ><v-icon large>mdi-phone-forward</v-icon></a
              >
            </v-avatar>
          </div>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header
                >Добавьте деталей

                <template v-slot:actions>
                  <v-icon>$expand</v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                Some content
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
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

<style scoped>
.v-card {
  border-radius: 20px !important;
}
</style>
