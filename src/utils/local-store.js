/* global window */
export default {
  getItem: id => {
    if (typeof window === `undefined`) return {}
    try {
      return JSON.parse(window.localStorage.getItem(id))
    } catch (err) {
      return {}
    }
  },
  setItem: (id, val) => {
    if (typeof window === `undefined`) return {}
    return window.localStorage.setItem(id, JSON.stringify(val))
  },
  removeItem: id => {
    if (typeof window === `undefined`) return {}
    return window.localStorage.removeItem(id)
  },
}
