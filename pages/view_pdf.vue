<template>
  <div class="mt-12">
    <client-only>
      <vue-pdf
        v-for="i in 10"
        :key="i"
        :page="i"
        :src="pdfpath"
        @num-pages="pdfPageCount = $event"
      ></vue-pdf>
    </client-only>
  </div>
</template>

<script>
// import pdf from 'vue-pdf'
import { mapGetters } from 'vuex'

export default {
  // components: {
  //   pdf,
  // },
  data: () => ({
    pdfPageCount: undefined,
  }),
  computed: {
    ...mapGetters({
      pdfpath: 'getPdfFile',
    }),
  },

  head() {
    return {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    }
  },
}
</script>
