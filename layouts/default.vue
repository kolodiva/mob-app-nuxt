<template>
  <v-app v-scroll="onScroll">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      disable-route-watcher
    >
      <v-list nav class="py-0">
        <v-list-item-group v-model="group">
          <v-list-item two-line>
            <v-list-item-avatar>
              <v-img
                :src="
                  $auth.loggedIn ? '/avatar_user.jpg' : '/avatar_anonim.png'
                "
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Приветствуем Вас</v-list-item-title>
              <v-list-item-subtitle>{{
                $auth.loggedIn ? $auth.user.name : 'Anonimus'
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item nuxt to="/" @click="drawer = false">
            <v-list-item-action>
              <v-icon>{{ icons.mdiHomeOutline }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title> Домой </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group :prepend-icon="icons.mdiCart" ripple>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Как купить</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item href="/advs/dostavka-moskva.html">
              <v-list-item-action> </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title> Доставка (Москва) </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item href="/advs/dostavka-novosibirsk.html">
              <v-list-item-action> </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title> Доставка (Новосибирск) </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item href="/advs/dostavka-yekaterinburg.html">
              <v-list-item-action> </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title> Доставка (Екатеринбург) </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item href="/advs/dostavka-rostov-na-donu.html">
              <v-list-item-action> </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>
                  Доставка (Ростов-на-Дону)
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item href="/advs/dostavka-kazan.html">
              <v-list-item-action> </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title> Доставка (Казань) </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item href="/advs/dostavka-sankt-peterburg.html">
              <v-list-item-action> </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>
                  Доставка (Санкт-Петербург)
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item href="/advs/dostavka-krasnodar.html">
              <v-list-item-action> </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title> Доставка (Краснодар) </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item href="/advs/vozvrat-obmen.html">
              <v-list-item-action> </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title> Возврат-Обмен </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item nuxt to="/news">
            <v-list-item-action>
              <v-icon>{{ icons.mdiNewspaperVariantMultipleOutline }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title> Новости </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item nuxt to="/contacts">
            <v-list-item-action>
              <v-icon>{{ icons.mdiContacts }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title> Контакты </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item ripple @click.native="logInOut">
            <v-list-item-action>
              <v-icon>{{
                this.$auth.loggedIn ? `${icons.mdiLogout}` : `${icons.mdiLogin}`
              }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                {{ this.$auth.loggedIn ? 'Выйти' : 'Войти' }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item href="/advs/about-company.html">
            <v-list-item-action>
              <v-icon>{{ icons.mdiInformationOutline }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title> О компании </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item :disabled="!$auth.loggedIn" link href="/orderslist">
            <v-list-item-action>
              <v-icon>{{ icons.mdiContacts }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title> Архив заказов </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-icon
        v-if="$store.state.showBackSpace"
        class="mr-2"
        @click.prevent="to"
        >{{ icons.mdiArrowLeftCircle }}</v-icon
      >
      <v-icon class="mr-2" @click.stop="drawer = !drawer">{{
        icons.mdiMenu
      }}</v-icon>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-toolbar-title style="" class="ml-0 pl-1">
        <v-btn nuxt to="/" class="">{{ $store.state.headerName }}</v-btn>
      </v-toolbar-title>
      <v-spacer />

      <v-btn icon nuxt to="/search">
        <v-icon>{{ icons.mdiMagnify }}</v-icon>
      </v-btn>

      <TheCart />
    </v-app-bar>
    <v-main>
      <v-container class="pa-0 mt-12" fluid style="overflow-x: hidden;">
        <Nuxt />
      </v-container>
    </v-main>
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
        <v-icon>{{ icons.mdiChevronUp }}</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script>
import {
  mdiHomeOutline,
  mdiNewspaperVariantMultipleOutline,
  mdiContacts,
  mdiInformationOutline,
  mdiWalletOutline,
  mdiArrowLeftCircle,
  mdiMagnify,
  mdiChevronUp,
  mdiCart,
  mdiLogout,
  mdiLogin,
  mdiMenu,
} from '@mdi/js'
import { mapGetters } from 'vuex'
import TheSnackbar from '@/components/TheSnackbar.vue'
import TheCart from '@/components/TheCart.vue'
// import TheCucumbers from '@/components/TheCucumbers.vue'

// const consola = require('consola')

export default {
  components: {
    TheSnackbar,
    TheCart,
  },
  data: () => ({
    icons: {
      mdiHomeOutline,
      mdiNewspaperVariantMultipleOutline,
      mdiContacts,
      mdiInformationOutline,
      mdiWalletOutline,
      mdiArrowLeftCircle,
      mdiMagnify,
      mdiChevronUp,
      mdiCart,
      mdiLogout,
      mdiLogin,
      mdiMenu,
    },
    offsetTop: 0,
    dialog: false,
    drawer: null,
    showBtn: false,
    group: null,
  }),
  computed: {
    ...mapGetters({
      showMainDisclaimer: 'snackbar/showMainDisclaimer',
    }),

    showFab() {
      return this.offsetTop > 180
    },
  },
  watch: {
    group(item) {
      // consola.info(item)
      if (item && item !== 2) {
        this.drawer = false
      }
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

    closeShowMainDisclaimer() {
      this.$store.commit('snackbar/SET_SHOW_MAIN_DISCLAIMER', false)
    },

    async logInOut() {
      if (this.$auth.loggedIn) {
        await this.$auth.logout()

        this.$cookies.remove('connectionid')

        this.$store.dispatch('nomenklator/refreshCountCart')

        this.$store.dispatch('snackbar/setSnackbar', {
          color: 'green',
          text: `До свидания`,
          timeout: 5000,
        })
        this.$router.push({ path: '/' })
      } else {
        this.$router.push({ path: '/login' })
      }

      // this.drawer = !this.drawer
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
body,
html {
  max-width: 100%;
  //overflow-x: hidden;
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
