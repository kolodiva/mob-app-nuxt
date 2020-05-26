<template>
  <div class="slider">
    <div class="slides">
      <div :id="`slide-1-${item.guid}`">
        <v-card shaped raised class="mb-3">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-2">
                <span class="blue--text subtitle-2"
                  >{{ item.artikul }}, {{ item.artikul_new }}</span
                >
              </div>
              <v-list-item-title class="headline mb-1">
                <v-chip
                  class="my-3 title"
                  color=""
                  text-color="blue darken-4"
                  ripple
                  outlined
                  style="border: 0.5px solid;"
                >
                  <v-icon left class="pl-2">mdi-cart-plus</v-icon>
                  <span>{{ qty_t }}</span>
                </v-chip>
              </v-list-item-title>

              <v-list-item-subtitle>{{ item.name }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar size="95" style="border: 0.5px solid grey;"
              ><v-img :src="item.guid_picture"
            /></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-chip
              class="ma-2"
              color=""
              text-color="blue darken-4"
              outlined
              style="border: 0.5px solid;"
            >
              {{ item.price1 }}
            </v-chip>
            <v-chip
              class="ma-2"
              color=""
              text-color="blue darken-1"
              outlined
              style="border: 0.5px solid;"
            >
              {{ item.price2 }}
            </v-chip>
            <v-chip
              class="ma-2"
              color=""
              text-color="blue lighten-2"
              outlined
              style="border: 0.5px solid;"
            >
              {{ item.price3 }}
            </v-chip>
          </v-card-actions>
          <v-btn
            color="blue"
            ripple
            dark
            fab
            fixed
            bottom
            x-small
            right
            outlined
            class="mb-3 closeLink"
            :href="`#slide-2-${item.guid}`"
          >
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </v-card>
      </div>
      <div
        :id="`slide-2-${item.guid}`"
        class="px-5 py-2"
        style="height: 200px; overflow-y: scroll; position: relative;"
      >
        <span v-html="item.describe"></span>
        <v-btn
          color="blue"
          ripple
          dark
          fab
          absolute
          bottom
          x-small
          right
          outlined
          :href="`#slide-1-${item.guid}`"
          class="mb-4"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data: () => ({
    qty_t: 123,
  }),
  computed: {},
}
</script>

<style scoped>
.slider {
  width: 100%;
  overflow: hidden;
}
.slides {
  display: flex;

  overflow-x: auto;
  scroll-snap-type: x mandatory;

  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.slides > div {
  scroll-snap-align: start;
  background-color: transparent;
  flex-shrink: 0;
  width: 100%;
  transform-origin: center center;
  transform: scale(1);
  transition: transform 0.5s;
  position: relative;

  display: flex;
  justify-content: left;
  align-items: start;
}
</style>
