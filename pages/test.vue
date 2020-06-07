<template>
  <v-card class="mx-4" flat>
    <v-card-title class="pt-0 title">Страница поиска</v-card-title>
    <v-col cols="12" sm="6" class="pt-0">
      <v-text-field
        v-model="searchtext"
        :loading="isLoading"
        class="pt-0"
        label="Введите часть артикула или наименования. "
        :rules="[rules.min]"
        hint="Минимум 3 символа"
        clearable
      ></v-text-field>
    </v-col>
    <v-col v-if="rowsSearchText" cols="12" sm="6" class="pt-0">
      <v-list>
        <template v-for="(item, i) in rowsSearchText">
          <v-list-item :key="i" ripple>
            <v-list-item-content>
              <v-list-item-title v-text="item.name1"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="i"></v-divider>
        </template>
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
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => (v && v.length >= 3) || 'Мин 3 символа',
    },
  }),

  mounted() {
    // consola.log(this.$store.showBackSpace)
    if (this.searchText) {
      this.searchtext = this.searchText
    }
  },
  computed: {
    ...mapGetters({
      rowsSearchText: 'nomenklator/getNomenklatorBySearchText',
      searchText: 'nomenklator/getNomenklatorBySearchText',
    }),
  },
  watch: {
    async searchtext(val) {
      // Items have already been requested
      if (this.isLoading || val.length < 3) return

      this.isLoading = true

      await this.$store.dispatch('nomenklator/loadSearchNumenklator', {
        searchtext: this.searchtext,
      })

      this.isLoading = false
    },
  },
}
</script>
