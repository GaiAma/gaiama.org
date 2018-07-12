const path = require(`path`)

exports.onCreateWebpackConfig = ({ config, stage }, { aliases }) => {
  Object.keys(aliases).forEach(key => {
    config.merge({
      resolve: {
        alias: {
          [key]: path.resolve(aliases[key]),
        },
      },
    })
  })
}
