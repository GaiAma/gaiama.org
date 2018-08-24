const { resolve } = require(`path`)

exports.onCreateWebpackConfig = ({ actions, stage }, { aliases }) => {
  // if (stage !== `build-javascript`) return
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
