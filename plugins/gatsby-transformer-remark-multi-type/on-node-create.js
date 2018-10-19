const crypto = require(`crypto`)
const grayMatter = require(`gray-matter`)
const _ = require(`lodash`)

module.exports = async function onCreateNode(
  { node, getNode, loadNodeContent, actions, createNodeId },
  { customizeType = () => ``, ...pluginOptions }
) {
  const { createNode, createParentChildLink } = actions

  // We only care about markdown content.
  if (
    node.internal.mediaType !== `text/markdown` &&
    node.internal.mediaType !== `text/x-markdown`
  ) {
    return
  }

  const content = await loadNodeContent(node)
  let data = grayMatter(content, pluginOptions)

  // Convert date objects to string. Otherwise there's type mismatches
  // during inference as some dates are strings and others date objects.
  if (data.data) {
    data.data = _.mapValues(data.data, v => {
      if (_.isDate(v)) {
        return v.toJSON()
      } else {
        return v
      }
    })
  }

  const frontmatter = {
    title: ``, // always include a title
    ...data.data,
    _PARENT: node.id,
  }

  const customType = customizeType({ ...node, frontmatter })
  const type = customType
    ? !`${customType}`.endsWith(`MarkdownRemark`)
      ? `${customType}MarkdownRemark`
      : customType
    : `MarkdownRemark`

  const markdownNode = {
    id: createNodeId(`${node.id} >>> MarkdownRemark`),
    children: [],
    parent: node.id,
    internal: {
      content: data.content,
      type,
      // :
      //   data.data && data.data.layout === `BlogPost`
      //     ? `MarkdownRemark`
      //     : node.relativePath && node.relativePath.includes(`newsletter`)
      //       ? `newsletterMarkdown`
      //       : _.upperFirst(_.camelCase(`${basename(node.dir)} Markdown`)),
    },
    frontmatter,
  }

  markdownNode.excerpt = data.excerpt
  markdownNode.rawMarkdownBody = data.content

  // Add path to the markdown file path
  if (node.internal.type === `File`) {
    markdownNode.fileAbsolutePath = node.absolutePath
  }

  markdownNode.internal.contentDigest = crypto
    .createHash(`md5`)
    .update(JSON.stringify(markdownNode))
    .digest(`hex`)

  createNode(markdownNode)
  createParentChildLink({ parent: node, child: markdownNode })
}
