const path = require(`path`)
const { homepage } = require(`./package.json`)

/** @format */

module.exports = {
  siteMetadata: {
    title: `GaiAma`,
    author: `GaiAma`,
    description: `GaiAma.org website`,
    siteUrl: homepage,
  },
  // pathPrefix: `/gatsby-starter-blog`,
  mapping: {
    'MarkdownRemark.fields.translations': `MarkdownRemark`,
    'JavascriptFrontmatter.fields.translations': `JavascriptFrontmatter`,
  },
  plugins: [
    `gatsby-plugin-react-next`,
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
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `..`, `content`, `content`),
        name: `content`,
      },
    },
    // {
    //   resolve: 'gatsby-plugin-purify-css',
    //   options: {
    //     /* Defaults */
    //     styleId: 'gatsby-inlined-css',
    //     purifyOptions: {
    //       info: true,
    //       minify: true,
    //       rejected: true,
    //     },
    //   },
    // },
    {
      resolve: `gatsby-transformer-archieml`,
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // excerpt_separator: `<!-- end -->`,
        plugins: [
          `gatsby-remark-emoji`,
          `gatsby-remark-autolink-headers`,
          // {
          //   resolve: `gatsby-remark-textr`,
          //   options: {
          //     plugins: [
          //       // input => input.replace(`<3`, `♡`),
          //       input => input.replace(`´`, `'`),
          //     ]
          //   }
          // },
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
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1130,
              linkImagesToOriginal: false,
              showCaptions: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
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
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `tomato`, // Setting a color is optional.
        showSpinner: true, // Disable the loading spinner.
      },
    },
    // `gatsby-transformer-javascript-frontmatter`,
    // `gatsby-transformer-all-yaml`,
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
        dir: path.resolve(`public/qr`),
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-lodash`,
    `gatsby-plugin-feed`,
    `gatsby-plugin-offline`,
    // `gatsby-plugin-fastclick`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: { siteUrl: homepage },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GaiAma`,
        short_name: `GaiAma`,
        start_url: `/`,
        background_color: `#f7f7f7`,
        theme_color: `#191919`,
        display: `minimal-ui`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
        omitGoogleFont: true,
      },
    },
    {
      resolve: `gatsby-plugin-webpack-bundle-analyzer`,
      options: {
        // analyzerPort: 3000,
        // production: true,
        // disable: false,
      },
    },
    `gatsby-plugin-glamor`,
    `gatsby-plugin-meta-redirect`,
  ],
}
