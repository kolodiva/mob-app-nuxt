<template>
  <div class="mt-12">
    <client-only>
      <vue-pdf :src="pdfpath" @num-pages="pdfPageCount = $event"></vue-pdf>
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
