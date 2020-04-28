<template>
  <div>
    <client-only>
      <vue-pdf
        src="/mf_komplekt_osoby_rezim_raboty.pdf"
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
