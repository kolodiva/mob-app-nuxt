<template>
  <v-app v-scroll="onScroll">
    <v-app-bar color="blue" dense dark fixed>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title
        ><n-link to="/" exact prefetch style="text-decoration: none;"
          ><span style="color: white;"
            >МФ {{ $store.state.headerName }}</span
          ></n-link
        ></v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-menu right top>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="$store.commit('switchShowOverlay')">
            <v-list-item-title>Новости</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list nav dense>
        <v-list-item-group active-class="blue--text text--accent-4">
          <n-link
            v-for="(pos, i) of filteredItems"
            :key="i"
            :to="pos.path"
            prefetch
            style="text-decoration: none;"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon medium>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="title" style="height: 20;">{{
                pos.name
              }}</v-list-item-title>
            </v-list-item>
          </n-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <nuxt />

    <v-fab-transition>
      <v-btn
        v-show="showFab"
        color="blue"
        ripple
        dark
        fab
        fixed
        bottom
        x-small
        right
        @click="$vuetify.goTo('#app', { duration: 500, offset: 0 })"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>
    <winOverlay v-if="$store.state.showOverlay" /> </v-app
></template>

<script>
import winOverlay from '@/components/overlay.vue'
const Cookie = process.client ? require('js-cookie') : undefined
const inFifteenMinutes = new Date(new Date().getTime() + 50 * 1000)
Cookie &&
  Cookie.set('auth', '111111111111111111', { expires: inFifteenMinutes })

export default {
  components: {
    winOverlay,
  },
  // async asyncData() {},

  data: () => ({
    drawer: false,
    offsetTop: 0,
    items: [
      { name: 'Домой', path: '/', show: 1 },
      { name: 'О компании', path: '/about_company', show: 1 },
      { name: 'Контакты', path: '/contacts', show: 1 },
      { name: 'Доска почета', path: '/heroes', show: 0 },
      { name: 'Ком.пред', path: '/compred', show: 0 },
    ],
  }),
  computed: {
    filteredItems() {
      return this.items.filter((pos) => pos.show === 1)
    },
    showFab() {
      return this.offsetTop > 180
    },
  },
  methods: {
    onScroll() {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
    },
  },
  head() {
    return {
      title: 'МФ-Комплект',
    }
  },
}
</script>
