# gatsby-plugin-manifest

The web app manifest(part of the [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) specification) enabled by this plugin allows users to add your site to their home screen on most mobile browsers —
[see here](http://caniuse.com/#feat=web-app-manifest). The manifest provides configuration and icons to the phone.

This plugin provides several features beyond manifest configuration to make your life easier, they are:

- Auto icon generation - generates multiple icon sizes from a single source
- [Favicon support](https://www.w3.org/2005/10/howto-favicon)
- Legacy icon support (iOS)[^1]
- [Cache busting](https://www.keycdn.com/support/what-is-cache-busting)

Each of these features has extensive configuration available so you're always in control.

## Install

```
$ npm install --save gatsby-plugin-manifest
```

## How to use

### Add plugin and manifest settings - **Required**

```js
// in gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
      },
    },
  ],
}
```

If you're using this plugin together with [`gatsby-plugin-offline`](https://www.gatsbyjs.org/packages/gatsby-plugin-offline) (recommended),
this plugin should be listed _before_ the offline plugin so that it can cache
the created `manifest.webmanifest`.

For more information on configuring your web app [see here](https://developers.google.com/web/fundamentals/web-app-manifest/).

### Configure icons and their generations - **Required**

There are three modes in which icon generation can function: automatic, hybrid, and manual(disabled). These modes can affect other configurations defaults.

- Automatic - Generate a pre-configured set of icons from a single source icon.

  - Favicon - yes
  - Legacy icon support - yes
  - Cache busting - yes

- Hybrid - Generate a manually configured set of icons from a single source icon.

  - Favicon - yes
  - Legacy icon support - yes
  - Cache busting - yes

- Manual - Don't generate or pre-configure any icons.

  - Favicon - never
  - Legacy icon support - yes
  - Cache busting - never

- i18n - Generate separate versions for multiple languages

  - Supports all 3 modes

**_IMPORTANT:_** For best results, if you're providing an icon for generation it should be...

- ...at least as big as the largest icon being generated (512x512 by default).
- ...square (if it's not, transparent bars will add to make it square).
- ...of one of the follow formats: JPEG, PNG, WebP, TIFF, GIF or SVG.

#### Automatic mode configuration

Add the following line to the plugin options

```js
  icon: `src/images/icon.png`, // This path is relative to the root of the site.
```

Automatic mode is the easiest option for most people.

#### Hybrid mode configuration

Add the following line to the plugin options

```js
  icon: `src/images/icon.png`, // This path is relative to the root of the site.
  icons: [
    {
      src: `/favicons/android-chrome-192x192.png`,
      sizes: `192x192`,
      type: `image/png`,
    },
    {
      src: `/favicons/android-chrome-512x512.png`,
      sizes: `512x512`,
      type: `image/png`,
    },
  ], // Add or remove icon sizes as desired
```

If you want to include more or fewer sizes, then the hybrid option is for you. Like automatic mode, you include a high resolution icon from which to generate smaller icons. But unlike automatic mode, you provide the `icons` array config and icons are generated based on the sizes defined in your config. Here's an example `gatsby-config.js`:

The hybrid option allows the most flexibility while still not requiring you to create all icon sizes manually.

#### Manual mode configuration

Add the following line to the plugin options

```js
icons: [
  {
    src: `/favicons/android-chrome-192x192.png`,
    sizes: `192x192`,
    type: `image/png`,
  },
  {
    src: `/favicons/android-chrome-512x512.png`,
    sizes: `512x512`,
    type: `image/png`,
  },
], // Add or remove icon sizes as desired
```

In the manual mode, you are responsible for defining the entire web app manifest and providing the defined icons in the [static](https://www.gatsbyjs.org/docs/static-folder/) folder. Only icons you provide will be available. There is no automatic resizing done for you.

### i18n – Multilang configuration

```js
// in gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        manifests: [
          {
            name: `GatsbyJS`,
            short_name: `GatsbyJS`,
            start_url: `/de/`,
            regex: `^/de/.*`,
            language: `de`,
            background_color: `#f7f0eb`,
            theme_color: `#a2466c`,
            display: `standalone`,
          },
          {
            name: `GatsbyJS`,
            short_name: `GatsbyJS`,
            start_url: `/`,
            regex: `.*`,
            background_color: `#f7f0eb`,
            theme_color: `#a2466c`,
            display: `standalone`,
          },
        ],
      },
    },
  ],
}
```

You can add as many languages as you want, as well as mix and match auto, hybrid & manual icon modes.
Use basic composition like `Object.assign` or `rest/spread` operator (if supported by your Node version) to merge in shared configs so you don't have to repeat yourself. The above example could be written as:

```js
// in gatsby-config.js
const sharedManifestOptions = {
  name: `GatsbyJS`,
  short_name: `GatsbyJS`,
  background_color: `#f7f0eb`,
  theme_color: `#a2466c`,
  display: `standalone`,
}
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        manifests: [
          Object.assign({}, sharedManifestOptions, {
            start_url: `/de/`,
            regex: `^/de/.*`,
            language: `de`,
          }),
          Object.assign({}, sharedManifestOptions, {
            start_url: `/`,
            regex: `.*`,
          }),
        ],
      },
    },
  ],
}
```

Make sure the default language comes last.
You don't have to specify a "default" language though, all pathes can start with a language, or you can tweak the regex to match whatever part of the `pathname` you like.

### Feature configuration - **Optional**

#### Iterative icon options

The `icon_options` object may be used to iteratively add configuration items to the `icons` array. Any options included in this object will be merged with each object of the `icons` array (custom or default). Key value pairs already in the `icons` array will take precedence over duplicate items in the `icon_options` array.

`icon_options` may be used as follows:

```js
// in gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/images/icon.png`,
        icon_options: {
          // For all the options available, please see:
          // https://developer.mozilla.org/en-US/docs/Web/Manifest
          // https://w3c.github.io/manifest/#purpose-member
          purpose: `maskable`,
        },
      },
    },
  ],
}
```

#### Disable legacy icons

iOS 11.3 added support for the web app manifest spec. Previous iOS versions won't recognize the icons defined in the webmanifest and the creation of `apple-touch-icon` links in `<head>` is needed. This plugin creates them by default. If you don't want those icons to be generated you can set the `legacy` option to `false` in plugin configuration:

```js
// in gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/images/icon.png`,
        legacy: false, // this will not add apple-touch-icon links to <head>
      },
    },
  ],
}
```

#### Disable favicon

Excludes `<link rel="shortcut icon" href="/favicon.png" />` link tag to html output. You can set `include_favicon` plugin option to `false` to opt-out of this behavior.

```js
// in gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
        include_favicon: false, // This will exclude favicon link tag
      },
    },
  ],
}
```

#### Disable or configure "[cache busting](https://www.keycdn.com/support/what-is-cache-busting)"

Cache Busting allows your updated icon to be quickly/easily visible to your sites visitors. HTTP caches could otherwise keep an old icon around for days and weeks. Cache busting can only done in 'automatic' and 'hybrid' modes.

Cache busting works by calculating a unique "digest" of the provided icon and modifying links or file names of generated images with that unique digest. If you ever update your icon, the digest will change and caches will be busted.

**Options:**

- **\`query\`** - This is the default mode. File names are unmodified but a URL query is appended to all links. e.g. `icons/icon-48x48.png?digest=abc123`

- **\`name\`** - Changes the cache busting mode to be done by file name. File names and links are modified with the icon digest. e.g. `icons/icon-48x48-abc123.png` (only needed if your CDN does not support URL query based cache busting)

- **\`none\`** - Disables cache busting. File names and links remain unmodified.

```js
// in gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/images/icon.png`,
        cache_busting_mode: `none`, // `query`(default), `name`, or `none`
      },
    },
  ],
}
```

#### Remove `theme-color` meta tag

By default a `<meta content={theme_color} name="theme-color" />` tag is inserted into the html output. This can be problematic if you want to programmatically control that tag (e.g. when implementing light/dark themes in your project). You can set `theme_color_in_head` plugin option to `false` to opt-out of this behavior.

```js
// in gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/images/icon.png`,
        theme_color_in_head: false, // This will avoid adding theme-color meta tag.
      },
    },
  ],
}
```

#### Enable CORS using `crossorigin` attribute

Add a `crossorigin` attribute to the manifest `<link rel="manifest" crossorigin="use-credentials" href="/manifest.webmanifest" />` link tag.

You can set `crossOrigin` plugin option to `'use-credentials'` to enable sharing resources via cookies. Any invalid keyword or empty string will fallback to `'anonymous'`.

You can find more information about `crossorigin` on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes).

```js
// in gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/images/icon.png`,
        crossOrigin: `use-credentials`, // `use-credentials` or `anonymous`
      },
    },
  ],
}
```

## Appendices

Additional information that may be interesting or valuable.

### Default icon config

When in automatic mode the following json array is injected into the manifest configuration you provide and the icons are generated from it.

```json
[
  {
    "src": "icons/icon-48x48.png",
    "sizes": "48x48",
    "type": "image/png"
  },
  {
    "src": "icons/icon-72x72.png",
    "sizes": "72x72",
    "type": "image/png"
  },
  {
    "src": "icons/icon-96x96.png",
    "sizes": "96x96",
    "type": "image/png"
  },
  {
    "src": "icons/icon-144x144.png",
    "sizes": "144x144",
    "type": "image/png"
  },
  {
    "src": "icons/icon-192x192.png",
    "sizes": "192x192",
    "type": "image/png"
  },
  {
    "src": "icons/icon-256x256.png",
    "sizes": "256x256",
    "type": "image/png"
  },
  {
    "src": "icons/icon-384x384.png",
    "sizes": "384x384",
    "type": "image/png"
  },
  {
    "src": "icons/icon-512x512.png",
    "sizes": "512x512",
    "type": "image/png"
  }
]
```

### Legacy icon support coverage

Currently this feature only covers older versions of [iOS Safari](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html).

Internet Explorer is the only other major browser that doesn't support the web app manifest, and it's market share is so small no one has contributed support.

### Additional resources

This article from the Chrome DevRel team is a good intro to the web app
manifest—https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/

For more information see the w3 spec https://www.w3.org/TR/appmanifest/ or Mozilla docs https://developer.mozilla.org/en-US/docs/Web/Manifest.
