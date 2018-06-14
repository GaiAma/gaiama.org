/* eslint-disable */
export default () => {
  if (typeof window !== `undefined`) {
    try {
      window.history.back()
    } catch (e) {}
  }
  return null
}
