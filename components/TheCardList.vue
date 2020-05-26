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
                      <span>{{ qty_t }}</span>
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
                      <span class="title" v-text="qty_t"></span>
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

                          <v-chip
                            class="pa-4"
                            outlined
                            color="blue darken-4"
                            ripple
                          >
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
            <v-spacer />
            <v-chip
              v-if="item.describe"
              class="ma-2"
              color=""
              text-color="blue darken-1"
              outlined
              style="border: 0.5px solid;"
              right
              ripple
              @click="window = 1"
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
  props: ['item'],
  data: () => ({
    on: false,
    menu: false,
    length: 3,
    window: 0,
    qty_t: 123,
  }),
}
</script>
