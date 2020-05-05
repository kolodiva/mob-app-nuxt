<template>
  <v-form v-model="valid">
    <v-text-field
      v-if="hasName"
      v-model="userInfo.name"
      label="Имя"
      :rules="[]"
    />
    <v-text-field v-model="userInfo.email" label="Email" :rules="[]" />
    <v-text-field
      v-model="userInfo.password"
      label="Пароль"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      counter="true"
      :rules="[]"
      @click:append="showPassword = !showPassword"
    />
    <v-btn :disabled="!valid" @click="submitForm(userInfo)">{{
      buttonText
    }}</v-btn>
  </v-form>
</template>

<script>
export default {
  props: ['submitForm', 'buttonText', 'hasName'],
  data: () => ({
    valid: false,
    showPassword: false,
    userInfo: {
      email: 'kolodiva@mail.ru',
      password: '123456',
      name: 'Vittorio',
    },
  }),
}
</script>

<style lang="css" scoped></style>
