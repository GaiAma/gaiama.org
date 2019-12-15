const modifyChildren = require(`unist-util-modify-children`)

module.exports = ({ markdownAST }, pluginOptions) => {
  markdownAST.children
    .filter(x => x && x.children && x.children.length)
    .map(modifyChildren(modifier))

  return markdownAST
}

const containsGatsbyImage = x => /(gatsby-resp-image-)[figure|wrapper]/.test(x)

const containsOnlyWhitespace = x => /^(\\n)*\s+$/.test(x)

function modifier(node, index, parent) {
  if (parent.type !== `paragraph`) return false

  const whitespaceStripped = parent.children.filter(
    x => !containsOnlyWhitespace(x.value)
  )

  const onlyContainsImages = whitespaceStripped.every(
    x =>
      (x.type === `html` && containsGatsbyImage(x.value)) ||
      (x.type === `link` && x.children.find(y => containsGatsbyImage(y.value)))
  )

  // Debugging help
  // const debugContent = `\n\n
  // [[parent.children]]:\n
  // ${JSON.stringify(parent.children, null, 2)}
  // \n
  // [[whitespaceStripped]]:\n
  // ${JSON.stringify(whitespaceStripped, null, 2)}
  // [[onlyContainsImages]]:${JSON.stringify(onlyContainsImages, null, 2)}
  //     \n\n`
  // // parent.children.find(x => x && x.value && x.value.includes(`EvaDieBand`)) &&
  // require(`fs`).writeFile(
  //   `./InlineGallery.log`,
  //   debugContent,
  //   { flag: `a` },
  //   err => err && console.log(err)
  // )
  // End Debugger

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
