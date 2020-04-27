<template>
  <div class="mt-5">
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-card>
          <v-container fluid style="min-height: 100vh;">
            <v-row>
              <v-col
                v-for="pos of nomenklators"
                :key="pos.id"
                class="d-flex child-flex"
                cols="6"
              >
                <n-link
                  :to="`${
                    pos.itgroup
                      ? pos.guid
                      : pos.parentguid + '?itemcard=' + pos.synonym
                  }`"
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
        return [
          {
            guid: 123456,
            guid_picture: 'https://picsum.photos/500/300?image=15',
            name: 'Загружаются данные',
          },
          {
            guid: 123456,
            guid_picture: 'https://picsum.photos/500/300?image=15',
            name: 'Загружаются данные',
          },
          {
            guid: 123456,
            guid_picture: 'https://picsum.photos/500/300?image=15',
            name: 'Загружаются данные',
          },
          {
            guid: 123456,
            guid_picture: 'https://picsum.photos/500/300?image=15',
            name: 'Загружаются данные',
          },
          {
            guid: 123456,
            guid_picture: 'https://picsum.photos/500/300?image=15',
            name: 'Загружаются данные',
          },
          {
            guid: 123456,
            guid_picture: 'https://picsum.photos/500/300?image=15',
            name: 'Загружаются данные',
          },
          {
            guid: 123456,
            guid_picture: 'https://picsum.photos/500/300?image=15',
            name: 'Загружаются данные',
          },
          {
            guid: 123456,
            guid_picture: 'https://picsum.photos/500/300?image=15',
            name: 'Загружаются данные',
          },
          {
            guid: 123456,
            guid_picture: 'https://picsum.photos/500/300?image=15',
            name: 'Загружаются данные',
          },
          {
            guid: 123456,
            guid_picture: 'https://picsum.photos/500/300?image=15',
            name: 'Загружаются данные',
          },
          {
            guid: 123456,
            guid_picture: 'https://picsum.photos/500/300?image=15',
            name: 'Загружаются данные',
          },
          {
            guid: 123456,
            guid_picture: 'https://picsum.photos/500/300?image=15',
            name: 'Загружаются данные',
          },
          {
            guid: 123456,
            guid_picture: 'https://picsum.photos/500/300?image=15',
            name: 'Загружаются данные',
          },
        ]
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
