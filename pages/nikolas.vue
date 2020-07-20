<template>
  <v-card>
    <v-card>
      <v-card-title class="py-0">
        Яндекс М
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="А найду"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
    </v-card>
    <v-card class="mt-4">
      <v-data-table
        fixed-header
        height="100vh"
        :headers="headers"
        :items="nomenklatorY"
        :search="search"
        disable-pagination
        dense
        mobile-breakpoint="0"
        hide-default-footer
        width="800"
      ></v-data-table>
    </v-card>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
// const consola = require('consola')
export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Артикул',
          align: 'start',
          value: 'artikul',
        },
        {
          text: 'Своб',
          align: 'center',
          value: 'qty1',
        },
        {
          text: 'Резерв',
          align: 'center',
          value: 'qty2',
        },
        {
          text: 'В пути',
          align: 'center',
          value: 'qty3',
        },
        {
          text: 'Цена',
          align: 'center',
          value: 'price',
        },
        {
          text: 'Наименование',
          align: 'left',
          value: 'name',
          width: '600',
        },
      ],
    }
  },
<<<<<<< HEAD
=======
  mounted() {
    this.$store.dispatch('nikolas/getNomenklatorY')
    // consola.info('test LOGIN')
  },
>>>>>>> 0832783720d30c173d946ffa28233571522d8a29
  computed: {
    ...mapGetters({
      nomenklatorY: 'nikolas/getNomenklatorY',
    }),
  },
<<<<<<< HEAD
  mounted() {
    this.$store.dispatch('nikolas/getNomenklatorY')
    // consola.info('test LOGIN')
  },
=======
>>>>>>> 0832783720d30c173d946ffa28233571522d8a29
}
</script>

<style scoped></style>
