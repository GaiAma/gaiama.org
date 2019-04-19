const { GraphQLInt } = require(`gatsby/graphql`)
const { getRemainingSuggestions, isPost } = require(`./helpers`)

// based on https://github.com/gatsbyjs/gatsby/blob/master/examples/using-type-definitions/gatsby-node.js#L63
module.exports = store =>
  function createResolvers({ createResolvers }) {
    createResolvers({
      Mdx: {
        suggested: {
          type: `[Mdx!]!`,
          args: {
            count: GraphQLInt,
          },
          resolve(source, { count }, { nodeModel }, info) {
            const result = nodeModel.getAllNodes({ type: `Mdx` })
            const posts = result.filter(n => isPost(n))
            return getRemainingSuggestions(source.frontmatter.id, count)(posts)
            // return getSuggestedNodes(posts, source, count)
          },
        },
        older: {
          type: `Mdx`,
          resolve(source, _, { nodeModel }) {
            const result = nodeModel.getAllNodes({ type: `Mdx` })
            const posts = result.filter(n => isPost(n))
            const index = posts.findIndex(n => n.id === source.id)
            const older = posts[index + 1]
            return older && older.id ? older : null
          },
        },
        newer: {
          type: `Mdx`,
          resolve(source, _, { nodeModel }) {
            const result = nodeModel.getAllNodes({ type: `Mdx` })
            const posts = result.filter(n => isPost(n))
            const index = posts.findIndex(n => n.id === source.id)
            const newer = posts[index - 1]
            return newer && newer.id ? newer : null
          },
        },
      },
    })
  }
