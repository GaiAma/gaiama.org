/**
 * Passing data from Layout to Page / from Page to Layout
 * https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-layout
 */
import React from 'react'

// if (process.env.NODE_ENV !== `production`) {
//   const { whyDidYouUpdate } = require(`why-did-you-update`)
//   whyDidYouUpdate(React, {
//     collapseComponentGroups: false,
//     // include: [/^Input$/],
//   })
// }

const Layout = ({ children }) => children

export default Layout
