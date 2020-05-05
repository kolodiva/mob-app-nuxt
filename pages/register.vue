<template lang="html">
  <v-container>
    <h1>Регистрация</h1>
    <UserAuthForm
      button-text="Регистрация"
      :submit-form="registerUser"
      has-name="true"
    />
  </v-container>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'
export default {
  components: {
    UserAuthForm,
  },
  methods: {
    registerUser(registrationinfo) {
      alert('You pressed a button')
    },
  },
}
</script>

<style lang="scss" scoped></style>
