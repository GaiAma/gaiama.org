module.exports = store =>
  function onCreateBabelConfig({ actions: { setBabelPlugin } }) {
    setBabelPlugin({ name: `@babel/plugin-proposal-optional-chaining` })
    setBabelPlugin({ name: `babel-plugin-transform-react-remove-prop-types` })
    setBabelPlugin({ name: `babel-plugin-console` })
    setBabelPlugin({
      name: `babel-plugin-transform-remove-console`,
      options: { exclude: [`log`] },
    })
  }
