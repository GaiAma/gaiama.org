// // require(`babel-polyfill`)

// prevent gatsby from scrolling to top
// if no hash included and action = push
exports.shouldUpdateScroll = ({ pathname, prevRouterProps }) =>
  pathname.includes(`#`) ||
  (prevRouterProps && prevRouterProps.history.action !== `PUSH`)

/* eslint-disable */
const scrollToMenu = () => {
  const el = document.getElementById(`main-nav`)
  if (!el) return
  return window.scrollTo(0, el.offsetTop - 20)
}

exports.onRouteUpdate = ({ action, location }) => {
  if (action === `PUSH` && !location.search && !location.hash) {
    window.setTimeout(scrollToMenu, 10)
  }
}
