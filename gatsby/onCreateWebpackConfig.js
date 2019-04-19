const { join } = require(`path`)

module.exports = store =>
  function onCreateWebpackConfig({ actions, stage }) {
    actions.setWebpackConfig({
      resolve: {
        modules: [
          join(__dirname, `..`),
          join(__dirname, `..`, `src`),
          join(`..`, `node_modules`),
        ],
      },
    })
  }
