<template>
  <v-app v-scroll="onScroll">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      disable-route-watcher
    >
      <v-list nav class="py-0">
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="userinfo.avatar" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Приветствуем Вас</v-list-item-title>
            <v-list-item-subtitle>{{ userinfo.name }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link href="/">
          <v-list-item-action>
            <v-icon>mdi-home-outline</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              Домой
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="/news">
          <v-list-item-action>
            <v-icon>mdi-newspaper-variant-multiple-outline</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              Новости
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="/contacts">
          <v-list-item-action>
            <v-icon>mdi-contacts</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              Контакты
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!$auth.loggedIn" link href="/login">
          <v-list-item-action>
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              Войти
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-else @click.prevent="logout">
          <v-list-item-action>
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              Выйти
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link href="/about_company">
          <v-list-item-action>
            <v-icon>mdi-information-outline</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              О компании
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link href="/success_history">
          <v-list-item-action>
            <v-icon>mdi-wallet-outline</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              Успехи
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-icon v-if="$store.state.showBackSpace" class="mr-2" @click.prevent="to"
        >mdi-arrow-left-circle</v-icon
      >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="" class="ml-0 pl-1">
        <v-btn href="/" class="">{{ $store.state.headerName }}</v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="test">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <TheCart />
    </v-app-bar>
    <v-content>
      <v-container class="px-0" fluid>
        <Nuxt />
      </v-container>
    </v-content>
    <TheSnackbar />

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
  </v-app>
</template>

<script>
import TheSnackbar from '@/components/TheSnackbar.vue'
import TheCart from '@/components/TheCart.vue'
// const consola = require('consola')
export default {
  components: {
    TheSnackbar,
    TheCart,
  },
  data: () => ({
    offsetTop: 0,
    dialog: false,
    drawer: null,
    showBtn: false,
    items: [
      {
        icon: 'mdi-contacts',
        text: 'Контакты',
        href: '/contacts',
        heading: '11111111',
      },
      { icon: 'mdi-login', text: 'Войти', href: '/login' },
      { icon: 'mdi-logout', text: 'Выйти', code: 1 },
      { icon: 'mdi-content-copy', text: 'Дубли-бубли' },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'Дополнительно',
        model: false,
        children: [
          { text: 'Пункт 1' },
          { text: 'Пункт 2' },
          { text: 'Пункт 3' },
          { text: 'Пункт 4' },
          { text: 'Пункт 5' },
        ],
      },
    ],
  }),
  computed: {
    showFab() {
      return this.offsetTop > 180
    },
    userinfo() {
      return this.$auth && this.$auth.loggedIn
        ? { name: this.$auth.user.username, avatar: 'avatar_user.jpg' }
        : { name: 'Anonimus', avatar: 'avatar_anonim.png' }
    },
  },
  beforeCreate() {
    this.$store.dispatch('nomenklator/refreshCountCart')
  },
  mounted() {
    // consola.log(this.$store.showBackSpace)
  },
  methods: {
    test() {
      // this.$store.commit('nomenklator/SET_COUNT_CART', 10)
      // consola.info(this.$store.state.nomenklator.countCart)
    },
    logout() {
      this.$auth.logout()
      // this.$cookies.remove('connectionid')
      // this.$cookies.remove('connectionid', { httpOnly: true })
      this.$cookies.remove('connectionid')

      this.$store.dispatch('nomenklator/refreshCountCart')
      this.$router.push({ path: '/' })

      this.drawer = null
    },
    onScroll() {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
    },
    to() {
      this.$router.back()
    },
  },
  head() {
    return {
      title: 'МФ-Комплект',
    }
  },
}
</script>

<style lang="scss">
$font: Roboto, sans-serif;
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.clickable {
  cursor: pointer;
}
body .v-application a {
  color: #276e2b;
}
.v-input--checkbox {
  margin: 0 !important;
  .v-input__control {
    label {
      color: black !important;
    }
    .v-input__slot {
      margin-bottom: 0 !important;
    }
    a {
      margin: 0 5px;
    }
  }
}
.paper-container {
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
}
.paper-container-large {
  @extend .paper-container;
  max-width: 1200px;
}
.img-responsive {
  max-width: 100%;
}
.section-title {
  font: 400 32px/40px $font;
  margin-bottom: 30px;
}
.section-subtitle {
  font: 400 24px/32px $font;
}
.section {
  background-color: #ffffff;
  padding: 60px 0;
  .section-title {
    font: 400 32px/40px $font;
    margin-bottom: 30px;
  }
  ul {
    margin: 0;
  }
  img {
    margin-top: 30px;
    @media (min-width: 64em) {
      margin-top: 0;
    }
  }
  .bottom-image {
    margin-bottom: -66px;
  }
}
</style>
