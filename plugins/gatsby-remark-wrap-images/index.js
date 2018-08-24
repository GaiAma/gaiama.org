const cheerio = require(`cheerio`)
const modifyChildren = require(`unist-util-modify-children`)
const fs = require(`fs`)

module.exports = ({ markdownAST }, pluginOptions) => {
  markdownAST.children
    .filter(x => x && x.children && x.children.length)
    .map(modifyChildren(modifier))

  return markdownAST
}

function modifier(node, index, parent) {
  if (parent.type !== `paragraph`) return false

  const whitespaceStripped = parent.children.filter(
    x => !/^(\\n)*\s+$/.test(x.value)
  )

  const onlyContainsImages = whitespaceStripped.every(
    x => x.type === `html` && x.value.includes(`gatsby-resp-image-figure`)
  )

  if (onlyContainsImages) {
    parent.type = `div`
    parent.data = {
      hProperties: {
        class: `inline-gallery`,
      },
    }
    parent.children.map(x => {
      const $ = cheerio.load(x.value)
      const imageWithRatio = $(`[data-ratio]`)
      if (imageWithRatio) {
        if (parent.children.length > 1) {
          imageWithRatio.css(`flex`, imageWithRatio.attr(`data-ratio`))
        }
        imageWithRatio.attr(`data-ratio`, null)
        x.value = $(`body`).html()
      }
    })
    parent.children = whitespaceStripped
  }

  return index + 1
}
