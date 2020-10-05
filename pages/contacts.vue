<template>
  <v-row justify="center">
    <v-expansion-panels inset focusable>
      <v-expansion-panel readonly>
        <v-expansion-panel-header ripple>
          <a
            href="https://wa.me/79166004290?text=У%20меня%20по%20товару%20вопрос."
            style="text-decoration: none"
          >
            <v-list-item>
              <v-list-item-avatar @click.stop="">
                <v-icon dark color="green">{{ icons.mdiWhatsapp }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  Что как - WhatsApp!
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </a>
        </v-expansion-panel-header>
      </v-expansion-panel>
      <v-expansion-panel readonly>
        <v-expansion-panel-header ripple>
          <a
            href="https://www.instagram.com/mf_komplekt_msk/"
            style="text-decoration: none"
          >
            <v-list-item>
              <v-list-item-avatar @click.stop="">
                <v-img src="instagram-logo-icon.png" width="50" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  <v-img src="instagram.png" width="200" />
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </a>
        </v-expansion-panel-header>
      </v-expansion-panel>
      <v-expansion-panel v-for="address in addressess" :key="address.id">
        <v-expansion-panel-header ripple>
          <v-list-item>
            <v-list-item-avatar @click.stop="">
              <a
                :href="`callto:${address.phone_call}`"
                style="text-decoration: none"
                ><v-icon large>{{ icons.mdiPhoneForward }}</v-icon></a
              >
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">
                {{ address.city }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>{{ icons.mdiPhone }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="subtitle">{{
              address.phone
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>{{ icons.mdiEmail }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="subtitle">
              <address>
                <a
                  :href="`mailto:${address.email}`"
                  style="text-decoration: none"
                  >{{ address.email }}</a
                >
              </address>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>{{ icons.mdiMail }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="subtitle">{{
              address.address
            }}</v-list-item-content>
          </v-list-item>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
// const consola = require('consola')
import { mapGetters } from 'vuex'
import {
  mdiMail,
  mdiPhone,
  mdiPhoneForward,
  mdiWhatsapp,
  mdiInstagram,
  mdiEmail,
} from '@mdi/js'

export default {
  name: 'ContactsPage',
  serverCacheKey() {
    return true
  },
  async asyncData({ app, params }) {},
  data() {
    return {
      icons: {
        mdiMail,
        mdiPhone,
        mdiPhoneForward,
        mdiWhatsapp,
        mdiInstagram,
        mdiEmail,
      },
    }
  },
  computed: {
    ...mapGetters({
      addressess: 'addresses/getAllSortCity',
    }),
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
