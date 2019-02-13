import React from 'react'
import { withPrefix } from 'gatsby'

export const onRenderBody = (
  { pathname = `/`, setHeadComponents },
  pluginOptions
) => {
  let manifest = pluginOptions

  if (Array.isArray(pluginOptions.manifests)) {
    // manifest = pluginOptions.find(x => RegExp(x.pattern).test(pathname))
    manifest = pluginOptions.manifests.find(x =>
      RegExp(`^/${x.language}/.*`).test(pathname)
    )
  }

  if (!manifest) {
    return console.log(
      `missing manifest`,
      pathname,
      pluginOptions.manifests.find(x =>
        RegExp(`^/${x.language}/.*`).test(pathname)
      )
    )
  }

  const { icon, icons, theme_color, language } = manifest

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

  const manifestFilename = language
    ? `/manifest_${language}.webmanifest`
    : `/manifest.webmanifest`

  setHeadComponents([
    <link
      key={`gatsby-plugin-manifest-link`}
      rel="manifest"
      href={withPrefix(manifestFilename)}
    />,
    <meta
      key={`gatsby-plugin-manifest-meta`}
      name="theme-color"
      content={theme_color}
    />,
  ])

  return true
}
