<template>
  <v-col>
    <template v-for="(item, i) in nomenklator">
      <v-card :key="i" shaped raised class="mb-3">
        <v-carousel :show-arrows="false" hide-delimiter-background height="220">
          <v-carousel-item
            light
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
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
          </v-carousel-item>
          <v-carousel-item
            light
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
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
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </template>
    <TheCucumbers />
  </v-col>
</template>

<script>
// const consola = require('consola')
// import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import TheCucumbers from '@/components/TheCucumbers.vue'

export default {
  components: {
    TheCucumbers,
  },
  data() {
    return {
      lorem:
        'Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.',

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
      qty_t: 123,
    }
  },
  computed: {
    ...mapGetters({
      nomenklator: 'nomenklator/getSubNomenklator',
    }),
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
