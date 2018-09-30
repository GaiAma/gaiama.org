<p align="center">
  <a href="https://www.gaiama.org/"><img src="src/assets/gaiama-avatar.png"></a>
</p>

### Source code of [GaiAma.org](https://www.gaiama.org/)

<p align="center">
  <a href="#contributors" title="All Contributors"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square"></a>
</p>

#### Features

- [Netlify](https://www.netlify.com/) hosted
- [DigitalOcean](https://m.do.co/c/bcef7e4dac88) backed
- [GatsbyJS](https://www.gatsbyjs.org/) v2
- [Emotion](https://emotion.sh/) for styling
- [Node.js 10.10](https://nodejs.org/en/)
- Now with [changelog](CHANGELOG.md)
- I18n: Auto discover & link translations
- Pager: older / newer article
- [react-toastify](https://github.com/fkhadra/react-toastify)
- [gatsby-plugin-pixel](plugins/gatsby-plugin-pixel) custom analytics using Google Analytics as Backend
- [babel-plugin-preval](https://github.com/kentcdodds/babel-plugin-preval): pre-evaluate color conversions in [theme.js](src/theme.js)
- [Offline support](https://www.npmjs.com/package/gatsby-plugin-offline)
- Responsive images
- Builds way faster than GaiAma v1 ⚡
- SEO (OpenGraph Tags, Twitter Tags)
- [gatsby-source-instagram](https://github.com/oorestisime/gatsby-source-instagram)
- [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog)
- [commit message template](.github/commit_template)
- [Yarn](https://yarnpkg.com)
- [All Contributors by Kent C. Dodds](https://github.com/kentcdodds/all-contributors)

#### Roadmap

- more cleanup
- integrate programming blog, which should reuse as much as possible

#### Development

We use `yarn` as Node.js package manager instead of `npm` and a semantic commit convention based on [Angular's](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).
This way we can auto generate our [changelog](CHANGELOG.md) using [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog).
If you want, you can use the `yarn setup:git` script to link our [commit message template](.github/commit_template) in your local git settings (only for this repository), which can serve as a cheat sheet and reminder.
To build the changelog you can run `yarn changelog`

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/5196971?v=4" width="100px;"/><br /><sub><b>Can</b></sub>](https://www.GaiAma.org)<br />[💻](https://github.com/GaiAma.org/gaiama.org/commits?author=CanRau "Code") [🎨](#design-CanRau "Design") [📖](https://github.com/GaiAma.org/gaiama.org/commits?author=CanRau "Documentation") [🔍](#fundingFinding-CanRau "Funding Finding") [🤔](#ideas-CanRau "Ideas, Planning, & Feedback") [🚇](#infra-CanRau "Infrastructure (Hosting, Build-Tools, etc)") |
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
