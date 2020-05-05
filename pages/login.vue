<template lang="html">
  <v-container>
    <h1>Авторизация</h1>
    <UserAuthForm button-text="Войти" :submit-form="loginUser" />
    <v-btn @click.prevent="$auth.logout">ВЫЙТИ</v-btn>
  </v-container>
</template>

<script>
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
    async loginUser(e, loginInfo) {
      try {
        // consola.info(loginInfo)
        await this.$auth.loginWith('local', {
          data: { email: 'kolodiva@mail.ru', password: '9876543210' },
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
        this.$router.push('/register')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
