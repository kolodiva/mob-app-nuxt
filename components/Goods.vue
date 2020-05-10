<template>
  <v-row dense>
    <v-col v-for="(pos, i) in nomenklators" :key="i" cols="12">
      <n-link
        :to="`${
          pos.itgroup ? pos.guid : pos.parentguid + '?itemcard=' + pos.synonym
        }`"
        style="text-decoration: none;"
      >
        <v-card color="#1F7087" dark>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline"
                v-text="`${pos.artikul + ', ' + pos.artikul_new}`"
              ></v-card-title>

              <v-card-subtitle v-text="pos.name"></v-card-subtitle>
            </div>

            <v-avatar class="ma-3" size="100">
              <v-img
                eager
                :src="pos.guid_picture"
                aspect-ratio="1"
                class="grey lighten-2"
                contain
                height="140"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-avatar>
          </div>
          <v-row class="mx-4">
            <v-col cols="4">
              <v-subheader>Сумма ₽</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field
                label="Количество"
                :value="pos.qty"
                :suffix="pos.unit_name"
              ></v-text-field>
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
      </n-link>
    </v-col>
  </v-row>
</template>

<script>
// const consola = require('consola')
// import winOverlay from '@/components/overlay.vue'
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
}
</script>
