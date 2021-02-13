import _ from 'lodash'
import addresses from '@/assets/addresses.json'
import requisites from '@/assets/requisites.json'

export const state = () => ({
  addresses: addresses.address,
  requisites: requisites.requisite,
})

export const getters = {
  getByCity: (state) => (city) => {
    return _.filter(state.addresses, (v) => v.city === city)
  },
  getAllSortCity: (state) => {
    const list = _.sortBy(state.addresses, 'id')

    _.forEach(list, (v) => {
      v.phone_call = v.phone.replace(/[^0-9||+]/g, '')
    })

    return list
  },
  getAllSortCityExclMsc: (state) => {
    const list = _.sortBy(state.addresses, 'id')

    _.forEach(list, (v) => {
      v.phone_call = v.phone.replace(/[^0-9||+]/g, '')
    })

    list.shift()

    return list
  },
  getSchemaOrganization: (state) => {
    const list = _.sortBy(state.addresses, 'id')

    _.forEach(list, (v) => {
      v.phone_call = v.phone.replace(/[^0-9||+]/g, '')
    })

    list.shift()

    const deps = []

    list.forEach((item, i) => {
      deps.push({
        '@type': 'Organization',
        name: 'Мебельная Фурнитура Подрезково',
        image: ['https://www.newfurnitura.ru/upload/emblems/mf.png'],
        logo: 'https://www.newfurnitura.ru/upload/emblems/mf.png',
        telephone: item.phone,
        email: item.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: item.streetAddress,
          addressLocality: item.addressLocality,
          postalCode: item.postalCode,
          addressCountry: 'RU',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: item.coordinates[0],
          longitude: item.coordinates[1],
        },
      })
    })

    const json = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Мебельная Фурнитура Подрезково',
      image: ['https://www.newfurnitura.ru/upload/emblems/mf.png'],
      logo: 'https://www.newfurnitura.ru/upload/emblems/mf.png',
      telephone: state.addresses[0].phone,
      url: 'https://www.newfurnitura.ru/',
      email: 'mfc@newfurnitura.ru',
      address: {
        '@type': 'PostalAddress',
        streetAddress: state.addresses[0].streetAddress,
        addressLocality: state.addresses[0].addressLocality,
        postalCode: state.addresses[0].postalCode,
        addressCountry: 'RU',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 55.944334,
        longitude: 37.336009,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      department: deps,
    }

    return json
  },
}
