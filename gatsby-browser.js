/* global window */
import preval from 'babel-plugin-preval/macro'
const { version, bugs, branch } = preval`
  const { version, bugs } = require('./package.json')
  const branch = process.env.BRANCH || 'dev'
  module.exports = { version, bugs, branch }
`

// TODO: maybe improve on it https://github.com/gatsbyjs/gatsby/pull/11379/files
// window.dataLayer = window.dataLayer || []
// dataLayer.push({
//   GAIAMA_BRANCH: branch,
// })

try {
  window.GaiAma = {
    ...window.GaiAma,
    branch,
    version,
    bugTracker: bugs,
  }
  console.log(
    `%cWelcome to GaiAma.org version ${version}, you're on the ${branch} branch`,
    `font-size:13px;color:#056b4d;`
  )
  console.log(
    `%cFeel free to inspect everything, e.g. 'window.GaiAma'`,
    `color:green;`
  )
  console.log(
    `%cYou'll find the MIT licensed source code of the website at ${bugs.url.replace(
      `/issues`,
      ``
    )}`,
    `color:green;`
  )
  console.log(
    `%cIf you encounter anything unexpected, or have other feedback feel free to file an issue at ${bugs.url}/new?labels=ViaDevTools`,
    `color:#3a9a02;`
  )
  /* eslint-disable-next-line */
} catch (e) {}

export const shouldUpdateScroll = ({ prevRouterProps }) =>
  prevRouterProps && prevRouterProps.location ? `main-nav` : true

// implement https://github.com/bvaughn/react-error-boundary
// export const wrapRootElement = ({ element }) => {
//   return (
//     <ErrorBundary>
//       {element}
//     </ErrorBundary>
//   )
// }
