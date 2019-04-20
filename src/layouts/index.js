/**
 * Passing data from Layout to Page / from Page to Layout
 * https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-layout
 */
import React from 'react'
import { MDXProvider } from '@mdx-js/react'
// import { VideoPlayer } from '@gaiama/react-video-player'
// import { TableOfContents } from "@gaiama/react-mdx-table-of-contents"

// if (process.env.DEBUG) {
//   const wDyr = require(`@welldone-software/why-did-you-render/dist/cjs/whyDidYouRender.js`)
//   wDyr(React)
// }

const Layout = ({ children }) => (
  <MDXProvider /*components={{ VideoPlayer }}*/>{children}</MDXProvider>
)

export default Layout
