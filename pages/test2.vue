<template>
  <v-autocomplete
    v-model="selectsearchfield"
    :loading="loading"
    :items="rowsSearchText"
    :search-input.sync="searchfield"
    cache-items
    flat
    class="mx-4"
    hide-no-data
    hide-details
    autofocus
    clearable
    label="Немного артикула или наименования?"
    item-text="name"
    item-value="guid"
    return-object
  ></v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
const consola = require('consola')
export default {
  data() {
    return {
      searchfield: '',
      selectsearchfield: '',
      loading: false,
      items: [],
      search: null,
      states: [
        'Alabama',
        'Alaska',
        'American Samoa',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'District of Columbia',
        'Federated States of Micronesia',
        'Florida',
        'Georgia',
        'Guam',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Marshall Islands',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Northern Mariana Islands',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Palau',
        'Pennsylvania',
        'Puerto Rico',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virgin Island',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming',
      ],
    }
  },
  computed: {
    ...mapGetters({
      rowsSearchText: 'nomenklator/getNomenklatorBySearchText',
    }),
  },
  watch: {
    searchfield(val) {
      val && val !== this.selectsearchfield && this.querySelections(val)
    },
  },
  mounted() {},
  methods: {
    async querySelections(v) {
      this.loading = true
      // Simulated ajax query
      await this.$store.dispatch('nomenklator/loadSearchNumenklator', {
        searchtext: this.searchfield,
      })
      // this.items = this.rowsSearchText

      this.loading = false

      consola.log(this.rowsSearchText)
      // setTimeout(() => {
      //   this.items = this.states.filter((e) => {
      //     return (e || '').toLowerCase().includes((v || '').toLowerCase())
      //   })
      //   this.loading = false
      // }, 500)
    },
  },
}
</script>
