<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      <v-container class="pa-5" style="">
        <NuxtLink to="/"
          >404 Данный ресурс не найден. Перейти на главную страницу. 404
        </NuxtLink>
      </v-container>
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound:
        'Купить в Москва, Санкт-Петербург, Казань, Екатеринбург, Ростов-на-Дону, Краснодар | Описание, фото, характеристики, цены в Интернет магазине МФ-Комплект',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
