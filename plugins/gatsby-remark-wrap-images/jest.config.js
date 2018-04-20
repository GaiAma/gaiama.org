module.exports = {
  verbose: true,
  transform: {
    '.*': `<rootDir>/jest.transformer`,
  },
  testPathIgnorePatterns: [
    `/node_modules/`,
    `/.cache/`,
    `/public/`,
  ],
}
