<template>
  <div>
    <v-container fluid>
      <v-layout row wrap justify-center class="mt-4 pa-5">
        <v-flex xs12 sm10 text-xs-center>
          <v-text-field v-model="text" label="The text" textarea></v-text-field>
        </v-flex>
        <v-flex xs12 sm8 md4 text-xs-center>
          <v-card>
            <v-card-text>
              <v-layout row wrap justify-space-around>
                <v-flex xs8 sm9 text-xs-center>
                  <p v-if="error" class="grey--text">{{ error }}</p>
                  <p v-else class="mb-0">
                    <span v-for="(sentence, i) in sentences" :key="i"
                      >{{ sentence }}.
                    </span>
                    <span>{{ runtimeTranscription }}</span>
                  </p>
                </v-flex>
                <v-flex xs2 sm1 text-xs-center>
                  <v-btn
                    dark
                    icon
                    :color="
                      !toggle ? 'grey' : speaking ? 'red' : 'red darken-3'
                    "
                    :class="{ 'animated infinite pulse': toggle }"
                    @click.stop="
                      toggle ? endSpeechRecognition() : startSpeechRecognition()
                    "
                  >
                    <v-icon>{{
                      toggle ? 'mdi-microphone-off' : 'mdi-microphone'
                    }}</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 text-xs-center class="mt-4">
          {{ sentences }}
        </v-flex>
      </v-layout>
    </v-container>
  </div>
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
        this.error =
          'Speech Recognition is not available on this browser. Please use Chrome or Firefox'
      }
    },
    speechEnd({ sentences, text }) {
      console.log('text', text)
      console.log('sentences', sentences)
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
        this.error =
          'Speech Recognition is not available on this browser. Please use Chrome or Firefox'
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
      })

      recognition.addEventListener('result', (event) => {
        const text = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('')
        this.runtimeTranscription = text
      })

      recognition.addEventListener('end', () => {
        if (this.runtimeTranscription !== '') {
          this.sentences.push(
            this.capitalizeFirstLetter(this.runtimeTranscription)
          )
          this.text = `${this.text}${this.sentences.slice(-1)[0]}. `
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
