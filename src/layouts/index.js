/**
 * Passing data from Layout to Page / from Page to Layout
 * https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-layout
 */
import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { Link } from '@components/Link'
import { DonateButton } from '@components/DonateButton'
import { Text } from '@theme-ui/components'
// import { VideoPlayer } from '@gaiama/react-video-player'
// import { TableOfContents } from "@gaiama/react-mdx-table-of-contents"

// if (process.env.DEBUG) {
//   const wDyr = require(`@welldone-software/why-did-you-render/dist/cjs/whyDidYouRender.js`)
//   wDyr(React)
// }

/* components={{ VideoPlayer }} */
const components = {
  a: Link,
  Link,
  DonateButton,
  Text,
}

const Layout = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
)

export default Layout
