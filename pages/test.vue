<template>
  <v-card
    v-touch="{
      up: () => $emit('ovr'),
      down: () => $emit('ovr'),
    }"
    max-width="420"
    class="mx-auto"
  >
    <v-card-title class="pa-4">
      <v-chip class="subtitle" dark color="blue">артикул {{ art }}</v-chip>
      <v-spacer />
      <v-chip class="subtitle" dark ripple color="blue" @click="$emit('ovr')"
        >Отмена</v-chip
      >
    </v-card-title>
    <v-card-text>
      <v-text-field
        :label="qtyWas"
        readonly
        :value="qtyCurr"
        class="headline mt-2"
        outlined
        shaped
        append-icon="mdi-arrow-left"
        @click:append="optodo(0, 3, true)"
      ></v-text-field>
      <v-container class="mt-n2 pa-1">
        <v-row v-for="(row, i) in btns" :key="i" class="mb-5">
          <template v-for="(col, j) in row">
            <v-spacer
              v-if="(i * 10 + j).toString().slice(-1) === '3'"
              :key="10 * (i * 10 + j)"
            />
            <v-btn
              v-if="col === 'cart'"
              v-show="q1 != q2"
              :key="i * 10 + j"
              fab
              color="red darken-1"
              dark
              class="mx-2"
              small
              @click="$emit('ovr')"
              ><v-icon>mdi-cart</v-icon></v-btn
            >
            <v-btn
              v-else
              :key="i * 10 + j"
              fab
              color="blue lighten-2"
              dark
              class="title mx-2"
              small
              @click="optodo(i, j)"
              >{{ col }}</v-btn
            >
          </template>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['art'],
  data() {
    return {
      q1: 12480,
      q2: 12480,
      strQty: '12480',
      firstEnter: true,
      btns: [
        [7, 8, 9, 'C'],
        [4, 5, 6, 'X'],
        [1, 2, 3, '+'],
        [0, '.', '=', 'cart'],
      ],
    }
  },
  computed: {
    qtyWas() {
      return 'ед.изм шт., в заказе было ' + this.q1
    },
    qtyCurr() {
      return this.strQty
    },
  },
  methods: {
    optodo(i, j, bckspc = false) {
      let lastElemNotDigit = !/^\d+$/.test(this.strQty.slice(-1))
      let divEl
      let res
      // debugger
      switch (this.btns[i][j]) {
        case 'C':
          if (bckspc) {
            if (this.strQty.length === 1) {
              this.strQty = '0'
              this.q2 = 0
            } else {
              this.strQty = this.strQty.substring(0, this.strQty.length - 1)
              try {
                this.q2 = parseFloat(this.strQty)
              } catch (e) {}
            }
          } else {
            this.strQty = '0'
            this.q2 = 0
          }
          break
        case 'X':
          this.strQty = lastElemNotDigit ? this.strQty : this.strQty + 'X'
          break
        case '+':
          this.strQty = lastElemNotDigit ? this.strQty : this.strQty + '+'
          break
        case '=':
          if (this.strQty.includes('X')) {
            divEl = 'X'
          }
          if (this.strQty.includes('+')) {
            divEl = '+'
          }

          if (divEl) {
            const aEls = this.strQty.split(divEl)

            try {
              if (divEl === 'X') {
                res = parseFloat(aEls[0]) * parseFloat(aEls[1])
              } else {
                res = parseFloat(aEls[0]) + parseFloat(aEls[1])
              }
            } catch (e) {}

            if (res) {
              this.strQty = res.toString()
              this.q2 = res
            }
          }
          break
        case '.':
          if (this.firstEnter) {
            this.strQty = '0.'
          } else {
            this.strQty = lastElemNotDigit ? this.strQty : this.strQty + '.'
          }
          break
        default:
          if (this.firstEnter || this.strQty === '0') {
            this.strQty = ''
          }
          this.strQty += this.btns[i][j]
          this.q2 = parseFloat(this.strQty)
      }

      this.firstEnter = this.firstEnter && false
      lastElemNotDigit = !/^\d+$/.test(this.strQty.slice(-1))
      const hasNoDigits =
        this.strQty.includes('X') ||
        this.strQty.includes('+') ||
        (this.strQty.includes('.') && lastElemNotDigit)
      if (hasNoDigits) {
        this.q2 = this.q1
      }

      // this.strQty += this.btns[i][j]
      // this.$store.commit('nomenklator/SET_COUNT_CART', 10)
      // consola.info(this.$store.state.nomenklator.countCart)
    },
  },
}
</script>
