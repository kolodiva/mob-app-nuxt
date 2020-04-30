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
    <div class="pa-5 mt-5">
      <section>
        &#8195;Компания «МЕБЕЛЬНАЯ ФУРНИТУРА» - один из крупнейших поставщиков
        мебельной фурнитуры на российском рынке. В 2019 году компания
        отпраздновала свое 25-летие.

        <br />

        &#8195;В 2018 году команда «МФ-КОМПЛЕКТА» провела ребрендинг веб-сайта и
        для удобства наших клиентов запустила свой интернет-магазин. В нем
        представлена полная линейка фурнитуры как наших собственных брендов:

        <br />

        <div class="my-5">
          <img
            class="mr-1"
            style="-webkit-user-select: none;"
            src="https://newfurnitura.ru/upload/emblems/mf.png"
          />
          ,

          <a
            class="mx-1"
            href="https://newfurnitura.ru/catalog/tango"
            target="_blank"
            style=""
          >
            <img
              style="-webkit-user-select: none;"
              src="https://newfurnitura.ru/upload/emblems/tango.png"
            />
          </a>
          ,

          <a
            class="mx-1"
            href="https://newfurnitura.ru/catalog/kruchki_ruchki"
            target="_blank"
            style=""
          >
            <img
              style="-webkit-user-select: none;"
              src="https://newfurnitura.ru/upload/emblems/eos.png"
            />
          </a>
          ,

          <a
            class="mx-1"
            href="https://newfurnitura.ru/catalog/petli_mf_s_dovodchikom"
            target="_blank"
            style=""
          >
            <img
              style="-webkit-user-select: none;"
              src="https://newfurnitura.ru/upload/emblems/mf_prima.png"
            />
          </a>
          , так и брендов наших партнеров:

          <a
            class="mx-1"
            href="http://www.fgv.it/index.php/ru"
            target="_blank"
            style=""
          >
            <img
              style="-webkit-user-select: none;"
              src="https://newfurnitura.ru/upload/emblems/fgv.png"
            />
          </a>
          ,

          <a
            class="mx-1"
            href="http://www.mepamobilya.com.tr/ru/index.php"
            target="_blank"
            style=""
          >
            <img
              style="-webkit-user-select: none;"
              src="https://newfurnitura.ru/upload/emblems/mepa.png"
            />
          </a>
          ,

          <a
            class="mx-1"
            href="http://www.compagnucci.it/en/index.php"
            target="_blank"
            style=""
          >
            <img
              style="-webkit-user-select: none;"
              src="https://newfurnitura.ru/upload/emblems/compagnucci.png"
            />
          </a>
          ,

          <a
            class="mx-1"
            href="http://www.unihopper.biz/en"
            target="_blank"
            style=""
          >
            <img
              style="-webkit-user-select: none;"
              src="https://newfurnitura.ru/upload/emblems/unihopper.png"
            /> </a
          >.
        </div>
      </section>

      <section class="mt-2">
        Почему вы можете доверять нашей продукции и смело советовать нас вашим
        друзьям и партнерам?
      </section>

      <section class="mt-2">
        1. Качество поставляемой функциональной и лицевой фурнитуры проверено
        десятками тысяч наших клиентов на протяжении более 20 лет;<br />
      </section>

      <section class="mt-2">
        2. Мы осуществляем прямые поставки от производителей – оптимальная
        логистика и высокая эффективность позволяют предлагать нашим клиентам
        лучшие цены;<br />
      </section>

      <section class="mt-2">
        3. На нашем сайте, собраны вместе сразу все виды фурнитуры. Вы легко
        можете заказать любые необходимые детали для мебели в гостиную, кухню,
        ванную или спальную комнаты - от
        <a
          href="https://www.newfurnitura.ru/catalog/vidvizhnie_yashiki"
          target="_blank"
          style=""
          >систем выдвижных ящиков</a
        >
        и
        <a
          href="https://www.newfurnitura.ru/catalog/gaz_lifti"
          target="_blank"
          style=""
          >газлифтов</a
        >
        до
        <a
          href="https://www.newfurnitura.ru/catalog/shkafi_kupe"
          target="_blank"
          style=""
          >фурнитуры для шкафов-купе</a
        >
        и
        <a
          href="https://www.newfurnitura.ru/catalog/napravlyaushie_rolikovie"
          target="_blank"
          style=""
          >роликовых</a
        >,
        <a
          href="https://www.newfurnitura.ru/catalog/napravlyaushie_sharikovie"
          target="_blank"
          style=""
          >шариковых</a
        >
        и
        <a
          href="https://www.newfurnitura.ru/catalog/napravlyaushie"
          target="_blank"
          style=""
          >других направляющих для выдвижных ящиков</a
        >. В нашем интернет-магазине также широко представлена лицевая
        фурнитура.
        <a
          href="https://www.newfurnitura.ru/catalog/kruchki"
          target="_blank"
          style=""
          >Мебельные крючки</a
        >
        и
        <a
          href="https://www.newfurnitura.ru/catalog/ruchki "
          target="_blank"
          style=""
          >ручки</a
        >
      </section>

      <section class="mt-2">
        4. Мы имеем сеть магазинов в большинстве крупных городов России. Наши
        офисы открыты в Москве, Санкт-Петербурге, Новосибирске, Екатеринбурге,
        Ростове-на-Дону, Казани, Краснодаре. Также вы всегда можете приобрести
        нашу продукцию у наших партнеров в России, Казахстане, Белоруссии,
        Киргизии, Армении и Узбекистане.
      </section>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
const consola = require('consola')
export default {
  async asyncData({ store, app, params }) {
    // consola.info('44444444444444444444444444444444')
    let url = ''
    // if (store.state.showOverlay) {
    //   url = '/api/db_news'
    //   try {
    //     const rows = await app.$axios.$get(url)
    //     store.commit('setNewsRows', rows)
    //   } catch (e) {
    //     consola.info(e)
    //   } finally {
    //   }
    // }
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
