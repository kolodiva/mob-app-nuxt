<template>
  <v-app>
    <v-app-bar color="blue" dense dark hide-on-scroll fixed>
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
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option 1{{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list nav dense>
        <v-list-item-group active-class="blue--text text--accent-4">
          <n-link to="/" exact prefetch>
            <v-list-item>
              <v-list-item-icon>
                <v-icon medium>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="title">Домой</v-list-item-title>
            </v-list-item>
          </n-link>

          <n-link to="/about_company" prefetch>
            <v-list-item>
              <v-list-item-icon>
                <v-icon medium>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="title">О компании</v-list-item-title>
            </v-list-item>
          </n-link>
          <n-link to="/contacts" prefetch>
            <v-list-item>
              <v-list-item-icon>
                <v-icon medium>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="title">Контакты</v-list-item-title>
            </v-list-item>
          </n-link>
          <n-link to="/heroes" prefetch>
            <v-list-item>
              <v-list-item-icon>
                <v-icon medium>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="title">Доска почета</v-list-item-title>
            </v-list-item>
          </n-link>
          <n-link to="/compred" prefetch>
            <v-list-item>
              <v-list-item-icon>
                <v-icon medium>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="title">Компред</v-list-item-title>
            </v-list-item>
          </n-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <nuxt /> </v-app
></template>

<script>
export default {
  data: () => ({
    drawer: false,
  }),
  head() {
    return {
      title: 'dottore Vittorio.',
    }
  },
}
</script>
