/* global window */
export default {
  getItem: (id, fallback = {}) => {
    if (typeof window === `undefined`) return fallback
    try {
      return JSON.parse(window.localStorage.getItem(id)) || fallback
    } catch (err) {
      return fallback
    }
  },
  setItem: (id, val, fallback = {}) => {
    if (typeof window === `undefined`) return fallback
    return window.localStorage.setItem(id, JSON.stringify(val))
  },
  removeItem: (id, fallback = {}) => {
    if (typeof window === `undefined`) return fallback
    return window.localStorage.removeItem(id)
  },
}
