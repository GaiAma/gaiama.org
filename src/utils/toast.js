import { toast as toastify } from 'react-toastify'

export const toast = (message, opts) =>
  toastify(message, {
    ...opts,
    type: toastify.TYPE.DEFAULT,
  })

toast.info = (message, opts) =>
  toastify(message, {
    ...opts,
    type: toastify.TYPE.INFO,
  })

toast.success = (message, opts) =>
  toastify(message, {
    ...opts,
    type: toastify.TYPE.SUCCESS,
  })

toast.warning = (message, opts) =>
  toastify(message, {
    ...opts,
    type: toastify.TYPE.WARNING,
  })

toast.error = (message, opts) =>
  toastify(message, {
    autoClose: 25000,
    ...opts,
    type: toastify.TYPE.ERROR,
  })

toast.POSITION = toastify.POSITION
