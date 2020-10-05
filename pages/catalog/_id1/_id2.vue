<template>
  <div class="" style="margin-top: 55px">
    <v-card flat class="pa-5 py-0 mx-0">
      <h1 class="v-card__title">{{ res.rows[0].name }}</h1>
      <v-card-subtitle
        >{{ res.rows[0].artikul }}, {{ res.rows[0].artikul_new }}
      </v-card-subtitle>
      <v-card-actions style="justify-content: space-between">
        <div style="position: relative">
          <v-chip
            class="ma-2"
            color=""
            text-color="blue darken-4"
            outlined
            style="border: 0.5px solid"
          >
            {{ res.rows[0].price1 }}
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
            {{ res.rows[0].price2 }}
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
            {{ res.rows[0].price3 }}
          </v-chip>
          <p
            class="caption blue--text text--lighten-2 ma-0 pa-0 font-italic"
            style="position: absolute; top: -15px; left: 10px"
          >
            Круп.опт
          </p>
        </div>
      </v-card-actions>

      <v-card-text>
        <v-row>
          <v-chip
            class="my-3 subtitle"
            color=""
            text-color="blue darken-4"
            ripple
            outlined
            style="border: 0.5px solid"
            @click="cartcalc(res.rows[0], -1)"
          >
            <v-icon left class="pl-2">mdi-cart-plus</v-icon>
            <span
              >{{ parseFloat(res.rows[0].qty2) }}, ед.изм:
              {{ res.rows[0].unit_name }}</span
            >
          </v-chip>
          <v-spacer />
          <span class="title red--text mt-2"
            >{{ parseFloat(res.rows[0].total) }}
            <v-icon class="">mdi-currency-rub</v-icon>
          </span>
        </v-row>
      </v-card-text>
      <v-carousel
        hide-delimiters
        height="300"
        class="mb-3"
        :show-arrows="photoMoreOne"
      >
        <v-carousel-item
          v-for="(photo, i) in res.rowsphoto"
          :key="i"
          :src="photo.pic_path"
          @click.stop="openBigImg(photo.pic_path)"
        ></v-carousel-item>
      </v-carousel>
      <v-card-text class="title">
        <p class="ma-0">
          Вес нетто: {{ parseFloat(res.rows[0].weight) }} кг. - 1
          {{ res.rows[0].unit_name }}.
        </p>
        <p v-if="curItem.packing" class="ma-0">
          Упаковка: {{ curItem.packing }} шт.
        </p>
      </v-card-text>
      <v-card-text class="title" v-html="res.rows[0].describe"> </v-card-text>
    </v-card>
    <TheCucumbers />
    <v-dialog v-model="cartCalculator">
      <TheCalculator :item-info="itemInfo" @cartcalcpost="cartcalcpost" />
    </v-dialog>
    <v-dialog v-model="bigImg.showBbigImg">
      <v-zoomer style="width: 600px; height: 600px">
        <img
          :src="bigImg.bigImgPath"
          style="object-fit: contain"
          @click.stop="bigImg.showBbigImg = false"
        />
      </v-zoomer>
    </v-dialog>
    <v-fab-transition>
      <v-btn
        color="blue"
        ripple
        dark
        fab
        fixed
        bottom
        x-small
        right
        class="mr-10"
        @click="$router.go(-1)"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import TheCucumbers from '@/components/TheCucumbers.vue'
import TheCalculator from '@/components/TheCalculator.vue'

// import Groups from '@/components/Groups.vue'
// import GoodCard from '@/components/TheGoodCard.vue'
// import GoodCard from '@/components/TheGoodCard.vue'

// import TheCucumbers from '@/components/TheCucumbers.vue'

// const consola = require('consola')
export default {
  // async validate({ params, store, query }) {
  //   const guid = query && query.itemcard ? query.itemcard : ''
  //   // consola.log(guid)
  //   await store.commit('nomenklator/SET_GOOD_CARD', guid)
  //   //   consola.log(store.getters('nomenklator/guidGoodCard'))
  //   return true
  // },
  components: { TheCucumbers, TheCalculator },
  async asyncData({ app, params, query, store }) {
    // consola.info(params)
    if (params && params.id2) {
      // consola.info(params)
      await store.dispatch('nomenklator/loadGoodCard', params)
    }
  },

  data: () => ({
    cartCalculator: false,
    bigImg: { showBbigImg: false, bigImgPath: '' },
    itemInfo: undefined,
  }),
  computed: {
    ...mapGetters({
      res: 'nomenklator/getGoodCard',
    }),
    photoMoreOne() {
      return this.res.rowsphoto.length > 1
    },
    curItem() {
      return this.res.rows[0]
    },
  },
  mounted() {
    const el1 = document.getElementsByClassName('v-window__prev')[0]
    const el2 = document.getElementsByClassName('v-window__next')[0]

    if (el1) {
      el1.style.top = '25px'
      el1.style.marginLeft = '0'
      el2.style.top = '25px'
      el2.style.marginRight = '0'
    }
  },
  methods: {
    openBigImg(picpath) {
      const bigImgPath = picpath.replace('_250x250', '')
      this.bigImg = {
        showBbigImg: true,
        bigImgPath,
      }
    },
    cartcalc(item, i) {
      // consola.info(item)
      this.itemInfo = {
        indPos: i,
        guid: item.guid,
        artikul: item.artikul,
        describe: item.describe,
        firstEnter: true,
        q1: item.qty1,
        q2: item.qty2,
        strQty: parseFloat(item.qty2).toString(),
        unitName: item.unit_name,
      }
      this.cartCalculator = !this.cartCalculator
    },
    async cartcalcpost(item, post = false) {
      this.cartCalculator = !this.cartCalculator
      if (post === true) {
        this.res.rows[0].qty2 = item.q2
        await this.$store.dispatch('nomenklator/chngeCart', item.indPos)
        await this.$store.dispatch('nomenklator/refreshCountCart')
        await this.$store.dispatch('snackbar/setSnackbar', {
          color: 'green',
          text: `Позиция, ${item.artikul} в кол-ве: ${item.q2} доб/изм.`,
          timeout: 3000,
        })
        // this.nomenklator[item.indPos].qty1 = item.q2
      }
    },
  },
}
</script>

<style lang="" scoped></style>
