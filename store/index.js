import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    state: {
      headerName: 'Комплект',
      showOverlay: false,
      pdfFile: '/mf_komplekt_osoby_rezim_raboty.pdf',
      addresses: [
        {
          id: 1,
          city: 'Москва',
          phone: '+7 (495) 149-00-02',
          phone_call: '+74951490002',
          address:
            'Московская Область, г. Химки, мкр. Подрезково, ул. Центральная, д. 2/5',
        },
        {
          id: 2,
          city: 'Санкт-Петербург',
          phone: '+7 (812) 385-50-58',
          phone_call: '+78123855058',
          address: 'г. Санкт-Петербург, просп. Маршала Блюхера, д.78Д, оф.8',
        },
        {
          id: 3,
          city: 'Екатеринбург',
          phone: '+7 (343) 243-66-72',
          phone_call: '+73432436672',
          address: 'г. Екатеринбург, ул. Предельная, д. 57/3 оф. 209',
        },
        {
          id: 4,
          city: 'Казань',
          phone: '+7 (843) 212-26-45',
          phone_call: '+78432122645',
          address: 'г. Казань, ул. Гассара, д. 14',
        },
        {
          id: 5,
          city: 'Краснодар',
          phone: '+7 (861) 205-04-36',
          phone_call: '+78612050436',
          address: 'г. Краснодар, ул. Московская, д. 91/3',
        },
        {
          id: 6,
          city: 'Новосибирск',
          phone: '+7 (383) 388-47-02',
          phone_call: '+73833884702',
          address: 'г. Новосибирск, ул. Мира, д. 54а, корп. 1',
        },
        {
          id: 7,
          city: 'Ростов-на-Дону',
          phone: '+7 (863) 320-00-86',
          phone_call: '+78633200086',
          address: 'г. Ростов-на-Дону, ул. Орская, д. 31м',
        },
      ],
      nomenklators: [
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
      ],
      news: [
        {
          pic: '/baner_korona_mob.jpg',
          pdf: '/mf_komplekt_osoby_rezim_raboty.pdf',
          height: '60%',
        },
      ],
    },
    mutations: {
      setHeaderName(state, value) {
        state.headerName = value
      },
      switchShowOverlay(state) {
        state.showOverlay = !state.showOverlay
      },
      switchShowOverlayOff(state) {
        state.showOverlay = false
      },
      setPdfFilePath(state, fileName) {
        state.pdfFile = fileName
      },
      setNewsRows(state, rows) {
        state.news = rows
      },
    },
  })

export default store
