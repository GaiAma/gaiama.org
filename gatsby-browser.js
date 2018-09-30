import preval from 'babel-plugin-preval/macro'
const { version, bugs } = preval`
  const { version, bugs } = require('./package.json')
  module.exports = { version, bugs }
`

try {
  /* global window */
  window.GaiAma = {
    ...window.GaiAma,
    version,
    bugTracker: bugs,
  }
  console.log(
    `%cWelcome to GaiAma.org version ${version}`,
    `font-size:13px;color:#01422e;`
  )
  console.log(
    `%cFeel free to inspect everything, e.g. 'window.GaiAma'`,
    `color:green;`
  )
  console.log(
    `%cIf you encounter anything unexpected, or have other feedback feel free to file an issue at ${
      bugs.url
    }`,
    `color:#3a9a02;`
  )
  /* eslint-disable-next-line */
} catch (e) {}

export const shouldUpdateScroll = ({ prevRouterProps }) =>
  prevRouterProps && prevRouterProps.location ? `main-nav` : true
