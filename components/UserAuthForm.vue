<template>
  <v-form v-model="valid" transition="scale-transition">
    <v-text-field
      v-model="userInfo.email"
      label="Email"
      clear-icon="mdi-close-circle"
      clearable
      :rules="[required('email'), emailFormat()]"
      type="email"
      autocapitalize="simon"
    />
    <v-text-field
      v-model="userInfo.password"
      label="Пароль"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      counter="true"
      :rules="[required('пароль'), minLength('Пароль очень нужен', 6)]"
      clear-icon="mdi-close-circle"
      clearable
      @click:append="showPassword = !showPassword"
    />
    <v-text-field
      v-if="hasName"
      v-model="userInfo.name"
      label="Имя"
      :rules="[]"
    />
    <v-text-field
      v-if="hasName"
      v-model="userInfo.phone"
      label="Телефон"
      messages="Ваш телефон будет использован исключительно для связи с Вами. Если телефон не указан то связь с Вами будет производиться через электронную почту."
      :rules="[]"
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
    userInfo: {
      phone: '',
      email: '',
      password: '',
      name: '',
    },
    ...validations,
  }),
}
</script>

<style lang="css" scoped></style>
