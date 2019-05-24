<p align="center">
  <a href="https://www.gaiama.org/"><img src="src/assets/Kies-Logo-Round_small.png"></a>
</p>

<h1 align="center"><a href="https://www.gaiama.org" title="GaiAma.org">GaiAma.org</a><br>
<small>Making rainforests cool again</small>
</h1>

<p align="center"><img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/GaiAma/gaiama.org.svg?style=for-the-badge"></p>

<p align="center">
  <a href="https://donate.gaiama.org/" title="Donate to help us protect more rainforest from being destroyed"><img src="https://img.shields.io/badge/$-support-green.svg"></a>
  <!-- <a href="https://www.gatsbyjs.org" title="Hosted on Netlify"><img src="https://img.shields.io/badge/gatsby-v2-%23663399.svg"/></a> -->
  <a href="#contributors" title="All Contributors"><img src="https://img.shields.io/badge/all_contributors-3-orange.svg"></a>
  <a href="http://makeapullrequest.com/" title="PRs Welcome"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a>
  <!-- <a href="https://david-dm.org/GaiAma/gaiama.org" title="dependencies status"><img src="https://david-dm.org/GaiAma/gaiama.org/status.svg"/></a>
  <a href="https://david-dm.org/GaiAma/gaiama.org?type=dev" title="devDependencies status"><img src="https://david-dm.org/GaiAma/gaiama.org/dev-status.svg"/></a> -->
  <!-- <a href="https://www.netlify.com" title="Frontend hosted on Netlify"><img src="https://img.shields.io/badge/front--end-netlify-%2300b09f.svg"/></a> -->
  <a href="https://www.netlify.com" title="Frontend hosted on Netlify"><img src="https://api.netlify.com/api/v1/badges/8ddceeca-03c4-4027-89e3-e9c98cb03f73/deploy-status" alt="Netlify Status"/></a>
  <a href="https://m.do.co/c/bcef7e4dac88" title="Backend services hosted on DigitalOcean"><img src="https://img.shields.io/badge/back--end-digitalocean-%230069ff.svg"/></a>
  <a href="https://nodejs.org" title="Node.js 10.10"><img src="https://img.shields.io/badge/node.js-10.10-%23026e00.svg"/></a>
</p>

<p align="center">
  <a title="Static Site Generator: GatsbyJS" href="https://www.gatsbyjs.org" target="_blank"><img src="https://www.gaiama.org/gatsby_logo.svg" width="40" alt="GatsbyJS Logo"></a> <a title="Hoster: Netlify" href="https://www.netlify.com" target="_blank"><img src="https://www.gaiama.org/netlify_logo.svg" width="40" alt="Netlify Logo"></a> <a title="Server: DigitalOcean" href="https://m.do.co/c/bcef7e4dac88" target="_blank"><img src="https://www.gaiama.org/digitalocean_logo.svg" width="40" alt="DigitalOcean Logo"></a>
<!-- ![GatsbyJS](https://img.shields.io/badge/dynamic/json.svg?color=%23663399&label=GatsbyJS&prefix=v&query=%24.dependencies.gatsby&url=https%3A%2F%2Fraw.githubusercontent.com%2FGaiAma%2Fgaiama.org%2Fmaster%2Fpackage.json) -->
</p>

## Features

- [Netlify](https://www.netlify.com/): front-end hosting
- [DigitalOcean](https://m.do.co/c/bcef7e4dac88): back-end hosting
- [GatsbyJS](https://www.gatsbyjs.org/)
- [Emotion](https://emotion.sh/) for styling
- [Node.js 10.10](https://nodejs.org/en/)
- [MDX](https://github.com/ChristopherBiscardi/gatsby-mdx)
- [Changelog](CHANGELOG.md)
- [I18n: Auto discover & link translations](gatsby/createPages.js#L47-L80)
- [Pager: older / newer article](gatsby/createResolvers.js#L21-L40)
- [related articles](gatsby/createResolvers.js#L9-L20) auto suggested
- [react-toastify](https://github.com/fkhadra/react-toastify)
- [babel-plugin-preval](https://github.com/kentcdodds/babel-plugin-preval): pre-evaluate color conversions in [theme.js](src/theme.js)
- [Offline support](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-offline#readme)
- [gatsby-image](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-image#readme) and [gatsby-remark-images](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-images#readme) for responsive images
- [SEO (OpenGraph Tags, Twitter Tags)](src/components/MainLayout/index.js#L195)
- [gatsby-source-instagram](https://github.com/oorestisime/gatsby-source-instagram)
- [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog)
- [commit message template](.github/commit_template)
- [Yarn](https://yarnpkg.com)
- [All Contributors by Kent C. Dodds](https://github.com/kentcdodds/all-contributors)

## Roadmap

- integrate programming blog, which should reuse as much as possible
- change [react-helmet](https://github.com/nfl/react-helmet) to [react-head](https://github.com/tizmagik/react-head)
- code improvements

## Development

We use `yarn` as Node.js package manager instead of `npm` and a semantic commit convention based on [Angular's](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).
This way we can auto generate our [changelog](CHANGELOG.md) using [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog).
If you want, you can use the `yarn setup:git` script to link our [commit message template](.github/commit_template) in your local git settings (only for this repository), which can serve as a cheat sheet and reminder.
To build the changelog you can run `yarn changelog`

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/5196971?v=4" width="100px;"/><br /><sub><b>Can Rau</b></sub>](https://github.com/CanRau)<br />[💻](https://github.com/GaiAma/gaiama.org/commits?author=CanRau "Code") [🎨](#design-CanRau "Design") [📖](https://github.com/GaiAma/gaiama.org/commits?author=CanRau "Documentation") [🔍](#fundingFinding-CanRau "Funding Finding") [🤔](#ideas-CanRau "Ideas, Planning, & Feedback") [🚇](#infra-CanRau "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars3.githubusercontent.com/u/79246?v=4" width="100px;"/><br /><sub><b>Stefan Ladwig</b></sub>](https://github.com/sladwig)<br />[📖](https://github.com/GaiAma/gaiama.org/commits?author=sladwig "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/37178032?v=4" width="100px;"/><br /><sub><b>Kemane Ba</b></sub>](https://github.com/kemane)<br />[🎨](#design-kemane "Design") |
| :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
