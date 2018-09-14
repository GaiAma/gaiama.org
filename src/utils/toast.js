import { toast as toastify } from 'react-toastify'

export const toast = message =>
  toastify(message, {
    type: toastify.TYPE.DEFAULT,
  })

toast.info = message =>
  toastify(message, {
    type: toastify.TYPE.INFO,
  })

toast.success = message =>
  toastify(message, {
    type: toastify.TYPE.SUCCESS,
  })

toast.warning = message =>
  toastify(message, {
    type: toastify.TYPE.WARNING,
  })

toast.error = message =>
  toastify(message, {
    type: toastify.TYPE.ERROR,
  })
