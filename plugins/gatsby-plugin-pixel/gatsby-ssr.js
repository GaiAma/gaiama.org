import React from 'react'

export const onRenderBody = ({ setPostBodyComponents }) =>
  setPostBodyComponents([
    <script
      key={'gatsby-plugin-pixel'}
      dangerouslySetInnerHTML={{ __html: `window.pixelStart=new Date()` }}
    />,
  ])
