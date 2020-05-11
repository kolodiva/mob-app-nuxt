<template>
  <v-row dense>
    <v-col v-for="(pos, i) in nomenklators" :key="i" cols="12">
      <v-card color="" light>
        <v-card-title
          class="headline"
          v-text="`${pos.artikul + ', ' + pos.artikul_new}`"
        ></v-card-title>

        <v-card-subtitle class="pb-0" v-text="pos.name"></v-card-subtitle>
        <v-row justify="end" class="mx-2">
          <v-avatar class="ma-3" size="100">
            <v-img
              eager
              :src="pos.guid_picture"
              aspect-ratio="1"
              class="grey lighten-2"
              contain
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-avatar>
        </v-row>
        <v-row class="mx-2 px-0">
          <v-col cols="6" class="px-0">
            <v-subheader>Сумма<br />{{ pos.total }} ₽</v-subheader>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="pos.qty2"
              type="number"
              min="0"
              label="Кол-во"
              :suffix="pos.unit_name"
              @keyup.enter.prevent="onEnter(i)"
              @input="onInput(pos, $event)"
              ><v-icon
                v-if="pos.qty1 != pos.qty2"
                slot="append"
                color="red"
                @click.prevent="onEnter(i)"
                >mdi-cart</v-icon
              >
            </v-text-field>
          </v-col>
        </v-row>
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
</template>

<script>
// const consola = require('consola')
// import { mapState } from 'vuex'
export default {
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
  computed: {
    nomenklators() {
      return this.$store.getters['nomenklator/getSubNomenklator']
    },
  },
  beforeCreate() {
    this.$store.commit('SET_HEADER_NAME', 'МФ Комплект')
  },
  methods: {
    onEnter(i) {
      this.$store.dispatch('nomenklator/chngeCart', i)
    },
    onInput(obj, val) {
      // consola.info(e)
      obj.total = (obj.price1 * val).toFixed(2)
    },
  },
}
</script>
