<template>
  <div class="mt-5">
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col
                v-for="(pos, i) of nomenklators"
                :key="i"
                class="d-flex child-flex"
                cols="6"
              >
                <n-link
                  :to="`catalog/${pos.guid}`"
                  style="text-decoration: none;"
                >
                  <v-card>
                    <v-img
                      eager
                      :src="pos.guid_picture"
                      aspect-ratio="1"
                      class="grey lighten-2"
                      lazy-src="https://picsum.photos/500/300?image=15"
                      contain
                      height="140"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                    <v-card-text class="text--primary pa-2">
                      <div
                        class="text-center"
                        style="height: 45px; overflow: hidden;"
                      >
                        {{ pos.name }}
                      </div>
                    </v-card-text>
                  </v-card>
                </n-link>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
const consola = require('consola')
export default {
  async asyncData({ store, app, params }) {
    // consola.info('44444444444444444444444444444444')
    let url = ''
    if (store.state.showOverlay) {
      url = '/api/db_news'
      try {
        const rows = await app.$axios.$get(url)
        store.commit('setNewsRows', rows)
      } catch (e) {
        consola.info(e)
      } finally {
      }
    }
    url = '/api/db'
    try {
      const row = await app.$axios.$get(url)
      return { nomenklators: row }
    } catch (e) {
      consola.info(e)
    } finally {
    }
  },

  data: () => ({
    nomenklators: mapState(['nomenklators']),
  }),
  beforeCreate() {
    this.$store.commit('setHeaderName', 'Комплект')
  },
  head() {
    return {
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui',
        },
      ],
    }
  },
}
</script>
