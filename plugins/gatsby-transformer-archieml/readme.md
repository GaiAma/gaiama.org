{
  "name": "gatsby-transformer-aml",
  "version": "",
  "author": {
    "name": "Can Rau",
    "email": "cansrau@gmail.com"
  },
  "license": "MIT",
  "scripts": {
    "build": "babel src --out-dir .",
    "watch": "yarn build --watch"
  },
  "keywords": [
    "gatsby",
    "gatsby-plugin",
    "gatsby-transformer",
    "aml",
    "archieml",
    "archie markdown language"
  ],
  "babel": {
    "presets": [
      "@babel/preset-env"
    ],
    "plugins": [
      "@babel/plugin-proposal-object-rest-spread"
    ]
  },
  "files": [
    "index.js"
  ],
  "dependencies": {
    "archieml": "^0.4.2"
  },
  "devDependencies": {
    "@babel/cli": "^7.0.0-beta.42",
    "@babel/core": "^7.0.0-beta.42",
    "@babel/preset-env": "^7.0.0-beta.42"
  }
}
