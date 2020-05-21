<template lang="html">
  <v-container style="align-self: start;">
    <h1>{{ isLogin ? 'Авторизация' : 'Регистрация' }}</h1>
    <UserAuthForm
      :button-text="isLogin ? 'Войти' : 'Зарегистрироваться'"
      :submit-form="loginUser"
      :has-name="!isLogin"
    />
  </v-container>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'
// const consola = require('consola')
export default {
  components: {
    UserAuthForm,
  },
  middleware: ['auth-props'],
  data() {
    return { isLogin: true }
  },
  mounted() {
    // consola.info('test LOGIN')
  },
  methods: {
    async loginUser(loginInfo) {
      const userInfo = { email: '', password: '', name: '', phone: '' }

      const keys = this.$getCryptoKey(this.$CryptoJS)

      this.$cookies.set('_keyUser', keys.key1)

      const ciphertext = this.$CryptoJS.AES.encrypt(
        loginInfo.password,
        keys.key2
      ).toString()

      userInfo.email = loginInfo.email

      userInfo.phone = loginInfo.phone

      userInfo.name = loginInfo.name

      userInfo.password = ciphertext

      try {
        if (this.isLogin) {
          await this.$auth.loginWith('local', {
            data: userInfo,
          })
          await this.$store.dispatch('snackbar/setSnackbar', {
            color: 'green',
            text: `Спасибо Вам за авторизацию, ${this.$auth.user.name}`,
            timeout: 5000,
          })

          await this.$store.dispatch('nomenklator/refreshCountCart')

          this.$router.replace('/')
        } else {
          try {
            userInfo.password = this.$CryptoJS
              .SHA256(loginInfo.password)
              .toString()
            await this.$api('session', 'userNew', userInfo)
            // await this.$axios.post('/api/userNew', userInfo)
            userInfo.password = ciphertext
            await this.$auth.loginWith('local', {
              data: userInfo,
            })

            await this.$store.dispatch('snackbar/setSnackbar', {
              color: 'green',
              text: `Спасибо Вам за авторизацию, ${this.$auth.user.name}`,
              timeout: 5000,
            })

            await this.$store.dispatch('nomenklator/refreshCountCart')

            this.$router.replace('/')
          } catch (e) {
            // consola.info(e.response.data)
            await this.$store.dispatch('snackbar/setSnackbar', {
              color: 'error',
              text: `Ошибка при попытке регистрации: ${e.response.data}`,
              timeout: 5000,
            })
            return
          }
        }
      } catch (e) {
        await this.$store.dispatch('snackbar/setSnackbar', {
          color: 'red',
          text: e.response.data,
          timeout: 5000,
        })

        if (e.response.status === 404) {
          this.isLogin = false
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
