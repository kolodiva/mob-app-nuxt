const required = (propertyType, customErrorMessage) => {
  return (v) =>
    (v && v.length > 0) ||
    customErrorMessage ||
    `Вам необходимо внести ${propertyType}`
}
const minLength = (propertyType, minLength) => {
  return (v) => {
    if (!v) {
      return true
    }
    return (
      v.length >= minLength ||
      `Длина его должна быть как минимум ${minLength} символов.`
    )
  }
}
const maxLength = (propertyType, maxLength) => {
  return (v) =>
    (v && v.length <= maxLength) ||
    `${propertyType} must be less than ${maxLength} characters`
}

const emailFormat = () => {
  // const regex = new RegExp('/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,24})+$/')

  const regex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )

  return (v) => (v && regex.test(v)) || 'Формат адреса должен быть правильным.'
}

export default {
  required,
  minLength,
  maxLength,
  emailFormat,
}
