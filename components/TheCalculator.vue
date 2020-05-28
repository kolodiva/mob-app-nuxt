<template>
  <v-card
    v-touch="{
      up: () => $emit('cartcalcpost'),
      down: () => $emit('cartcalcpost'),
    }"
    max-width="420"
    class="mx-auto"
  >
    <v-card-title class="pa-4">
      <v-chip class="subtitle" dark color="blue"
        >артикул {{ itemInfo.artikul }}</v-chip
      >
      <v-spacer />
      <v-chip
        class="subtitle"
        dark
        ripple
        color="blue"
        @click="$emit('cartcalcpost', itemInfo)"
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
              v-show="itemInfo.q1 != itemInfo.q2"
              :key="i * 10 + j"
              fab
              color="red darken-1"
              dark
              class="mx-2"
              small
              @click="$emit('cartcalcpost', itemInfo, true)"
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
  props: ['itemInfo'],
  data() {
    return {
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
      return 'ед.изм шт., в заказе было ' + this.itemInfo.q1
    },
    qtyCurr() {
      return this.itemInfo.strQty
    },
  },
  mounted() {},
  methods: {
    optodo(i, j, bckspc = false) {
      const cuppPos = this.itemInfo

      let lastElemNotDigit = !/^\d+$/.test(cuppPos.strQty.slice(-1))
      const hasPoint = cuppPos.strQty.includes('.')
      let hasNoDigits =
        cuppPos.strQty.includes('X') ||
        cuppPos.strQty.includes('+') ||
        (cuppPos.strQty.includes('.') && lastElemNotDigit)
      let divEl
      let res
      // debugger
      switch (this.btns[i][j]) {
        case 'C':
          if (bckspc) {
            if (cuppPos.strQty.length === 1) {
              cuppPos.strQty = '0'
              cuppPos.q2 = 0
            } else {
              cuppPos.strQty = cuppPos.strQty.substring(
                0,
                cuppPos.strQty.length - 1
              )
              try {
                cuppPos.q2 = parseFloat(cuppPos.strQty)
              } catch (e) {}
            }
          } else {
            cuppPos.strQty = '0'
            cuppPos.q2 = 0
          }
          break
        case 'X':
          cuppPos.strQty = hasNoDigits ? cuppPos.strQty : cuppPos.strQty + 'X'
          break
        case '+':
          cuppPos.strQty = hasNoDigits ? cuppPos.strQty : cuppPos.strQty + '+'
          break
        case '=':
          if (cuppPos.strQty.includes('X')) {
            divEl = 'X'
          }
          if (cuppPos.strQty.includes('+')) {
            divEl = '+'
          }

          if (divEl) {
            const aEls = cuppPos.strQty.split(divEl)

            try {
              if (divEl === 'X') {
                res = (parseFloat(aEls[0]) * parseFloat(aEls[1])).toFixed(4)
              } else {
                res = parseFloat(aEls[0]) + parseFloat(aEls[1])
              }
            } catch (e) {}

            if (res) {
              cuppPos.strQty = parseFloat(res).toString()
              cuppPos.q2 = parseFloat(res)
            }
          }
          break
        case '.':
          if (cuppPos.firstEnter) {
            cuppPos.strQty = '0.'
          } else {
            cuppPos.strQty = hasPoint ? cuppPos.strQty : cuppPos.strQty + '.'
          }
          break
        default:
          if (cuppPos.firstEnter || cuppPos.strQty === '0') {
            cuppPos.strQty = ''
          }
          cuppPos.strQty += this.btns[i][j]
          cuppPos.q2 = parseFloat(cuppPos.strQty)
      }

      cuppPos.firstEnter = cuppPos.firstEnter && false
      lastElemNotDigit = !/^\d+$/.test(cuppPos.strQty.slice(-1))
      hasNoDigits =
        cuppPos.strQty.includes('X') ||
        cuppPos.strQty.includes('+') ||
        (cuppPos.strQty.includes('.') && lastElemNotDigit)
      if (hasNoDigits) {
        cuppPos.q2 = cuppPos.q1
      }
    },
  },
}
</script>
