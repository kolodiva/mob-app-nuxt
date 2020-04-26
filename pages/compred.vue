<template>
  <v-card class="mt-11">
    <v-tabs background-color="white" color="deep-purple accent-4" right>
      <v-tab>Торговля</v-tab>
      <v-tab>Дебеторка</v-tab>
      <v-tab>Результат</v-tab>

      <v-tab-item v-for="n in 3" :key="n">
        <v-container fluid>
          <v-row>
            <v-col v-for="i in 6" :key="i" cols="6" md="4">
              <v-card elevation="3">
                <v-img
                  src="https://newfurnitura.ru/upload/bea0c007-afbc-4f78-85a4-9410b1b6.png"
                  :lazy-src="`https://picsum.photos/10/6?image=${
                    i * n * 5 + 10
                  }`"
                  aspect-ratio="1"
                ></v-img
              ></v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>
<script>
export default {
  beforeCreate() {
    this.$store.commit('setHeaderName', 'Компред')
  },
}
</script>
