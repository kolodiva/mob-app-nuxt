import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    state: {
      addresses: [
        {
          id: 1,
          city: 'Москва',
          phone: '+7 (495) 149-00-02',
          phone_call: '+74951490002',
        },
        {
          id: 2,
          city: 'Санкт-Петербург',
          phone: '+7 (812) 385-50-58',
          phone_call: '+78123855058',
        },
        {
          id: 3,
          city: 'Екатеринбург',
          phone: '+7 (343) 243-66-72',
          phone_call: '+73432436672',
        },
        {
          id: 4,
          city: 'Казань',
          phone: '+7 (843) 212-26-45',
          phone_call: '+78432122645',
        },
        {
          id: 5,
          city: 'Краснодар',
          phone: '+7 (861) 205-04-36',
          phone_call: '+78612050436',
        },
        {
          id: 6,
          city: 'Новосибирск',
          phone: '+7 (383) 388-47-02',
          phone_call: '+73833884702',
        },
        {
          id: 7,
          city: 'Ростов-на-Дону',
          phone: '+7 (863) 320-00-86',
          phone_call: '+78633200086',
        },
      ],
      headerName: 'Комплект',
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
      showOverlay: false,
      pdfFile: '/mf_komplekt_osoby_rezim_raboty.pdf',
    },
    mutations: {
      setHeaderName(state, value) {
        state.headerName = value
      },
      switchShowOverlay(state) {
        state.showOverlay = !state.showOverlay
      },
      setPdfFilePath(state, fileName) {
        state.pdfFile = fileName
      },
    },
  })

export default store
