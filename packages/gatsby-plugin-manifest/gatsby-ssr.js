import React from 'react'
import { withPrefix } from 'gatsby'

export const onRenderBody = (
  { pathname = `/`, setHeadComponents },
  { icon, icons, start_url, theme_color }
) => {
  // If icons were generated, also add a favicon link.
  if (icon) {
    let favicon = `/icons/icon-48x48.png`

    // The icon path could be different in hybrid mode
    // this takes the first one of the possible icons
    if (icons && icons.length) {
      favicon = icons[0].src
    }

    setHeadComponents([
      <link
        key={`gatsby-plugin-manifest-icon-link`}
        rel="shortcut icon"
        href={withPrefix(favicon)}
      />,
    ])
  }

  const getLang = x => `${x}`.replace(/^\//, ``).split(`/`)[0]
  const getSuffix = x =>
    `_`.concat(x.map(getLang).find(x => x === getLang(pathname)))

  const manifestLink = Array.isArray(start_url) ? (
    <link
      key={`gatsby-plugin-manifest-link`}
      rel="manifest"
      href={withPrefix(`/manifest${getSuffix(start_url)}.webmanifest`)}
    />
  ) : (
    <link
      key={`gatsby-plugin-manifest-link`}
      rel="manifest"
      href={withPrefix(`/manifest.webmanifest`)}
    />
  )

  setHeadComponents([
    manifestLink,
    <meta
      key={`gatsby-plugin-manifest-meta`}
      name="theme-color"
      content={theme_color}
    />,
  ])
}
