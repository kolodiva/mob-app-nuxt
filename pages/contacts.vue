<template>
  <v-container class="">
    <v-row dense>
      <v-col
        v-for="(address, indaddress) in $store.state.addresses.address"
        :key="address.id"
        cols="12"
      >
        <v-card dark color="blue darken-4">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline"
                v-text="address.city"
              ></v-card-title>

              <v-card-title v-text="address.phone"></v-card-title>

              <v-card-subtitle v-text="address.address"></v-card-subtitle>
            </div>

            <v-avatar class="ma-5" tile>
              <a
                :href="`callto:${address.phone_call}`"
                style="color: white; text-decoration: none;"
                ><v-icon large>mdi-phone-forward</v-icon></a
              >
            </v-avatar>
          </div>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header
                >Коллектив
                <template v-slot:actions>
                  <v-icon>$expand</v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list two-line>
                  <v-list-item-group>
                    <template
                      v-for="(item, index) in filteredItems(indaddress)"
                    >
                      <v-list-item :key="index" class="px-0">
                        <template>
                          <v-list-item-content>
                            <v-list-item-title
                              v-html="item.name"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              class="text-wrap"
                              v-html="item.position"
                            ></v-list-item-subtitle>
                          </v-list-item-content>

                          <v-list-item-action class="justify-start">
                            <v-list-item-action-text
                              v-text="`моб. ${item.tel_mob}`"
                            ></v-list-item-action-text>
                            <v-list-item-action-text
                              v-text="`доб. ${item.tel_add}`"
                            ></v-list-item-action-text>
                            <v-list-item-action-text
                              v-text="item.email"
                            ></v-list-item-action-text>
                            <v-list-item-action-text
                              v-text="item.skype"
                            ></v-list-item-action-text>
                          </v-list-item-action>
                        </template>
                      </v-list-item>

                      <v-divider
                        v-if="index + 1 < managers.length"
                        :key="index"
                      ></v-divider>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const consola = require('consola')

export default {
  layout: 'default',
  async asyncData({ app, params }) {
    // const url = `/api/db_manegers/${params.id}`
    // const url = '/api/db'
    const url = '/api/db_manegers/1000000'

    try {
      const row = await app.$axios.$get(url)

      return { managers: row }
    } catch (e) {
      consola.log(e)
    } finally {
    }
  },
  data() {
    return { managers: [{ filial: -1 }] }
  },
  computed: {
    filteredItems() {
      // const vm = this
      return function (filial) {
        return this.managers.filter((pos) => pos.filial === filial)
      }
    },
  },
  beforeCreate() {
    this.$store.commit('SET_HEADER_NAME', 'Контакты')
  },
}
</script>

<style scoped>
.v-card {
  border-radius: 5px !important;
}
</style>
