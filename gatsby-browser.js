// // // require(`babel-polyfill`)
// const idToJumpTo = `main-nav`

// /* eslint-disable */
// const scrollToMenu = () => {
//   const el = document.getElementById(idToJumpTo)
//   if (el) return window.scrollTo(0, el.offsetTop - 20)
// }

// // on scroll to top if no prevRouterProps
// exports.shouldUpdateScroll = ({ prevRouterProps }) => !prevRouterProps

// // redirect to menu if action = PUSH
// // and either no # at all or hash = idToJumpTo
// exports.onRouteUpdate = ({ action, location: { hash } }) => {
//   if (action === `PUSH` && (!hash || hash === `#${idToJumpTo}`)) {
//     window.setTimeout(scrollToMenu, 10)
//   }
// }
