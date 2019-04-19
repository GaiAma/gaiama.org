const { join } = require(`path`)

// init shared store
const store = {
  feeds: {},
  homepage: require(`./package.json`).homepage,
  isProduction: !!process.env.GAIAMA_CONTENT_ID,
  publicDir: join(__dirname, `public`),
  redirects: require(`./redirects.js`),
  serveJson: require(`./serve.json`),
}

// define graphql types using createTypes
exports.sourceNodes = require(`./gatsby/sourceNodes`)(store)
// define graphql resolvers using createResolvers
exports.createResolvers = require(`./gatsby/createResolvers`)(store)

exports.onCreateNode = require(`./gatsby/onCreateNode`)(store)
exports.createPages = require(`./gatsby/createPages`)(store)
exports.onPostBuild = require(`./gatsby/onPostBuild`)(store)

exports.onCreateBabelConfig = require(`./gatsby/onCreateBabelConfig`)(store)
// exports.onCreateWebpackConfig = require(`./gatsby/onCreateWebpackConfig`)(store)
