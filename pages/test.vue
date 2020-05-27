<template>
  <v-card>
    <v-card-title class="pa-2">
      <v-chip outlined color="blue">артикул 4700</v-chip>
      <v-spacer />
      <v-chip outlined ripple color="blue">Отмена</v-chip>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-text-field
        label="ед изм. шт."
        readonly
        :value="strQty"
        class="headline"
        outlined
        shaped
      ></v-text-field>
      <v-container class="mt-n5">
        <v-row class="mb-5">
          <v-btn color="blue lighten-2" dark class="title">7</v-btn>
          <v-btn outlined color="blue" class="title ml-2">8</v-btn>
          <v-btn outlined color="blue" class="title ml-2">9</v-btn>
          <v-spacer />
          <v-btn outlined color="blue" class="title ml-2">C</v-btn>
        </v-row>
        <v-row class="mb-5">
          <v-btn color="blue" dark class="title">4</v-btn>
          <v-btn outlined color="blue" class="title ml-2">5</v-btn>
          <v-btn outlined color="blue" class="title ml-2">6</v-btn>
          <v-spacer />
          <v-btn outlined color="blue" class="title ml-2">x</v-btn>
        </v-row>
        <v-row class="mb-5">
          <v-btn color="blue" dark class="title">1</v-btn>
          <v-btn outlined color="blue" class="title ml-2">2</v-btn>
          <v-btn outlined color="blue" class="title ml-2">3</v-btn>
          <v-spacer />
          <v-btn outlined color="blue" class="title ml-2">+</v-btn>
        </v-row>
        <v-row class="mb-5">
          <v-btn color="blue" dark class="title">0</v-btn>
          <v-btn outlined color="blue" class="title ml-2">.</v-btn>
          <v-btn outlined color="blue" class="title ml-2">=</v-btn>
          <v-spacer />
          <v-btn outlined disabled color="blue" class="title ml-2"
            ><v-icon>mdi-cart</v-icon></v-btn
          >
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
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
