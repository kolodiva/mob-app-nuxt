<template>
  <v-col>
    <template v-for="(item, i) in nomenklator">
      <TheCardList :key="i" :item="item" />
    </template>
  </v-col>
</template>

<script>
// const consola = require('consola')
// import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import TheCardList from '@/components/TheCardList.vue'

export default {
  components: {
    TheCardList,
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
