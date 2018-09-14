/* global window, document */
const idToJumpTo = `main-nav`

const scrollToMenu = () => {
  const el = document.getElementById(idToJumpTo)
  if (el) return window.scrollTo(0, el.offsetTop - 20)
}

/**
 * fix custom scroll behaviour using __navigatingToLink declared in Link.js
 * by https://github.com/gatsbyjs/gatsby/issues/7454#issuecomment-415786239
 * as reach/router does not (yet) provide the used action for onRouteUpdate
 */
exports.shouldUpdateScroll = () => {
  if (window.__navigatingToLink === true) {
    return [0, 0]
  }
  return true
}

exports.onRouteUpdate = () => {
  window.setTimeout(scrollToMenu, 10)
  window.__navigatingToLink = false
}

// on scroll to top if no prevRouterProps
// exports.shouldUpdateScroll = ({ prevRouterProps }) => !prevRouterProps

// // redirect to menu if action = PUSH
// // and either no # at all or hash = idToJumpTo
// exports.onRouteUpdate = ({ action, location: { hash } }) => {
//   console.log(action, action === `PUSH` && (!hash || hash === `#${idToJumpTo}`))
//   if (action === `PUSH` && (!hash || hash === `#${idToJumpTo}`)) {
//     window.setTimeout(scrollToMenu, 10)
//   }
// }
