<template>
  <v-card shaped raised class="mb-3" max-height="210" min-height="210">
    <v-window v-model="window">
      <v-window-item key="1">
        <v-card flat shaped>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-2">
                <span class="blue--text subtitle-2" style="white-space: nowrap"
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
                  style="border: 0.5px solid"
                  @click="$emit('cartcalc', item, indPos)"
                >
                  <v-icon left class="pl-2">mdi-cart-plus</v-icon>
                  <span>{{ parseFloat(item.qty2) }}</span>
                </v-chip>
              </v-list-item-title>

              <v-list-item-subtitle>{{ item.name }}</v-list-item-subtitle>
            </v-list-item-content>
            <div class="" style="position: relative">
              <v-list-item-avatar
                size="95"
                style="border: 0.5px solid grey"
                @click.stop="goToGoodCard"
              >
                <v-img :src="item.guid_picture_small" />
              </v-list-item-avatar>
              <v-icon
                color="blue darken-4"
                style="
                  position: absolute;
                  right: 23px;
                  top: 15px;
                  background-color: white;
                "
                >{{ icons.mdiInformationOutline }}</v-icon
              >
              <v-chip
                v-if="item.is_complect"
                ripple
                style="position: absolute; right: -4px; bottom: -7px"
                >Компл.</v-chip
              >
            </div>
          </v-list-item>

          <v-card-actions>
            <div style="position: relative">
              <v-chip
                class="ma-2"
                color=""
                text-color="blue darken-4"
                outlined
                style="border: 0.5px solid"
              >
                {{ item.price1 }}
              </v-chip>
              <p
                class="caption blue--text text--darken-4 ma-0 pa-0 font-italic"
                style="position: absolute; top: -15px; left: 10px"
              >
                Розн
              </p>
            </div>
            <div style="position: relative">
              <v-chip
                class="ma-2"
                color=""
                text-color="blue darken-1"
                outlined
                style="border: 0.5px solid"
              >
                {{ item.price2 }}
              </v-chip>
              <p
                class="caption blue--text text--darken-1 ma-0 pa-0 font-italic"
                style="position: absolute; top: -15px; left: 10px"
              >
                Мелк.опт
              </p>
            </div>
            <div style="position: relative">
              <v-chip
                class="ma-2"
                color=""
                text-color="blue lighten-2"
                outlined
                style="border: 0.5px solid"
              >
                {{ item.price3 }}
              </v-chip>
              <p
                class="caption blue--text text--lighten-2 ma-0 pa-0 font-italic"
                style="position: absolute; top: -15px; left: 10px"
              >
                Круп.опт
              </p>
            </div>
            <v-spacer />
            <v-icon color="blue darken-1" @click.stop="window = 1">{{
              icons.mdiCog
            }}</v-icon>
          </v-card-actions>
        </v-card>
      </v-window-item>
      <v-window-item key="2">
        <v-container style="margin-right: 0">
          <v-row no-gutters>
            <v-col class="pl-2" cols="11" style="overflow: auto; height: 185px">
              <p class="ma-0 mb-1">
                Вес нетто: {{ parseFloat(item.weight) }} кг. - 1
                {{ item.unit_name }}.
              </p>
              <p v-if="item.packing" class="ma-0 mb-1">
                Упаковка: {{ item.packing }} шт.
              </p>
              <span v-html="item.describe"></span>
            </v-col>

            <v-col class="pl-0">
              <v-row class="flex-column ma-0 fill-height" justify="end">
                <v-btn
                  icon
                  small
                  outlined
                  color="blue darken-1"
                  style="margin-top: -32px; margin-right: -10px"
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
import { mdiCog, mdiInformationOutline } from '@mdi/js'

export default {
  props: ['item', 'indPos'],
  data: () => ({
    window: 0,
    icons: {
      mdiCog,
      mdiInformationOutline,
    },
  }),
  computed: {},
  methods: {
    goToGoodCard() {
      const path = `/catalog/${this.item.parentguid}/${this.item.synonym}`
      this.$router.push({ path })
    },
  },
}
</script>
