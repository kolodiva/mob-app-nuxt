<template>
  <v-speed-dial v-model="fab" fixed bottom left>
    <template v-slot:activator>
      <v-btn v-model="fab" color="blue darken-2" dark fab small left>
        <v-icon v-if="fab">mdi-close</v-icon>
        <v-icon v-else>mdi-apps</v-icon>
      </v-btn>
    </template>
    <template v-for="(el, i) in breadcrumb">
      <v-btn
        :key="i"
        :to="el.guid ? `/catalog/${el.guid}` : '/'"
        fab
        dark
        small
        color="green"
        ripple
        nuxt
        style="justify-content: start"
      >
        <v-chip>{{ el.name }}</v-chip>
      </v-btn>
    </template>
  </v-speed-dial>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    fab: false,
  }),

  computed: {
    ...mapGetters({
      breadcrumb: 'nomenklator/getBreadCrumb',
    }),

    activeFab() {
      switch (this.tabs) {
        case 'one':
          return { class: 'purple', icon: 'account_circle' }
        case 'two':
          return { class: 'red', icon: 'edit' }
        case 'three':
          return { class: 'green', icon: 'keyboard_arrow_up' }
        default:
          return {}
      }
    },
  },

  watch: {
    top(val) {
      this.bottom = !val
    },
    right(val) {
      this.left = !val
    },
    bottom(val) {
      this.top = !val
    },
    left(val) {
      this.right = !val
    },
  },
}
</script>

<style>
/* This is for documentation purposes and will not be needed in your application */
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>
