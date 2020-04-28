<template>
  <div class="mt-12">
    <client-only>
      <vue-pdf
        :src="$store.state.pdfFile"
        @num-pages="pdfPageCount = $event"
      ></vue-pdf>
    </client-only>
  </div>
</template>

<script>
// import pdf from 'vue-pdf'

export default {
  // components: {
  //   pdf,
  // },
  head() {
    return {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    }
  },
}
</script>
