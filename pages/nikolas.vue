<template>
  <div>
    <v-card flat class="px-5">
      <v-card-title>
        Остатки Яндекс позиций.
      </v-card-title>
      <v-card-subtitle> </v-card-subtitle>

      <v-card-actions> </v-card-actions>

      <v-list three-line ripple>
        <template v-for="(item, i) in nomenklatorY">
          <v-list-item :key="i" class="px-0" ripple>
            <v-list-item-content>
              <v-list-item-title
                >{{ item.artikul }}, {{ item.artikul_new }},
                {{ item.price }}</v-list-item-title
              >
              <v-list-item-subtitle>{{ item.name }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text class="title">{{
                parseFloat(item.qty)
              }}</v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
          <v-divider :key="(i + 1) * 1000"></v-divider>
        </template>
      </v-list>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  mounted() {
    this.$store.dispatch('nikolas/getNomenklatorY')
    // consola.info('test LOGIN')
  },
  computed: {
    ...mapGetters({
      nomenklatorY: 'nikolas/getNomenklatorY',
    }),
  },
}
</script>
