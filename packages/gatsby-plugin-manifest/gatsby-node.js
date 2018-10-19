const fs = require(`fs`)
const path = require(`path`)
const Promise = require(`bluebird`)
const sharp = require(`sharp`)
const { defaultIcons, doesIconExist } = require(`./common.js`)

sharp.simd(true)

function generateIcons(icons, srcIcon) {
  return Promise.map(icons, icon => {
    const size = parseInt(icon.sizes.substring(0, icon.sizes.lastIndexOf(`x`)))
    const imgPath = path.join(`public`, icon.src)

    return sharp(srcIcon)
      .resize(size)
      .toFile(imgPath)
      .then(() => {})
  })
}

const writeManifest = ({ manifest, lang }) => {
  const suffix = lang ? `_${lang}` : ``
  fs.writeFileSync(
    path.join(`public`, `manifest${suffix}.webmanifest`),
    JSON.stringify(manifest)
  )
}

exports.onPostBootstrap = (args, pluginOptions) =>
  new Promise((resolve, reject) => {
    const { icon } = pluginOptions
    const manifest = { ...pluginOptions }

    // Delete options we won't pass to the manifest.webmanifest.
    delete manifest.plugins
    delete manifest.icon

    // If icons are not manually defined, use the default icon set.
    if (!manifest.icons) {
      manifest.icons = defaultIcons
    }

    // Determine destination path for icons.
    const iconPath = path.join(`public`, path.dirname(manifest.icons[0].src))

    //create destination directory if it doesn't exist
    if (!fs.existsSync(iconPath)) {
      fs.mkdirSync(iconPath)
    }

    if (Array.isArray(manifest.start_url)) {
      const { start_url, ..._manifest } = manifest
      start_url.map(x =>
        writeManifest({
          manifest: {
            ..._manifest,
            start_url: x,
          },
          lang: x.replace(/^\//, ``).split(`/`)[0],
        })
      )
    } else {
      writeManifest({ manifest })
    }

    // Only auto-generate icons if a src icon is defined.
    if (icon !== undefined) {
      // Check if the icon exists
      if (!doesIconExist(icon)) {
        reject(
          `icon (${icon}) does not exist as defined in gatsby-config.js. Make sure the file exists relative to the root of the site.`
        )
      }
      generateIcons(manifest.icons, icon).then(() => {
        //images have been generated
        console.log(`done generating icons for manifest`)
        resolve()
      })
    } else {
      resolve()
    }
  })
