//const colors = require('vuetify/es5/util/colors').default
const path = require('path')
const fs = require('fs')

module.exports = {
  // server: {
  //     https: {
  //       key: fs.readFileSync(path.resolve(__dirname, 'privkey.pem')),
  //       cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem'))
  //     }
  //   },
  env: {
    // PGUSER: 'postgres',
  },
  mode: 'universal',
  //mode: 'spa',
  /*
   ** Headers of the page
   */
  router: {
  //   base: '/'
    middleware: 'stats'
  },
  head: {
    // titleTemplate: '%s - ' + process.env.npm_package_name,
    titleTemplate: '%s',
    htmlAttrs: {
        lang: 'ru',
      },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { name: 'description', content: 'Мебельная фурнитура. Наша складская программа, насчитывающая более 5000 наименований продукции, постоянно пополняется с учетом ваших потребностей.' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
     'assets/main.css'
  ],

// '~/api/index.js'
  serverMiddleware: [
    { path: "/api", handler: require("body-parser").json() },
        {
          path: "/api",
          handler: (req, res, next) => {
            const url = require("url");
            req.query = url.parse(req.url, true).query;
            req.params = { ...req.query, ...req.body };
            next();
          }
        },
        { path: "/api", handler: "~/serverMiddleware/api-server.js" }
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [/*'~plugins/vuetify.js'*/
    {src: '~/plugins/vue-pdf.js', mode: 'client'},
    {src: '~/plugins/vue-inject.js', mode: 'client'},
    {src: '~/plugins/crypto-js.js'},
    {src: '~/plugins/api-context.client.js', mode: 'client'},
    {src: '~/plugins/api-context.server.js', mode: 'server'},
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt',
    '@nuxtjs/component-cache',
    ['@nuxtjs/yandex-metrika',
      {
        id: '51108848',
        webvisor: true,
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
      }],
    //'@nuxtjs/auth',
    // ['cookie-universal-nuxt', { alias: 'cookiz' }],
  ],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  axios: {
    // proxyHeaders: false
    proxy: true,
     //baseURL: 'http://127.0.0.1:3000/api'
  },

  auth: {
    strategies: {
      local: {
        token: {
          required: true,
          type: false,
          maxAge: 604800
         },
        endpoints: {
          login: { url: '/api/session', method: 'post', propertyName: 'data.token'  },
          user: { url: '/api/userAuth', method: 'get', propertyName: 'data'  },
          logout: false
        },
      },
    },
    redirect: {
    home: false,
    callback: false,
    logout: false
    }
  },

  vuetify: {
    // customVariables: ['~/assets/variables.scss'],
    // theme: {
    //   dark: true,
    //   themes: {
    //     dark: {
    //       primary: colors.blue.darken2,
    //       accent: colors.grey.darken3,
    //       secondary: colors.amber.darken3,
    //       info: colors.teal.lighten1,
    //       warning: colors.amber.base,
    //       error: colors.deepOrange.accent4,
    //       success: colors.green.accent3,
    //     },
    //   },
    // },
  },
  /*
   ** Build configuration
   */
  build: {
    // vendor: ['vuetify'],
    /*
     ** You can extend webpack config here
     */
    parallel: true,
    cache: true,
    hardSource: true,
    extend(config, ctx) {

      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true,
          },
        })
      }

    },
  },
}
