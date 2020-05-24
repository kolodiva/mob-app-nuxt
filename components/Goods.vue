<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3" class="">
      <v-card flat class="px-3">
        <v-list three-line>
          <template v-for="(pos, i) in nomenklator">
            <v-divider :key="i" light style="border-width: 0.7px;" />
            <v-list-item :key="i" ripple>
              <v-list-item-avatar size="82">
                <img :src="pos.guid_picture" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  >{{ pos.artikul }}, {{ pos.artikul_new }}</v-list-item-title
                >
                <v-list-item-subtitle v-html="pos.name"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-col> </v-row
></template>

<script>
// const consola = require('consola')
// import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
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
