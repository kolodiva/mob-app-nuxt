<template>
  <div class="">
    <v-card class="mx-auto text-center" color="green" dark>
      <v-card-text>
        <v-sheet color="rgba(0, 0, 0, .12)">
          <v-sparkline
            :value="value1"
            color="rgba(255, 255, 255, .7)"
            height="100"
            padding="24"
            stroke-linecap="round"
            smooth
          >
          </v-sparkline>
        </v-sheet>
      </v-card-text>
    </v-card>
    <v-card class="mx-auto text-center" color="green" dark>
      <v-card-text>
        <v-sheet color="rgba(0, 0, 0, .12)">
          <v-sparkline
            :value="value"
            color="rgba(255, 255, 255, .7)"
            height="100"
            padding="24"
            stroke-linecap="round"
            smooth
          >
          </v-sparkline>
        </v-sheet>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    value1: [151, 198, 201, 78, 117, 65, 0, 0, 0, 0, 0, 0],
    value: [151, 158, 171, 194, 142, 151, 180, 215, 227, 239, 209, 244],
  }),
}
</script>
