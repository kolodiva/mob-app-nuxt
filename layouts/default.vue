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

            <v-list-item href="/advs/dostavka-moskva">
              <v-list-item-action> </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title> Доставка (Москва) </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item href="/advs/dostavka-novosibirsk">
              <v-list-item-action> </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title> Доставка (Новосибирск) </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item href="/advs/dostavka-yekaterinburg">
              <v-list-item-action> </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title> Доставка (Екатеринбург) </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item href="/advs/dostavka-rostov-na-donu">
              <v-list-item-action> </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>
                  Доставка (Ростов-на-Дону)
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item href="/advs/dostavka-kazan">
              <v-list-item-action> </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title> Доставка (Казань) </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item href="/advs/dostavka-sankt-peterburg">
              <v-list-item-action> </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>
                  Доставка (Санкт-Петербург)
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item href="/advs/dostavka-krasnodar">
              <v-list-item-action> </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title> Доставка (Краснодар) </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item href="/advs/vozvrat-obmen">
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

          <v-list-item href="/advs/about-company">
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
      <v-container class="pa-0" fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <TheSnackbar />

      <v-overlay v-if="showMainDisclaimer == 1" v-show="showMainDisclaimer == 1">
        <v-card light width="300px">
          <div class="pt-5">
            <div
              class="cyan white--text text-center pa-2 px-4 mx-auto"
              style="width: 270px; top: 30px"
            >
              УВАЖАЕМЫЕ ПОКУПАТЕЛИ !
            </div>
          </div>
          <div class="text-center mx-auto mt-5" style="width: 270px">
            Компания "МФ-КОМПЛЕКТ"
          </div>
          <div
            class="text-center mx-auto mt-1 red--text headline font-weight-medium"
            style="width: 270px"
          >
            НЕ РАБОТАЕТ
          </div>
          <div
            class="text-center mx-auto red--text subtitle-2 font-weight-medium"
            style="width: 270px"
          >
            с 31 декабря - 10 января 2021 года!<br/>
            (выходные праздничные дни)
          </div>
          <v-divider class="mx-auto my-3" style="width: 270px" />
          <div class="text-center mx-auto subtitle-1 font-weight-bold" style="">
            ВСЕ ВАШИ ЗАКАЗЫ ПОПАДУТ В НАШУ СИСТЕМУ ОБРАБОТКИ ЗАКАЗОВ,
          </div>
          <div class="text-center mx-auto subtitle-2" style="">
            но будут обработаны 11 января 2021 года.
          </div>
          <div
            class="text-center mx-auto subtitle-1 font-weight-bold mt-4"
            style=""
          >
            ДОСТАВКА И САМОВЫВОЗ БУДУТ ТАК ЖЕ ОСУЩЕСТВЛЯТЬСЯ
          </div>
          <div class="text-center mx-auto subtitle-2" style="">
            после Новогодних праздников с 11 января 2021 года.
          </div>
          <v-divider class="mx-auto my-3" style="width: 270px" />
          <div class="text-center mx-auto mb-3" style="width: 270px">
            С уважением Ваш, "МФ-КОМПЛЕКТ"<br />
          </div>
          <v-divider />
          <v-card-actions
            ><v-spacer /><v-btn text @click="closeShowMainDisclaimer"
              >Закрыть</v-btn
            ></v-card-actions
          >
        </v-card>
      </v-overlay>


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
import TheSnackbar from '@/components/TheSnackbar.vue'
import TheCart from '@/components/TheCart.vue'
// import TheCucumbers from '@/components/TheCucumbers.vue'

// const consola = require('consola')

import { mapGetters } from "vuex";

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
          showMainDisclaimer: "snackbar/showMainDisclaimer",
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
      this.$store.commit("snackbar/SET_SHOW_MAIN_DISCLAIMER", false);
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
body, html {
    max-width: 100%;
   overflow-x: hidden;
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
