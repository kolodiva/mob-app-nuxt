<template lang="html">
  <v-container>
    <h1>Авторизация</h1>
    <UserAuthForm button-text="Войти" :submit-form="loginUser" />
    <v-btn @click.prevent="$auth.logout">ВЫЙТИ</v-btn>
  </v-container>
</template>

<script>
// import sha256 from 'crypto-js/sha256'
// // import Base64 from 'crypto-js/enc-base64'
// // import Base64 from 'crypto-js/enc-base64'
// // import Hex64 from 'crypto-js/enc-hex'
// import AES from 'crypto-js/aes'
// import encUtf8 from 'crypto-js/enc-utf8'

import UserAuthForm from '@/components/UserAuthForm'
// const consola = require('consola')
export default {
  middleware: ['auth-props'],
  components: {
    UserAuthForm,
  },
  mounted() {
    // consola.info('test LOGIN')
  },
  methods: {
    async loginUser(loginInfo) {
      const keys = this.$getCryptoKey(this.$CryptoJS)
      this.$cookies.set('_keyUser', keys.key1)

      const ciphertext = this.$CryptoJS.AES.encrypt(
        loginInfo.password,
        keys.key2
      ).toString()

      // const bytes = this.$CryptoJS.AES.decrypt(ciphertext, keys.key2)
      // const originalText = bytes.toString(this.$CryptoJS.enc.Utf8)
      // consola.info(originalText)
      // loginInfo.email = keys.key2
      loginInfo.password = ciphertext
      try {
        await this.$auth.loginWith('local', {
          data: loginInfo,
        })
        // consola.info('test LOGIN 222')

        await this.$store.dispatch('snackbar/setSnackbar', {
          color: 'green',
          text: `Спасибо Вам за авторизацию, ${this.$auth.user.name}`,
          timeout: 5000,
        })

        // this.$router.push('/')
      } catch (e) {
        await this.$store.dispatch('snackbar/setSnackbar', {
          color: 'red',
          text: e.response.data,
          timeout: 5000,
        })
        // this.$router.push('/register')
      }

      loginInfo.password = 'Pp123456'
    },
  },
}
</script>

<style lang="scss" scoped></style>
