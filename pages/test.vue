<template>
  <v-card
    v-touch="{
      up: () => $emit('ovr'),
      down: () => $emit('ovr'),
    }"
  >
    <v-card-title class="pa-2">
      <v-chip class="title" dark color="blue">артикул {{ art }}</v-chip>
      <v-spacer />
      <v-chip class="title" dark ripple color="blue" @click="$emit('ovr')"
        >Отмена</v-chip
      >
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-text-field
        label="ед изм. шт., в заказе было 123"
        readonly
        :value="strQty"
        class="headline"
        outlined
        shaped
      ></v-text-field>
      <v-container class="mt-n5">
        <v-row class="mb-5">
          <v-btn fab color="blue lighten-2" dark class="title mx-2" small
            >7</v-btn
          >
          <v-btn fab color="blue lighten-2" dark class="title mx-2" small
            >8</v-btn
          >
          <v-btn fab color="blue lighten-2" dark class="title mx-2" small
            >9</v-btn
          >
          <v-spacer />
          <v-btn outlined color="blue" class="title ml-2">C</v-btn>
        </v-row>
        <v-row class="mb-5">
          <v-btn fab color="blue lighten-2" dark class="title mx-2" small
            >4</v-btn
          >
          <v-btn fab color="blue lighten-2" dark class="title mx-2" small
            >5</v-btn
          >
          <v-btn fab color="blue lighten-2" dark class="title mx-2" small
            >6</v-btn
          >
          <v-spacer />
          <v-btn outlined color="blue" class="title ml-2">x</v-btn>
        </v-row>
        <v-row class="mb-5">
          <v-btn fab color="blue lighten-2" dark class="title mx-2" small
            >1</v-btn
          >
          <v-btn fab color="blue lighten-2" dark class="title mx-2" small
            >2</v-btn
          >
          <v-btn fab color="blue lighten-2" dark class="title mx-2" small
            >3</v-btn
          >
          <v-spacer />
          <v-btn outlined color="blue" class="title ml-2">+</v-btn>
        </v-row>
        <v-row class="mb-5">
          <v-btn fab color="blue lighten-2" dark class="title mx-2" small
            >0</v-btn
          >
          <v-btn fab color="blue lighten-2" dark class="title mx-2" small
            >.</v-btn
          >
          <v-btn fab color="blue lighten-2" dark class="title mx-2" small
            >=</v-btn
          >
          <v-spacer />
          <v-btn outlined color="blue" class="title ml-2" @click="$emit('ovr')"
            ><v-icon>mdi-cart</v-icon></v-btn
          >
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['art'],
  data() {
    return {
      q1: 12480,
      q2: 12480,
      strQty: '12480',
      firstEnter: true,
    }
  },
}
</script>
