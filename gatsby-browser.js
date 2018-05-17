import 'babel-polyfill'

/* eslint-disable */
exports.onRouteUpdate = ({ action, location }) => {
  const scrollToMenu = () => {
    const el = document.querySelector(`#main-nav`)
    if (!el) return
    const { top } = el.getBoundingClientRect()
    window.scrollTo(0, top - 20)
  }

  if (action === `PUSH` && !location.search) {
    window.setTimeout(scrollToMenu, 1)
  }
}
