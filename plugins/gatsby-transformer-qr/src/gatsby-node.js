import { createWriteStream } from 'fs'
// import crypto from 'crypto'
import { join } from 'path'
import get from 'lodash/get'
import merge from 'lodash/merge'
import cuid from 'cuid'
import makeDir from 'make-dir'
import qr from 'qr-image'

const defaultOptions = {
  extension: `svg`,
  filenameProp: `frontmatter.id`,
  path: `frontmatter.__transformers`,
}

async function onCreateNode({ node, boundActionCreators }, pluginOptions) {
  const {
    extension,
    dir,
    filenameProp,
    textProp,
    path,
    validValues,
  } = merge(defaultOptions, pluginOptions)

  /**
   * continue only of validValues provided and path exists with valid value
   * or if node contains __transformers key in path or `frontmatter` and includes `QR`
   */
  if (
    (validValues && !validValues.includes(get(node, path, ``))) &&
    !get(node, path, ``).split(`,`).includes(`QR`)
  ) {
    return
  }

  // const { createNode, createParentChildLink } = boundActionCreators
  const id = cuid()
  const filename = `${get(node, filenameProp, id)}.${extension}`
  let absolutePath = ``
  
  // save to disk only if dir provided
  if (dir) {
    // ensure dir exists
    absolutePath = join(dir, filename)
    await makeDir(dir)
  }

  // const qrNode = {
  //   id: `${node.id} >>> QR`,
  //   parent: node.id,
  //   children: [],
  //   internal: {
  //     type: `QR`,
  //   },
  // }

  // qrNode.qrSVG = {
  //   id,
  //   extension,
  //   absolutePath,
  //   [extension]: qr.imageSync(get(node, textProp), { type: extension }),
  // }

  if (absolutePath) {
    await qr.image(get(node, textProp), { type: extension })
      .pipe(createWriteStream(absolutePath))
  }

  // qrNode.internal.contentDigest = crypto
  //   .createHash(`md5`)
  //   .update(JSON.stringify(qrNode))
  //   .digest(`hex`)

  // createNode(qrNode)

  // createParentChildLink({
  //   parent: node,
  //   child: qrNode,
  // })
}

exports.onCreateNode = onCreateNode
