import { toast as T } from 'react-toastify'

export const toast = (message, opts) =>
  T(message, {
    ...opts,
    type: T.TYPE.DEFAULT,
  })

toast.info = (message, opts) =>
  T(message, {
    ...opts,
    type: T.TYPE.INFO,
  })

toast.success = (message, opts) =>
  T(message, {
    ...opts,
    type: T.TYPE.SUCCESS,
  })

toast.warning = (message, opts) =>
  T(message, {
    ...opts,
    type: T.TYPE.WARNING,
  })

toast.error = (message, opts) =>
  T(message, {
    autoClose: 25000,
    ...opts,
    type: T.TYPE.ERROR,
  })
