module.exports = require(`babel-jest`).createTransformer({
  presets: [
    [
      `@babel/preset-env`,
      {
        targets: {
          node: `current`,
        },
      },
    ],
    `@babel/preset-react`,
  ],
})
