const { selectAll } = require(`unist-util-select`)
const path = require(`path`)
const isRelativeUrl = require(`is-relative-url`)
const _ = require(`lodash`)
const { sizes } = require(`gatsby-plugin-sharp`)
const Promise = require(`bluebird`)
const cheerio = require(`cheerio`)
const slash = require(`slash`)

// If the image is relative (not hosted elsewhere)
// 1. Find the image file
// 2. Find the image's size
// 3. Filter out any responsive image sizes that are greater than the image's width
// 4. Create the responsive images.
// 5. Set the html w/ aspect ratio helper.
module.exports = (
  { files, markdownNode, markdownAST, pathPrefix, getNode, reporter },
  pluginOptions
) => {
  const defaults = {
    maxWidth: 650,
    wrapperStyle: ``,
    backgroundColor: `white`,
    linkImagesToOriginal: true,
    showCaptions: false,
    addAspectRatio: false,
    pathPrefix,
  }

  const options = _.defaults(pluginOptions, defaults)

  // markdownAST = map(markdownAST, node => {
  //   if (
  //     node.type === `link` &&
  //     node.children &&
  //     node.children.length === 1 &&
  //     node.children[0].type === `image`
  //   ) {
  //     const { url, title } = node
  //     const image = node.children[0]
  //     return {
  //       type: image.type,
  //       title: image.title,
  //       url: image.url,
  //       alt: image.alt,
  //       position: image.position,
  //       href: url,
  //       hrefTitle: title,
  //     }
  //   }
  //   return node
  // })

  // // markdownAST.children = markdownAST.children.map()

  // console.log(`\n\nTHE_AST\n`)
  // console.log(JSON.stringify(markdownAST, null, 2))

  // This will only work for markdown syntax image tags
  const markdownImageNodes = selectAll(`image`, markdownAST)
  // console.log(`\nMARKDOWNIMAGENODES`)
  // console.log(markdownImageNodes)
  // This will also allow the use of html image tags
  const rawHtmlNodes = selectAll(`html`, markdownAST)

  // Takes a node and generates the needed images and then returns
  // the needed HTML replacement for the image
  const generateImagesAndUpdateNode = async function(node, resolve) {
    // Check if this markdownNode has a File parent. This plugin
    // won't work if the image isn't hosted locally.
    const parentNode = getNode(markdownNode.parent)
    let imagePath
    if (parentNode && parentNode.dir) {
      imagePath = slash(path.join(parentNode.dir, node.url))
    } else {
      return null
    }

    const imageNode = _.find(files, file => {
      if (file && file.absolutePath) {
        return file.absolutePath === imagePath
      }
      return null
    })

    if (!imageNode || !imageNode.absolutePath) {
      return resolve()
    }

    let responsiveSizesResult = await sizes({
      file: imageNode,
      args: options,
      reporter,
    })

    if (!responsiveSizesResult) {
      return resolve()
    }

    // Calculate the paddingBottom %
    const ratio = `${(1 / responsiveSizesResult.aspectRatio) * 100}%`

    const originalImg = responsiveSizesResult.originalImg
    const fallbackSrc = responsiveSizesResult.src
    const srcSet = responsiveSizesResult.srcSet
    const presentationWidth = responsiveSizesResult.presentationWidth

    // Generate default alt tag
    const srcSplit = node.url.split(`/`)
    const fileName = srcSplit[srcSplit.length - 1]
    const fileNameNoExt = fileName.replace(/\.[^/.]+$/, ``)
    const defaultAlt = fileNameNoExt.replace(/[^A-Z0-9]/gi, ` `)

    // TODO
    // Fade in images on load.
    // https://www.perpetual-beta.org/weblog/silky-smooth-image-loading.html

    // Construct new image node w/ aspect ratio placeholder
    let rawHTML = `
  <span
    class="gatsby-resp-image-wrapper"
    style="position: relative; display: block; ${
      options.wrapperStyle
    }; max-width: ${presentationWidth}px; margin-left: auto; margin-right: auto;"
  >
    <span
      class="gatsby-resp-image-background-image"
      style="padding-bottom: ${ratio}; position: relative; bottom: 0; left: 0; background-image: url('${
      responsiveSizesResult.base64
    }'); background-size: cover; display: block;"
    >
      <img
        class="gatsby-resp-image-image"
        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px ${
          options.backgroundColor
        };"
        alt="${node.alt ? node.alt : defaultAlt}"
        title="${node.title ? node.title : ``}"
        src="${fallbackSrc}"
        srcset="${srcSet}"
        sizes="${responsiveSizesResult.sizes}"
      />
    </span>
  </span>
  `

    // Make linking to original image optional.
    if (node.href || options.linkImagesToOriginal) {
      rawHTML = `
  <a
    class="gatsby-resp-image-link"
    href="${node.href || originalImg}"
    style="display: block"
    target="_blank"
    rel="noopener"
    title="${node.hrefTitle ? node.hrefTitle : ``}"
  >
  ${rawHTML}
  </a>
    `
    }

    // Wrap in figure and use title as caption

    if (options.showCaptions) {
      rawHTML = `
  <figure
    class="gatsby-resp-image-figure"
    ${
      options.addAspectRatio
        ? `data-ratio="${_.round(responsiveSizesResult.aspectRatio, 2)}"`
        : ``
    }
  >
  ${rawHTML}
  ${
    node.title
      ? `<figcaption class="gatsby-resp-image-figcaption">${
          node.title
        }</figcaption>`
      : ``
  }
  </figure>
      `
    }

    return rawHTML
  }

  return Promise.all(
    // Simple because there is no nesting in markdown
    markdownImageNodes.map(
      node =>
        new Promise(async (resolve, reject) => {
          const fileType = node.url.slice(-3)

          // Ignore gifs as we can't process them,
          // svgs as they are already responsive by definition
          if (
            isRelativeUrl(node.url) &&
            fileType !== `gif` &&
            fileType !== `svg`
          ) {
            const rawHTML = await generateImagesAndUpdateNode(node, resolve)

            if (rawHTML) {
              // Replace the image node with an inline HTML node.
              node.type = `html`
              node.value = rawHTML
            }
            return resolve(node)
          } else {
            // Image isn't relative so there's nothing for us to do.
            return resolve()
          }
        })
    )
  ).then(markdownImageNodes =>
    // HTML image node stuff
    Promise.all(
      // Complex because HTML nodes can contain multiple images
      rawHtmlNodes.map(
        node =>
          new Promise(async (resolve, reject) => {
            if (!node.value) {
              return resolve()
            }

            const $ = cheerio.load(node.value)
            if ($(`img`).length === 0) {
              // No img tags
              return resolve()
            }

            let imageRefs = []
            $(`img`).each(function() {
              imageRefs.push($(this))
            })

            for (let thisImg of imageRefs) {
              // Get the details we need.
              let formattedImgTag = {}
              formattedImgTag.url = thisImg.attr(`src`)
              formattedImgTag.title = thisImg.attr(`title`)
              formattedImgTag.alt = thisImg.attr(`alt`)

              if (!formattedImgTag.url) {
                return resolve()
              }

              const fileType = formattedImgTag.url.slice(-3)

              // Ignore gifs as we can't process them,
              // svgs as they are already responsive by definition
              if (
                isRelativeUrl(formattedImgTag.url) &&
                fileType !== `gif` &&
                fileType !== `svg`
              ) {
                const rawHTML = await generateImagesAndUpdateNode(
                  formattedImgTag,
                  resolve
                )

                if (rawHTML) {
                  // Replace the image string
                  thisImg.replaceWith(rawHTML)
                } else {
                  return resolve()
                }
              }
            }

            // Replace the image node with an inline HTML node.
            node.type = `html`
            node.value = $(`body`).html() // fix for cheerio v1

            return resolve(node)
          })
      )
    )
      .then(htmlImageNodes =>
        markdownImageNodes.concat(htmlImageNodes).filter(node => !!node)
      )
      .catch(error => {
        console.error(`\n`)
        console.error(`gatsby-remark-images-with-ratio`)
        console.error(error)
        console.error(`gatsby-remark-images-with-ratio`)
        console.error(`\n`)
      })
  )
}
