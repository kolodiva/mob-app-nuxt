<template>
  <v-btn
    v-if="!error"
    dark
    icon
    :color="!toggle ? 'grey' : speaking ? 'red' : 'red darken-3'"
    :class="{ 'animated infinite pulse': toggle }"
    @click.stop="toggle ? endSpeechRecognition() : startSpeechRecognition()"
  >
    <v-icon>{{ toggle ? 'mdi-microphone-off' : 'mdi-microphone' }}</v-icon>
  </v-btn>
</template>

<script>
let SpeechRecognition, recognition
if (process.client) {
  SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  recognition = SpeechRecognition ? new SpeechRecognition() : false
}
export default {
  data: () => ({
    lang: 'ru-RU',
    text: '',
    error: false,
    speaking: false,
    toggle: false,
    runtimeTranscription: '',
    sentences: [],
  }),
  mounted() {
    this.checkCompatibility()
  },
  methods: {
    checkCompatibility() {
      if (!recognition) {
        // this.error = 'Speech Recognition is not available on this browser. Please use Chrome or Firefox'
        this.error = true
      }
    },
    speechEnd({ sentences, text }) {
      // console.log('text', text)
      // console.log('sentences', sentences)
      this.sentences = sentences
    },
    endSpeechRecognition() {
      recognition.stop()
      this.toggle = false
      this.speechEnd({
        sentences: this.sentences,
        text: this.sentences.join('. '),
      })
    },
    startSpeechRecognition() {
      if (!recognition) {
        this.error = true
        return false
      }
      this.toggle = true
      recognition.lang = this.lang
      recognition.interimResults = true

      recognition.addEventListener('speechstart', (event) => {
        this.speaking = true
      })

      recognition.addEventListener('speechend', (event) => {
        this.speaking = false
        this.endSpeechRecognition()
      })

      recognition.addEventListener('result', (event) => {
        const text = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('')
        this.runtimeTranscription = text
        this.$emit('speechend', text)
      })

      recognition.addEventListener('end', () => {
        if (this.runtimeTranscription !== '') {
          this.sentences.push(
            this.capitalizeFirstLetter(this.runtimeTranscription)
          )
          this.text = `${this.sentences.slice(-1)[0]}`
        }
        this.runtimeTranscription = ''
        recognition.stop()
        if (this.toggle) {
          // keep it going.
          recognition.start()
        }
      })
      recognition.start()
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
  },
}
</script>
