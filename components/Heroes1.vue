<template>
  <v-container class="pa-5 mt-10 font-weight-light headline text-justify">
    <content>
      <img src="@/static/gleb.jpg" width="200" />
      <h3>
        Здесь я планирую сделать слайдер для просмотра товара в увеличенном виде
        с нанесение данных прямо на фото. Геогрий держись.
        <p />
        <p>{{ posNom }}</p>
      </h3></content
    >
  </v-container>
</template>
<script>
export default {
  props: {
    posNom: {
      type: String,
      default: () => {
        return 'Нет данных Хьюстон... '
      },
    },
  },
  beforeCreate() {
    this.$store.commit('setHeaderName', 'Герой дня.')
  },
}
</script>
