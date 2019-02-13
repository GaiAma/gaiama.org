const { basename, dirname, join, resolve } = require(`path`)
const { homepage, version } = require(`./package.json`)

const {
  BRANCH,
  GAIAMA_CONTENT_ID,
  GAIAMA_FULL_CONTENT,
  GAIAMA_DONATIONS_ACCESS_KEY_ID,
  GAIAMA_DONATIONS_SECRET_ACCESS_KEY,
} = process.env
const isProduction = GAIAMA_CONTENT_ID
const isMaster = BRANCH === `master`

const sharedManifestProperties = {
  name: `GaiAma`,
  short_name: `GaiAma`,
  background_color: `#fff`,
  theme_color: `#287482`,
  display: `standalone`,
  icon: `static/gaiama_pictogram.png`,
}

module.exports = {
  siteMetadata: {
    title: `GaiAma.org`,
    author: `GaiAma`,
    description: `GaiAma.org website`,
    siteUrl: homepage,
    version,
  },
  mapping: {
    'MarkdownRemark.fields.suggested': `MarkdownRemark`,
    'MarkdownRemark.fields.newer': `MarkdownRemark`,
    'MarkdownRemark.fields.older': `MarkdownRemark`,
    'MarkdownRemark.fields.all': `JavascriptFrontmatter`,
  },
  plugins: [
    // `gatsby-plugin-fastclick`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/index.js`),
      },
    },
    {
      resolve: `gatsby-plugin-webpack-aliases`,
      options: {
        aliases: {
          '~': `./`,
          '@': `src`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-compile-es6-packages`,
      options: {
        modules: [`@gaiama/query-string`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: isProduction
          ? join(__dirname, `content`)
          : join(__dirname, `..`, `gaiama.org_content`),
        name: `content`,
        ignore:
          isProduction || GAIAMA_FULL_CONTENT
            ? [`**/.git`]
            : [`**/.git`, `**/happygaia/*`],
      },
    },
    {
      resolve: `@gaiama/gatsby-source-gaiama-donations`,
      options: {
        TableName: `gaiama-donations`,
        accessKeyId: isProduction && GAIAMA_DONATIONS_ACCESS_KEY_ID,
        secretAccessKey: isProduction && GAIAMA_DONATIONS_SECRET_ACCESS_KEY,
        offline: !isProduction,
      },
    },
    {
      // TODO: add internet connection check!
      resolve: `gatsby-source-instagram`,
      options: {
        username: `gaiama_org`,
      },
    },
    `gatsby-transformer-archieml`,
    {
      resolve: `gatsby-transformer-remark-multi-type`,
      options: {
        customizeType: node =>
          node.relativePath.includes(`newsletter`)
            ? `newsletter`
            : node.frontmatter.layout !== `BlogPost`
            ? basename(dirname(node.relativePath))
            : ``,
        plugins: [
          `gatsby-remark-embed-video`,
          // {
          //   resolve: `gatsby-remark-iframes`,
          //   options: {
          //     // custom markdown iframe syntax !(http://hostname/foo)
          //     'youtube.com': {
          //       tag: `iframe`,
          //       width: 560,
          //       height: 315,
          //       disabled: false,
          //       replace: [
          //         [`watch?v=`, `embed/`],
          //         [`http://`, `https://`],
          //         [`youtube.com`, `youtube-nocookie.com`],
          //       ],
          //       thumbnail: {
          //         format: `http://img.youtube.com/vi/{id}/0.jpg`,
          //         id: `.+/(.+)$`,
          //       },
          //       removeAfter: `&`,
          //     },
          //     'youtu.be': {
          //       tag: `iframe`,
          //       width: 560,
          //       height: 315,
          //       disabled: false,
          //       replace: [
          //         [`watch?v=`, `embed/`],
          //         [`youtu.be`, `www.youtube.com/embed`],
          //         [`youtube.com`, `youtube-nocookie.com`],
          //       ],
          //       thumbnail: {
          //         format: `http://img.youtube.com/vi/{id}/0.jpg`,
          //         id: `.+/x(.+)$`,
          //       },
          //       removeAfter: `&`,
          //     },
          //     'vimeo.com': {
          //       tag: `iframe`,
          //       width: 500,
          //       height: 281,
          //       disabled: false,
          //       replace: [
          //         [`http://`, `https://`],
          //         [`www.`, ``],
          //         [`vimeo.com/`, `player.vimeo.com/video/`],
          //       ],
          //       append: `?color=3d95a8&title=0&byline=0&portrait=0`,
          //     },
          //   },
          // },
          `gatsby-remark-emoji`,
          // `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-custom-blocks`,
            options: {
              blocks: {
                danger: `custom-block-danger`,
                info: `custom-block-info`,
              },
            },
          },
          `gatsby-remark-external-links`,
          {
            resolve: `gatsby-remark-images-with-ratio`,
            options: {
              maxWidth: 800,
              backgroundColor: `#eae9e9`,
              linkImagesToOriginal: false,
              showCaptions: true,
              addAspectRatio: true,
              quality: 75,
            },
          },
          `gatsby-remark-wrap-images`,
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin: 0 auto 1.0725rem; max-width: 80%;`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-smartypants`,
            options: {
              dashes: `oldschool`,
            },
          },
        ],
      },
    },
    `gatsby-transformer-javascript-frontmatter`,
    `gatsby-transformer-yaml`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-transformer-qr`,
      options: {
        filenameProp: `frontmatter.id`,
        textProp: `frontmatter.wallet`,
        path: `frontmatter.id`,
        validValues: [`btc`, `bch`, `ltc`, `eth`, `dash`],
        extension: `svg`,
        dir: resolve(`public/qr`),
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // `gatsby-plugin-lodash`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: { siteUrl: homepage },
    },
    {
      resolve: `@gaiama/gatsby-plugin-manifest`,
      options: {
        manifests: [
          Object.assign({}, sharedManifestProperties, {
            start_url: `/en/?utm_source=a2hs`,
            // pattern: `^/en/.*$`,
            language: `en`,
          }),
          Object.assign({}, sharedManifestProperties, {
            start_url: `/de/?utm_source=a2hs`,
            // pattern: `^/de/.*$`,
            language: `de`,
          }),
        ],
      },
    },
    // {
    //   resolve: `gatsby-plugin-webpack-bundle-analyzer`,
    //   options: {
    //     production: true,
    {
      resolve: `gatsby-plugin-pixel`,
      options: {
        version,
        endpoint: `/api/pixel`,
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#ba0d24`, //`#870515`,
        showSpinner: true,
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          '/*': isMaster ? [] : [`X-Robots-Tag: noindex, follow`],
        },
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        // Accepts all options defined by `babel-plugin-emotion` plugin.
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        // globPatterns: [`**/*.{js,css,html}`],
      },
    },
  ],
}
