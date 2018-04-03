/**
 * @prettier
 */
import archieml from 'archieml'
import crypto from 'crypto'
import path from 'path'
import _ from 'lodash'

export default async (
  { node, loadNodeContent, boundActionCreators },
  pluginOptions
) => {
  const { createNode, createParentChildLink } = boundActionCreators

  const languages = {
    markdown: `md`,
  }

  const defaults = {
    extension: `aml`,
    bodySeparator: `--body--`,
    bodyLanguage: languages.markdown,
  }

  const options = {
    ...defaults,
    pluginOptions,
  }

  // We only care about files with matching extension.
  if (node.extension !== options.extension) {
    return
  }

  const content = await loadNodeContent(node)
  let data = archieml.load(content, pluginOptions)

  // Convert date objects to string. Otherwise there's type mismatches
  // during inference as some dates are strings and others date objects.
  // if (data.data) {
  //   data.data = _.mapValues(data.data, v => {
  //     if (_.isDate(v)) {
  //       return v.toJSON()
  //     } else {
  //       return v
  //     }
  //   })
  // }

  const amlNode = {
    id: `${node.id} >>> ArchieML`,
    children: [],
    parent: node.id,
    internal: {
      content,
      // type: `ArchieML`,
      // type: _.upperFirst(_.camelCase(`${node.name} Aml`)),
      type: _.upperFirst(_.camelCase(`${path.basename(node.dir)} Aml`)),
    },
  }

  amlNode.frontmatter = {
    ...data,
    // _PARENT: node.id,
    // TODO Depreciate this at v2 as much larger chance of conflicting with a
    // user supplied field.
    // parent: node.id,
  }

  // amlNode.excerpt = data.excerpt

  const contentSeparatorRegex = new RegExp(options.bodySeparator, `i`)
  if (content.match(contentSeparatorRegex)) {
    const rawBody = content.split(options.bodySeparator)
    amlNode.rawBody = rawBody[1]

    // if (options.bodyLanguage === languages.markdown) {}
  }

  // Add path to the markdown file path
  if (node.internal.type === `File`) {
    amlNode.fileAbsolutePath = node.absolutePath
    amlNode.fileRelativePath = node.relativePath
  }

  amlNode.internal.contentDigest = crypto
    .createHash(`md5`)
    .update(JSON.stringify(amlNode))
    .digest(`hex`)

  createNode(amlNode)
  createParentChildLink({ parent: node, child: amlNode })
}
