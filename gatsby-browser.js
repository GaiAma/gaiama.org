/* eslint-disable */
exports.onRouteUpdate = ({ action, location }) => {
  const scrollToMenu = () => {
    const el = document.querySelector(`#site-navigation`)
    if (!el) return
    const { top } = el.getBoundingClientRect()
    window.scrollTo(0, top)
  }

  if (action === `PUSH` && !location.search) {
    window.setTimeout(scrollToMenu, 1)
  }
}
