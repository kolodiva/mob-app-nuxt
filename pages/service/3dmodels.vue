<template>
  <v-container
    fill-height
    class="pa-5 mt-10 font-weight-light headline text-justify"
  >
    <content> <p>Данные для системы Базис доступны только на стационарном Сайте.</p> </content>
  </v-container>
</template>
<script>
export default {
  beforeCreate() {
    this.$store.commit('setHeaderName', 'Архивы фурнитуры для использования в системе автоматического проектирования мебели БАЗИС-Мебельщик на базе фурнитуры компании МФ-Комплект.')
  },
}
</script>
