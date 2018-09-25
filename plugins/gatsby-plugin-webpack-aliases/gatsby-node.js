const { resolve } = require(`path`)

exports.onCreateWebpackConfig = ({ actions }, { aliases }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: Object.keys(aliases).reduce(
        (acc, key) =>
          Object.assign({}, acc, {
            [key]: resolve(aliases[key]),
          }),
        {}
      ),
    },
  })
}
