<template>
  <pdf class="mt-10" src="mf_komplekt_osoby_rezim_raboty.pdf"></pdf>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  components: {
    pdf,
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
