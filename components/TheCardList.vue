<template>
  <v-card shaped raised class="mb-3">
    <v-window v-model="window">
      <v-window-item key="1">
        <v-card flat shaped>
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
                  @click="$emit('cartcalc', item, indPos)"
                >
                  <v-icon left class="pl-2">mdi-cart-plus</v-icon>
                  <span>{{ parseFloat(item.qty2) }}</span>
                </v-chip>
              </v-list-item-title>

              <v-list-item-subtitle>{{ item.name }}</v-list-item-subtitle>
            </v-list-item-content>
            <div class="" style="position: relative;">
              <v-list-item-avatar size="95" style="border: 0.5px solid grey;">
                <v-img :src="item.guid_picture" />
              </v-list-item-avatar>
              <v-icon
                v-if="item.describe"
                color="blue darken-4"
                large
                style="position: absolute; right: 20px; top: 2px; z-index: 10;"
                @click.stop="window = 1"
                >mdi-magnify</v-icon
              >
            </div>
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
            <v-spacer />
            <v-chip
              class="ma-2"
              color=""
              text-color="blue darken-1"
              outlined
              style="border: 0.5px solid;"
              right
              ripple
              @click="goToGoodCard"
            >
              <v-icon>mdi-arrow-right</v-icon>
            </v-chip>
          </v-card-actions>
        </v-card>
      </v-window-item>
      <v-window-item v-if="item.describe" key="2">
        <v-container style="margin-right: 0;">
          <v-row no-gutters>
            <v-col
              class="pl-2"
              cols="11"
              style="overflow: auto; height: 185px;"
            >
              <span v-html="item.describe"></span>
            </v-col>

            <v-col class="pl-0">
              <v-row class="flex-column ma-0 fill-height" justify="end">
                <v-btn
                  icon
                  small
                  outlined
                  color="blue darken-1"
                  style="margin-top: -32px; margin-right: -10px;"
                  @click="window = 0"
                >
                  <v-icon small>mdi-arrow-left</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
export default {
  props: ['item', 'indPos'],
  data: () => ({
    window: 0,
  }),
  computed: {},
  methods: {
    goToGoodCard() {
      const path = `/catalog/${this.item.parentguid}?itemcard=${this.item.synonym}`
      this.$router.push({ path })
    },
  },
}
</script>
