// module.exports = {
//   parser: 'babel-eslint',
//   env: {
//     browser: true,
//     es6: true,
//   },
//   plugins: ['react'],
//   globals: {
//     graphql: false,
//   },
//   parserOptions: {
//     ecmaVersion: 2016,
//     sourceType: 'module',
//     ecmaFeatures: {
//       experimentalObjectRestSpread: true,
//       jsx: true,
//     },
//   },
// }
module.exports = {
  parser: 'babel-eslint',
  extends: [
    'google',
    'eslint:recommended',
    'plugin:flowtype/recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['flowtype', 'react', 'jsx-a11y'],
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  globals: {
    spyOn: true,
    graphql: false,
  },
  settings: {
    react: {
      version: '16.5',
    },
  },
  rules: {
    'no-console': 'off',
    'no-inner-declarations': 'off',
    'valid-jsdoc': 'off',
    'require-jsdoc': 'off',
    quotes: [
      'error',
      'backtick',
      {
        avoidEscape: true,
      },
    ],
    'consistent-return': ['error'],
    'arrow-body-style': ['error', 'as-needed'],
    'jsx-quotes': ['error', 'prefer-double'],
    semi: ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'no-magic-numbers': ['error', 'always'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'react/prop-types': [
      'error',
      {
        ignore: ['children'],
      },
    ],
    'jsx-a11y/label-has-for': [
      2,
      {
        allowChildren: true,
      },
    ],
  },
  overrides: [
    {
      files: [
        'packages/**/gatsby-browser.js',
        'packages/gatsby/cache-dir/**/*',
      ],
      env: {
        browser: true,
      },
      globals: {
        ___loader: false,
        ___emitter: false,
      },
    },
  ],
}
