<template>
  <v-container class="pa-0">
    <v-col cols="12">
      <template v-for="(item, i) in nomenklator">
        <TheCardList :key="i" :item="item" :ind-pos="i" @cartcalc="cartcalc" />
      </template>
    </v-col>
    <v-dialog v-model="cartCalculator">
      <TheCalculator :item-info="itemInfo" @cartcalcpost="cartcalcpost" />
    </v-dialog>
  </v-container>
</template>

<script>
// import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import TheCardList from '@/components/TheCardList.vue'
import TheCalculator from '@/components/TheCalculator.vue'

// const consola = require('consola')
export default {
  components: {
    TheCardList,
    TheCalculator,
  },
  data() {
    return {
      itemInfo: undefined,
      cartCalculator: false,
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
    }
  },
  computed: {
    ...mapGetters({
      nomenklator: 'nomenklator/getSubNomenklator',
    }),
  },
  watch: {
    // nomenklator(newVal, oldVal) {
    // consola.log(newVal)
    // },
  },
  beforeCreate() {
    this.$store.commit('SET_HEADER_NAME', 'МФ Комплект')
  },
  methods: {
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
        this.nomenklator[item.indPos].qty2 = item.q2
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
