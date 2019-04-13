const modifyChildren = require(`unist-util-modify-children`)

module.exports = ({ markdownAST }, pluginOptions) => {
  markdownAST.children
    .filter(x => x && x.children && x.children.length)
    .map(modifyChildren(modifier))

  return markdownAST
}

function modifier(node, index, parent) {
  if (parent.type !== `paragraph`) return false

  const whitespaceStripped = parent.children.filter(
    x => !/^(\\n)*\s+$/.test(x.value) && x.type !== `image` // `type!=image` quick fix for some images not being transformed
  )

  const onlyContainsImages = whitespaceStripped.every(
    x => x.type === `html` && x.value.includes(`gatsby-resp-image-figure`)
  )

  /**
   * Debugging help
   */
  //   // parent.children.find(
  //   //   x => x && x.value && x.value.includes(`IMG_9004`)
  //   // ) &&
  //   require(`fs`).writeFile(
  //     `./InlineGallery.log`,
  //     `\n\n
  // [[parent.children]]:\n
  // ${JSON.stringify(parent.children, null, 2)}
  // \n
  // [[whitespaceStripped]]:\n
  // ${JSON.stringify(whitespaceStripped, null, 2)}
  // [[onlyContainsImages]]:${JSON.stringify(onlyContainsImages, null, 2)}
  //     \n\n`,
  //     { flag: `a` },
  //     err => err && console.log(err)
  //   )

  if (onlyContainsImages) {
    parent.type = `div`
    parent.data = {
      hProperties: {
        class: `inline-gallery`,
      },
    }
    parent.children = whitespaceStripped
  }

  return index + 1
}
