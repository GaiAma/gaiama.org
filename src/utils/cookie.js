import Cookies from 'js-cookie'

// const inOneYear = new Date(new Date().getTime() + 60 * 60 * 8760000)

export const setCookie = (key, data, options = {}) =>
  Cookies.set(key, data, { expires: 365, ...options })

export const getCookie = key => Cookies.get(key)

export const removeCookie = key => Cookies.remove(key)
