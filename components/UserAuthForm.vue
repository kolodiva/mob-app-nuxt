<template>
  <v-form v-model="valid" transition="scale-transition">
    <v-text-field
      v-model="userInfo.email"
      label="Email"
      clearable
      :type="showEmail ? 'email' : 'password'"
      counter="true"
      :rules="[
        required('email'),
        emailFormat(userInfo.email),
        maxLength('Длинноватс.', 30),
      ]"
    />
    <v-text-field
      v-model="userInfo.password"
      label="Пароль"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      clearable
      counter="true"
      :rules="[
        required('пароль'),
        minLength('Пароль очень нужен', `${hasName ? 6 : 3}`),
        maxLength('Длинноватс.', 30),
      ]"
      clear-icon="mdi-close-circle"
      @click:append="showPassword = !showPassword"
    />
    <v-text-field
      v-if="hasName"
      v-model="userInfo.password1"
      label="Проверка пароля"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      counter="true"
      :rules="[
        required('Проверка пароля'),
        eqPass('Указанный пароль', userInfo.password, userInfo.password1),
      ]"
      clear-icon="mdi-close-circle"
      clearable
      @click:append="showPassword = !showPassword"
    />
    <v-text-field
      v-if="hasName"
      v-model="userInfo.name"
      clearable
      label="Имя"
      :rules="[maxLength('Длинноватс.', 30)]"
    />
    <v-text-field
      v-if="hasName"
      v-model="userInfo.phone"
      clearable
      label="Телефон"
      messages="Ваш телефон будет использован исключительно для связи с Вами. Если телефон не указан то связь с Вами будет производиться через электронную почту."
      :rules="[maxLength('Длинноватс.', 30)]"
    />
    <v-btn class="mt-8" :disabled="!valid" @click="submitForm(userInfo)">{{
      buttonText
    }}</v-btn>
  </v-form>
</template>

<script>
import validations from '@/utils/validations'
export default {
  props: ['submitForm', 'buttonText', 'hasName'],
  data: () => ({
    valid: false,
    showPassword: false,
    showEmail: false,
    userInfo: {
      phone: '',
      email: '',
      password: '',
      password1: '',
      name: '',
    },
    ...validations,
  }),
  mounted() {
    this.showEmail = true
  },
}
</script>

<style lang="scss" scoped>
.v-input {
  font-size: 1.3rem !important;
}
</style>
