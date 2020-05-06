// const consola = require('consola')

export const getData = async function (url, axios) {
  const response = await axios.$get(url)

  // consola.info(response.data)
  return {
    data: response.data,
  }
}
