<template>
  <v-overlay opacity="2">
    <News />
  </v-overlay>
</template>

<script>
import News from '@/components/News.vue'
export default {
  components: {
    News,
  },
}
</script>
