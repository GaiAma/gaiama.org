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

const writeManifest = ({ language, ...manifest }) => {
  const suffix = language ? `_${language}` : ``
  fs.writeFileSync(
    path.join(`public`, `manifest${suffix}.webmanifest`),
    JSON.stringify(manifest)
  )
}

const makeManifest = ({ icon, ...manifest }) =>
  new Promise((resolve, reject) => {
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

    writeManifest(manifest)

    fs.writeFileSync(
      path.join(`public`, `browserconfig.xml`),
      `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <TileColor>${manifest.background_color}</TileColor>
            ${manifest.icons
              .map(x => {
                const { sizes, src } = x
                return `<square${sizes}logo src="/${src}?v=1"/>`
              })
              .join(`\n            `)}
        </tile>
    </msapplication>
</browserconfig>`
    )

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

exports.onPostBootstrap = (args, pluginOptions) =>
  new Promise((resolve, reject) => {
    delete pluginOptions.plugins

    if (Array.isArray(pluginOptions.manifests)) {
      Promise.all(pluginOptions.manifests.map(makeManifest))
        .then(resolve)
        .catch(resolve)
    } else {
      makeManifest(pluginOptions)
        .then(resolve)
        .catch(resolve)
    }
  })
