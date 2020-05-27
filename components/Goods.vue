<template>
  <v-container class="pa-0">
    <v-col cols="12">
      <template v-for="(item, i) in nomenklator">
        <TheCardList :key="i" :item="item" @ovr="ovr" />
      </template>
    </v-col>
    <v-dialog v-model="overlay">
      <TheCalculator :art="art" @ovr="overlay = !overlay" />
    </v-dialog>
  </v-container>
</template>

<script>
// const consola = require('consola')
// import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import TheCardList from '@/components/TheCardList.vue'
import TheCalculator from '@/components/TheCalculator.vue'

export default {
  components: {
    TheCardList,
    TheCalculator,
  },
  data() {
    return {
      overlay: false,
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
      art: '',
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
    ovr(p1) {
      this.art = p1
      this.overlay = !this.overlay
    },
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
