/** @format */
import crypto from 'crypto'
import jsYaml from 'js-yaml'
import _ from 'lodash'

const onCreateNode = async ({ node, boundActionCreators, loadNodeContent }) => {
  if (node.internal.mediaType !== `text/yaml`) {
    return
  }

  function transformObject(obj, id, type) {
    const objStr = JSON.stringify(obj)
    const contentDigest = crypto
      .createHash(`md5`)
      .update(objStr)
      .digest(`hex`)
    const yamlNode = {
      ...obj,
      id,
      children: [],
      parent: node.id,
      internal: {
        contentDigest,
        type,
      },
    }
    yamlNode.relativePath = node.relativePath
    createNode(yamlNode)
    createParentChildLink({ parent: node, child: yamlNode })
  }

  const { createNode, createParentChildLink } = boundActionCreators

  const content = await loadNodeContent(node)
  const parsedContent = jsYaml.load(content)

  if (_.isArray(parsedContent)) {
    parsedContent.forEach((obj, i) => {
      transformObject(
        obj,
        obj.id ? obj.id : `${node.id} [${i}] >>> YAML`,
        _.upperFirst(_.camelCase(`${node.name} Yaml`))
      )
    })
  } else if (_.isPlainObject(parsedContent)) {
    transformObject(
      parsedContent,
      parsedContent.id ? parsedContent.id : `${node.id} >>> YAMLPages`,
      `yamlPages`
    )
  }
}

exports.onCreateNode = onCreateNode
