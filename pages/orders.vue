<template>
  <div>
    <v-card flat class="px-5">
      <v-card-title>
        Заказ польз.
        {{ this.$auth.loggedIn ? this.$auth.user.name : 'Anonimus' }}
      </v-card-title>
      <v-card-subtitle>
        <v-row class="title">номер: {{ numOrder }} </v-row>
        <v-row class="title"
          >на сумму: {{ sumOrder }}
          <v-icon small>mdi-currency-rub</v-icon></v-row
        >
      </v-card-subtitle>

      <v-card-actions>
        <v-btn color="orange" @click="sendOrderForm = !sendOrderForm">
          Отправить заказ в обработку
        </v-btn>
      </v-card-actions>

      <v-list three-line ripple>
        <template v-for="(item, i) in cartList">
          <v-list-item :key="i + 1" class="px-0" @click="goToGoodCard(i)">
            <v-list-item-avatar width="80">
              <v-img eager :src="item.guid_picture_small"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title
                >{{ item.artikul }}, {{ item.unit_name }}</v-list-item-title
              >
              <v-list-item-subtitle>{{ item.name }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text
                class="title"
                v-text="parseFloat(item.qty)"
              ></v-list-item-action-text>
              <v-list-item-action-text
                class="title"
                v-text="parseFloat(item.price)"
              ></v-list-item-action-text>
              <v-list-item-action-text
                class="title"
                v-text="parseFloat(item.sum)"
              ></v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
          <v-divider :key="(i + 1) * 1000" inset></v-divider>
        </template>
      </v-list>
    </v-card>
    <v-dialog v-model="sendOrderForm" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="subtitle-1">Заказ</span>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="sendOrderForm = !sendOrderForm"
            >Отмена</v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-card-text class="pa-0">
            Заказ, отправленный через наш сайт будет исполняться в приоритетном
            режиме. Для Зарегистрированных пользователей доступна оплата
            Платежной картой после обработки Заказа менеджером.
          </v-card-text>
          <v-container>
            <v-row>
              <template v-if="!this.$auth.loggedIn">
                <v-col cols="12" sm="6" md="4" class="py-0">
                  <v-text-field
                    v-model="mister"
                    :type="showEmail ? 'text' : 'password'"
                    label="Обращение*"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" class="pb-0">
                  <v-text-field
                    v-model="email"
                    :type="showEmail ? 'email' : 'password'"
                    label="Email*"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" class="pb-0">
                  <v-text-field
                    v-model="phone"
                    :type="showEmail ? 'text' : 'password'"
                    label="Контактный телефон*"
                  ></v-text-field>
                </v-col>
              </template>
              <v-col cols="12" sm="6" md="4" class="pa-0">
                <v-textarea
                  v-model="lastWord"
                  :type="showEmail ? 'text' : 'password'"
                  filled
                  label="Напутствие"
                  auto-grow
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="defFil"
                  :items="[
                    'Москва',
                    'Екатеринбург',
                    'Ростов-на-Дону',
                    'Новосибирск',
                    'Казань',
                    'Санкт-Петербург',
                    'Краснодар',
                  ]"
                  label="Филиал*"
                ></v-select>
              </v-col>
              <v-col v-if="this.$auth.loggedIn" cols="12" sm="6">
                <v-checkbox
                  v-model="mastercard"
                  label="Хочу оплатить картой!"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
          <small>* обязательное поле Анонима</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="sendOrderForm = !sendOrderForm"
            >Отмена</v-btn
          >
          <v-btn color="blue darken-1" text @click="sendOrder">Отправить</v-btn>
        </v-card-actions>
      </v-card>
      <v-dialog v-model="questAnonymus" max-width="500px">
        <v-card>
          <v-card-actions>
            <v-btn color="primary" text @click="true === true">
              Информация
            </v-btn>
            <v-spacer />
            <v-btn color="primary" text @click="questAnonymus = false">
              Отмена
            </v-btn>
          </v-card-actions>
          <v-card-title class="subtitle-1" style="word-break: break-word;">
            ВАШ ЗАКАЗ АНОНИМНЫЙ. ВЫ МОЖЕТЕ ПРОДОЛЖИТЬ, НО НУЖНО УКАЗАТЬ СПОСОБ
            СВЯЗИ С ВАМИ, ЛИБО ВОЙТИ В СИСТЕМУ ПОД СВОИМ АККАУНТОМ. ЕСЛИ ВЫ
            ОЧИСТИТЕ КУКИ ИЛИ ОТКРОЕТЕ САЙТ В ДРУГОМ БРАУЗЕРЕ В КАЧЕСТВЕ
            АНОНИМНОГО ПОКУПАТЕЛЯ, ТО УЖЕ НЕ СМОЖЕТЕ УВИДЕТЬ СВОЙ ЗАКАЗ.
            РЕКОМЕНДУЕМ ВАМ ВОЙТИ/ЗАРЕГИСТРИРОВАТЬСЯ ПОД СВОИМ ЛОГИНОМ.
          </v-card-title>
          <v-card-actions>
            <v-btn color="primary" text href="/login">
              Войти
            </v-btn>
            <v-spacer />
            <v-btn
              v-if="(this.notFullDataAnonim === true)"
              color="primary"
              text
              @click="questAnonymus = false"
            >
              Заполните форму
            </v-btn>
            <v-btn v-else color="primary" text @click="sendOrder2">
              Отправить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData({ app, params, query, store }) {
    await store.dispatch('nomenklator/refreshCountCart')
  },
  data: () => ({
    defFil: 'Москва',
    sendOrderForm: false,
    questAnonymus: false,
    notFullDataAnonim: true,
    mister: '',
    email: '',
    phone: '',
    lastWord: '',
    mastercard: false,
    showEmail: false,
  }),
  computed: {
    ...mapGetters({
      cartList: 'nomenklator/getCartList',
    }),
    numOrder() {
      return this.cartList && this.cartList.length > 0
        ? this.cartList[0].order_id + ' от ' + this.cartList[0].data_on
        : '***'
    },
    sumOrder() {
      return this.cartList && this.cartList.length > 0
        ? parseFloat(this.cartList[0].sum_total)
        : '0'
    },
  },
  beforeCreate() {
    this.$store.commit('SET_HEADER_NAME', 'Заказы')
  },
  mounted() {
    this.showEmail = true
  },
  methods: {
    getCoodCardPath(i) {
      return this.cartList && this.cartList.length > 0
        ? `/catalog/${this.cartList[i].parentguid}/${this.cartList[i].synonym}`
        : undefined
    },
    goToGoodCard(i) {
      const path = this.getCoodCardPath(i)
      if (path) {
        this.$router.push({ path })
      }
    },
    async sendOrder() {
      if (!this.$auth.loggedIn) {
        this.notFullDataAnonim = !(this.mister && this.email && this.phone)

        this.questAnonymus = true
      } else {
        try {
          await this.$store.dispatch('nomenklator/procOrder', {
            mister: this.mister,
            filial: this.defFil,
            email: this.email,
            phone: this.phone,
            info: this.lastWord,
            mastercard: this.mastercard,
            showEmail: false,
          })
          await this.$store.dispatch('snackbar/setSnackbar', {
            color: 'green',
            text: `Заказ отправлен в обработку`,
            timeout: 5000,
          })
          this.$store.dispatch('nomenklator/refreshCountCart')
          this.$router.replace({ path: '/' })
        } catch (e) {
          await this.$store.dispatch('snackbar/setSnackbar', {
            color: 'error',
            text: `Ошибка при попытке отправить Заказ в обработку: ${e.response.data}`,
            timeout: 5000,
          })
        }
        this.questAnonymus = false
        this.sendOrderForm = false
      }
    },
    async sendOrder2() {
      try {
        await this.$store.dispatch('nomenklator/procOrder', {
          mister: this.mister,
          filial: this.defFil,
          email: this.email,
          phone: this.phone,
          info: this.lastWord,
          mastercard: this.mastercard,
        })
        await this.$store.dispatch('snackbar/setSnackbar', {
          color: 'green',
          text: `Заказ отправлен в обработку`,
          timeout: 5000,
        })
        this.$store.dispatch('nomenklator/refreshCountCart')
        this.$router.replace({ path: '/' })
      } catch (e) {
        await this.$store.dispatch('snackbar/setSnackbar', {
          color: 'error',
          text: `Ошибка при попытке отправить Заказ в обработку: ${e.response.data}`,
          timeout: 5000,
        })
      }
      this.questAnonymus = false
      this.sendOrderForm = false
    },
  },
}
</script>
