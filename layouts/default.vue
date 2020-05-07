<template>
  <v-app v-scroll="onScroll">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <p class="ml-4 pt-2">
          Приветствуем,
          {{ $auth && $auth.user ? $auth.user.username : 'Anonimus' }}
        </p>
        <v-btn v-if="$auth.loggedIn" class="mt-5" @click.prevent="$auth.logout"
          >ВЫЙТИ</v-btn
        >
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link>
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" link :href="item.href">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="" class="ml-0 pl-1">
        <v-btn href="/" class="">{{ $store.state.headerName }}</v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
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
export default {
  components: {
    TheSnackbar,
  },
  data: () => ({
    offsetTop: 0,
    dialog: false,
    drawer: null,
    items: [
      { icon: 'mdi-contacts', text: 'Контакты', href: '/contacts' },
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
  },
  methods: {
    onScroll() {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
    },
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
