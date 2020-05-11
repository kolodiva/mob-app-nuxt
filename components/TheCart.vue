<template>
  <n-link to="/orders">
    <v-badge
      v-show="countCart > 0"
      color="green"
      :content="countCart"
      class="mr-2"
    >
      <v-icon>mdi-cart</v-icon>
    </v-badge>
  </n-link>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      countCart: (state) => state.nomenklator.countCart,
    }),
  },
}
</script>

<style lang="scss" scoped></style>
