<template>
  <div class="pa-5">
    <h3>Явите номенклатор господа...</h3>
    <ul>
      <li v-for="post of posts" :key="post.id">
        <a :href="post.guid_picture">{{ post.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  async asyncData({ app, params }) {
    // let url = `/api/db/${params.id}`
    const url = '/api/db'
    const row = await app.$axios.$get(url)

    return { posts: row }
  },
  data() {
    return { posts: [] }
  },
}
</script>

<!-- <template>
  <div>
    <v-treeview
      :items="items"
      :dense="dense"
      :selectable="selectable"
      :activatable="activatable"
      :hoverable="hoverable"
      :open-on-click="openOnClick"
      :selected-color="selectedColor"
      :color="color"
      :shaped="shaped"
      :rounded="rounded"
    ></v-treeview>
  </div>
</template>

<script>
export default {
  async asyncData({ app, params }) {
    // let url = `/api/db/${params.id}`
    const url = '/api/db'
    const row = await app.$axios.$get(url)

    return { items: row }
  },
  data: () => ({
    items: [
      {
        id: 1,
        name: 'Applications :',
      },
    ],
    dense: true,
    selectable: true,
    activatable: false,
    hoverable: true,
    openOnClick: true,
    shaped: false,
    rounded: true,
    color: 'primary',
    selectedColor: 'accent',
    selectedColors: ['accent', 'teal', 'red', 'success', 'warning lighten-2'],
  }),
}
</script> -->

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
