<template>
  <v-card class="mx-4" flat style="">
    <v-card-title class="pa-0 pb-2 title">Страница поиска</v-card-title>
    <v-col cols="12" sm="6" class="py-0">
      <v-row>
        <v-col cols="10" class="pa-0">
          <v-text-field
            v-model="searchtext"
            :loading="isLoading"
            class="pt-2 title"
            label="Введите часть артикула или наименования. "
            :rules="[rules.min]"
            hint="Минимум 2 символа"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="2" class="pa-0">
          <v-row justify="center" class="pa-0">
            <TheMicrophone @speechend="speechend" />
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col
      v-if="rowsSearchText && rowsSearchText.length > 1"
      cols="12"
      sm="6"
      class="pt-0"
    >
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
    <v-col
      v-else-if="rowsSearchText && rowsSearchText.length == 1"
      cols="12"
      sm="6"
      class="pt-0"
    >
      <v-list>
        <v-list-item
          v-for="(item2, i1) in rowsSearchText[0].goods"
          :key="i1"
          nuxt
          :to="`/catalog/${item.guid}/${item2.synonym}`"
        >
          <v-list-item-title class="pl-3"
            >{{ item2.artikul }}, {{ item2.name }}</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-col>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import TheMicrophone from '@/components/TheMicrophone.vue'
// const consola = require('consola')
export default {
  components: { TheMicrophone },
  data: () => ({
    isLoading: false,
    searchtext: '',
    item: 1,
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => (v && v.length >= 2) || 'Мин 2 символа',
    },
  }),
  computed: {
    ...mapGetters({
      rowsSearchText: 'nomenklator/getNomenklatorBySearchText',
      searchText: 'nomenklator/getSearchText',
    }),
  },
  watch: {
    async searchtext(val) {
      // Items have already been requested
      if (this.isLoading || !val || val.length < 2) return

      this.isLoading = true

      await this.$store.dispatch('nomenklator/loadSearchNumenklator', {
        searchtext: this.searchtext,
      })

      this.isLoading = false
    },
  },
  mounted() {
    if (this.searchText) {
      this.searchtext = this.searchText
    }
  },
  methods: {
    speechend(speechtext) {
      // consola.info(speechtext)
      if (speechtext) {
        this.searchtext = speechtext
      }
    },
  },
}
</script>
