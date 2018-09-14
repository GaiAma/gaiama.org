/* global window, document */
const idToJumpTo = `main-nav`

const scrollToMenu = () => {
  const el = document.getElementById(idToJumpTo)
  if (el) return window.scrollTo(0, el.offsetTop - 20)
  return false
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
  if (window.__navigatingToLink === true) {
    window.setTimeout(scrollToMenu, 10)
  }
  window.__navigatingToLink = false
}

