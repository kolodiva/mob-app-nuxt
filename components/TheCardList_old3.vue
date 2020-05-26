<template>
  <v-row class="px-6 py-3" align="center">
    <v-menu
      v-model="menu"
      bottom
      right
      transition="scale-transition"
      origin="top left"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <v-chip
          class="my-3 title"
          color=""
          text-color="blue darken-4"
          ripple
          outlined
          style="border: 0.5px solid;"
          v-on="on"
        >
          <v-icon left class="pl-2">mdi-cart-plus</v-icon>
          <span v-text="qty1"></span>
        </v-chip>
      </template>

      <v-card width="300">
        <v-card-text class="title pb-0"
          >артикул: {{ item.artikul }}</v-card-text
        >
        <v-chip
          class="ma-3 pa-2"
          color=""
          text-color="blue darken-4"
          ripple
          outlined
          style="border: 0.5px solid; width: 90%;"
          v-on="on"
        >
          <v-icon left class="pl-2">mdi-cart-plus</v-icon>
          <span class="title" v-text="qty1"></span>
        </v-chip>
        <v-divider />
        <v-row>
          <v-col cols="9" class="py-0">
            <v-chip-group column class="pa-3">
              <v-chip
                v-for="n in 9"
                :key="n"
                class="pa-4"
                outlined
                color="blue darken-4"
                ripple
                @click="qty_t += `${10 - n}`"
              >
                <span class="title">{{ 10 - n }}</span>
              </v-chip>

              <v-chip class="pa-4" outlined color="blue darken-4" ripple>
                <span class="title">0</span>
              </v-chip>

              <v-chip
                class="pa-4"
                outlined
                color="blue darken-4"
                ripple
                @click="qty_t += '.'"
              >
                <span class="title">.</span>
              </v-chip>
            </v-chip-group>
          </v-col>
          <v-col class="px-0" cols="3">
            <v-chip-group column class="">
              <v-chip
                class="pa-3"
                outlined
                color="blue darken-4"
                ripple
                @click="qty_t = '0'"
              >
                <span class="title red--text">СЕ</span>
              </v-chip>
              <v-spacer />
              <v-chip
                class="pa-3"
                outlined
                color="blue darken-4"
                ripple
                @click="menu = !menu"
              >
                <span class="title green--text">OK</span>
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
      </v-card>
    </v-menu>
  </v-row>
</template>

<script>
export default {
  props: ['item'],
  data: () => ({
    on: false,
    menu: false,
    qty_t: '123',
  }),
  computed: {
    qty1() {
      return this.qty_t
    },
  },
}
</script>
