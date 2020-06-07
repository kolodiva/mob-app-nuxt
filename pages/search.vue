<template>
  <v-card class="mx-4" flat>
    <v-card-title class="pt-0 title">Страница поиска</v-card-title>
    <v-col cols="12" sm="6" class="py-0">
      <v-text-field
        v-model="searchtext"
        :loading="isLoading"
        class="pt-0 title"
        label="Введите часть артикула или наименования. "
        :rules="[rules.min]"
        hint="Минимум 3 символа"
        clearable
      ></v-text-field>
    </v-col>
    <v-col v-if="rowsSearchText" cols="12" sm="6" class="pt-0">
      <v-list>
        <v-list-group v-for="(item, i) in rowsSearchText" :key="i">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(item2, i1) in item.goods"
            :key="i1"
            nuxt
            :to="`/catalog/${item.guid}/${item2.synonym}`"
          >
            <v-list-item-title class="pl-3"
              >{{ item2.artikul }}, {{ item2.name }}</v-list-item-title
            >
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-col>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    isLoading: false,
    searchtext: '',
    item: 1,
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => (v && v.length >= 3) || 'Мин 3 символа',
    },
  }),

  mounted() {
    if (this.searchText) {
      this.searchtext = this.searchText
    }
  },
  computed: {
    ...mapGetters({
      rowsSearchText: 'nomenklator/getNomenklatorBySearchText',
      searchText: 'nomenklator/getSearchText',
    }),
  },
  watch: {
    async searchtext(val) {
      // Items have already been requested
      if (this.isLoading || !val || val.length < 3) return

      this.isLoading = true

      await this.$store.dispatch('nomenklator/loadSearchNumenklator', {
        searchtext: this.searchtext,
      })

      this.isLoading = false
    },
  },
}
</script>
