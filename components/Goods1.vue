<template>
  <div class="mt-5">
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-container fluid style="min-height: 100vh;">
          <v-row>
            <v-col v-for="pos of nomenklators" :key="pos.id" cols="12">
              <v-card elevation="3" outlined>
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="overline mb-4">
                      <span class="body-2">{{ pos.pname }}</span>
                    </div>
                    <v-list-item-title class="headline mb-1"
                      >Хороший товар
                    </v-list-item-title>
                    <v-list-item-subtitle
                      >{{ '(' + pos.artikul + ') ' + pos.name }}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-avatar tile size="80" color="grey">
                    <v-img
                      :src="pos.guid_picture"
                      :lazy-src="`https://picsum.photos/10/6?image=${
                        1 * 5 + 10
                      }`"
                      aspect-ratio="1"
                      class="grey lighten-2"
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
                  </v-list-item-avatar>
                </v-list-item>
                <v-card-actions>
                  <v-btn text>
                    <a
                      :href="`/catalog/${
                        pos.itgroup ? pos.guid : pos.parentguid
                      }?itemcard=${pos.synonym}`"
                    >
                      Узри его скорее...</a
                    ></v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <!-- <winOverlay /> -->
  </div>
</template>
<script>
// const consola = require('consola')
// import winOverlay from '@/components/overlay.vue'
export default {
  props: {
    nomenklators: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  // components: {
  //   winOverlay,
  // },
  data: () => ({}),
  beforeCreate() {
    this.$store.commit('setHeaderName', 'Комплект')
  },
}
</script>
