<template>
  <div style="margin-top: 50px;">
    <v-row dense>
      <v-col v-for="(pos, i) in nomenklators" :key="i" cols="12">
        <v-card color="#1F7087" dark>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline"
                v-text="pos.artikul"
              ></v-card-title>

              <v-card-subtitle v-text="pos.name"></v-card-subtitle>
            </div>

            <v-avatar class="ma-3" size="100">
              <v-img
                eager
                :src="pos.guid_picture"
                aspect-ratio="1"
                class="grey lighten-2"
                lazy-src="https://www.newfurnitura.ru/upload/noFoto.jpg"
              ></v-img>
            </v-avatar>
          </div>
          <v-data-table
            dense
            :headers="headers"
            :items="[pos]"
            class="elevation-1"
            item-key="i"
            hide-default-footer
            mobile-breakpoint="200"
            disable-sort
            caption="Цена"
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// const consola = require('consola')
// import winOverlay from '@/components/overlay.vue'
export default {
  props: {
    nomenklators: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  // components: {
  //   winOverlay,
  // },
  data() {
    return {
      headers: [
        {
          text: 'розница',
          value: 'price1',
        },
        {
          text: 'мелкий опт',
          value: 'price2',
        },
        {
          text: 'крупный опт',
          value: 'price3',
        },
      ],
    }
  },
  beforeCreate() {
    this.$store.commit('setHeaderName', 'Комплект')
  },
}
</script>
