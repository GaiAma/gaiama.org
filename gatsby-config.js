const { join } = require(`path`)
const { round } = require(`lodash`)
const { homepage, version } = require(`./package.json`)

const {
  URL: NETLIFY_SITE_URL = homepage,
  DEPLOY_PRIME_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = process.env.NODE_ENV,
  GAIAMA_CONTENT_TOKEN,
} = process.env

const isOnline = !!GAIAMA_CONTENT_TOKEN

// if `production` or A/B testing branch prefixed with `ab_`
const isNetlifyProduction =
  NETLIFY_ENV === `production` || `${process.env.BRANCH}`.startsWith(`ab_`)
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : DEPLOY_PRIME_URL

const sharedManifestProperties = {
  name: `GaiAma`,
  short_name: `GaiAma`,
  background_color: `#fff`,
  theme_color: `#287482`,
  display: `standalone`,
  icon: `static/gaiama_pictogram.png`,
}

const plugins = [
  {
    resolve: `gatsby-plugin-robots-txt`,
    options: {
      resolveEnv: () => NETLIFY_ENV,
      env: {
        production: {
          policy: [{ userAgent: `*` }],
        },
        'deploy-preview': {
          policy: [{ userAgent: `*`, disallow: [`/`] }],
        },
        ...(!isNetlifyProduction
          ? {
              'branch-deploy': {
                policy: [{ userAgent: `*`, disallow: [`/`] }],
              },
            }
          : {}),
      },
    },
  },
  {
    resolve: `gatsby-plugin-emotion`,
    options: {
      labelFormat: `[filename]--[local]`,
    },
  },
  `gatsby-plugin-theme-ui`,
  `gatsby-plugin-layout`,
  {
    resolve: `gatsby-plugin-webpack-aliases`,
    options: {
      aliases: {
        '@root': `./`,
        '@src': `./src`,
        '@components': `./src/components`,
      },
    },
  },
  {
    resolve: `gatsby-plugin-compile-es6-packages`,
    options: {
      modules: [`@gaiama/query-string`],
    },
  },
  isOnline
    ? {
        resolve: `gatsby-source-git`,
        options: {
          name: `gaiama-content`,
          remote: `https://gitlab.com:${GAIAMA_CONTENT_TOKEN}@gitlab.com/gaiama/content.git`,
          // branch: `develop`,
        },
      }
    : null,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: isOnline
        ? // ? join(__dirname, `.cache`, `gatsby-source-git`, `gaiama-content`)
          join(__dirname, `.vscode`)
        : join(__dirname, `..`, `gaiama.org_content`),
      name: `content`,
      ignore: [`**/.git`, `**/happygaia/*`],
    },
  },
  {
    resolve: `@gaiama/gatsby-source-gaiama-donations`,
    options: {
      TableName: `gaiama-donations`,
      accessKeyId: process.env.GAIAMA_DONATIONS_ACCESS_KEY_ID,
      secretAccessKey: process.env.GAIAMA_DONATIONS_SECRET_ACCESS_KEY,
      offline: !isOnline && !process.env.GAIAMA_FULL_CONTENT,
    },
  },
  {
    // TODO: add internet connection check!
    resolve: `gatsby-source-instagram`,
    options: {
      username: `gaiama_org`,
    },
  },
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: [`.mdx`, `.md`],
      rehypePlugins: [require(`rehype-slug`)],
      gatsbyRemarkPlugins: [
        // { resolve: `gatsby-remark-embed-video` },
        { resolve: `gatsby-remark-external-links` },
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 800,
            backgroundColor: `#eae9e9`,
            linkImagesToOriginal: false,
            showCaptions: true,
            quality: 75,
            wrapperStyle: f => `flex:${round(f.aspectRatio, 2)};`,
            ignoreFileExtensions: [], // the quick fix? #6698
          },
        },
        { resolve: `@gaiama/gatsby-remark-wrap-images` },
        // {
        //   // TODO: check why it's not working/wrapping anymore e.g. /en/blog/tie-your-hair-without-hair-tie/
        //   resolve: `gatsby-remark-responsive-iframe`,
        //   options: {
        //     wrapperStyle: `margin: 0 auto 1.0725rem; max-width: 80%;`,
        //   },
        // },
        { resolve: `gatsby-remark-copy-linked-files` },
        {
          resolve: `gatsby-remark-smartypants`,
          options: {
            dashes: `oldschool`,
          },
        },
      ],
    },
  },
  `gatsby-transformer-archieml`,
  // {
  //   resolve: `gatsby-transformer-remark-multi-type`,
  //   options: {
  //     customizeType: node =>
  //       node.relativePath.includes(`newsletter`)
  //         ? `newsletter`
  //         : node.frontmatter.layout !== `BlogPost`
  //         ? basename(dirname(node.relativePath))
  //         : ``,
  //     plugins: [
  //       `gatsby-remark-embed-video`,
  //       // {
  //       //   resolve: `gatsby-remark-iframes`,
  //       //   options: {
  //       //     // custom markdown iframe syntax !(http://hostname/foo)
  //       //     'youtube.com': {
  //       //       tag: `iframe`,
  //       //       width: 560,
  //       //       height: 315,
  //       //       disabled: false,
  //       //       replace: [
  //       //         [`watch?v=`, `embed/`],
  //       //         [`http://`, `https://`],
  //       //         [`youtube.com`, `youtube-nocookie.com`],
  //       //       ],
  //       //       thumbnail: {
  //       //         format: `http://img.youtube.com/vi/{id}/0.jpg`,
  //       //         id: `.+/(.+)$`,
  //       //       },
  //       //       removeAfter: `&`,
  //       //     },
  //       //     'youtu.be': {
  //       //       tag: `iframe`,
  //       //       width: 560,
  //       //       height: 315,
  //       //       disabled: false,
  //       //       replace: [
  //       //         [`watch?v=`, `embed/`],
  //       //         [`youtu.be`, `www.youtube.com/embed`],
  //       //         [`youtube.com`, `youtube-nocookie.com`],
  //       //       ],
  //       //       thumbnail: {
  //       //         format: `http://img.youtube.com/vi/{id}/0.jpg`,
  //       //         id: `.+/x(.+)$`,
  //       //       },
  //       //       removeAfter: `&`,
  //       //     },
  //       //     'vimeo.com': {
  //       //       tag: `iframe`,
  //       //       width: 500,
  //       //       height: 281,
  //       //       disabled: false,
  //       //       replace: [
  //       //         [`http://`, `https://`],
  //       //         [`www.`, ``],
  //       //         [`vimeo.com/`, `player.vimeo.com/video/`],
  //       //       ],
  //       //       append: `?color=3d95a8&title=0&byline=0&portrait=0`,
  //       //     },
  //       //   },
  //       // },
  //       `gatsby-remark-emoji`,
  //       // `gatsby-remark-autolink-headers`,
  //       {
  //         resolve: `gatsby-remark-custom-blocks`,
  //         options: {
  //           blocks: {
  //             danger: `custom-block-danger`,
  //             info: `custom-block-info`,
  //           },
  //         },
  //       },
  //       `gatsby-remark-external-links`,
  //       {
  //         resolve: `gatsby-remark-images`,
  //         options: {
  //           maxWidth: 800,
  //           backgroundColor: `#eae9e9`,
  //           linkImagesToOriginal: false,
  //           showCaptions: true,
  //           quality: 75,
  //           wrapperStyle: f => `flex:${round(f.aspectRatio, 2)};`,
  //         },
  //       },
  //       `@gaiama/gatsby-remark-wrap-images`,
  //       {
  //         resolve: `gatsby-remark-responsive-iframe`,
  //         options: {
  //           wrapperStyle: `margin: 0 auto 1.0725rem; max-width: 80%;`,
  //         },
  //       },
  //       `gatsby-remark-copy-linked-files`,
  //       {
  //         resolve: `gatsby-remark-smartypants`,
  //         options: {
  //           dashes: `oldschool`,
  //         },
  //       },
  //     ],
  //   },
  // },
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
      dir: join(__dirname, `public`, `qr`),
    },
  },
  `gatsby-transformer-sharp`,
  {
    resolve: `gatsby-plugin-sharp`,
    options: {
      // TODO: enable for better compression
      // useMozJpeg: true,
    },
  },
  // `gatsby-plugin-lodash`,
  `gatsby-plugin-catch-links`,
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-plugin-canonical-urls`,
    options: { siteUrl: homepage },
  },
  // {
  //   resolve: `@gaiama/gatsby-plugin-manifest`,
  //   options: {
  //     manifests: [
  //       Object.assign({}, sharedManifestProperties, {
  //         start_url: `/en/?ref=a2hs`,
  //         // pattern: `^/en/.*$`,
  //         language: `en`,
  //       }),
  //       Object.assign({}, sharedManifestProperties, {
  //         start_url: `/de/?ref=a2hs`,
  //         // pattern: `^/de/.*$`,
  //         language: `de`,
  //       }),
  //     ],
  //   },
  // },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      ...sharedManifestProperties,
      start_url: `/de/?ref=a2hs`,
      lang: `de`,
      localize: [
        {
          start_url: `/en/?ref=a2hs`,
          lang: `en`,
        },
      ],
    },
  },
  // {
  //   resolve: `gatsby-plugin-webpack-bundle-analyzer`,
  //   options: {
  //     production: false,
  // {
  //   resolve: `gatsby-plugin-pixel`,
  //   options: {
  //     version,
  //     endpoint: `/api/pixel`,
  //   },
  // },
  {
    resolve: `gatsby-plugin-nprogress`,
    options: {
      color: `#ba0d24`, // `#870515`,
      showSpinner: true,
    },
  },
  // {
  //   resolve: `gatsby-plugin-google-tagmanager`,
  //   options: {
  //     id: `GTM-P2HCKV6`,
  //     includeInDevelopment: true,
  //   },
  // },
  // {
  //   resolve: `@gaiama/gatsby-plugin-feed`,
  //   options: {
  //     // this base query will be merged with any queries in each feed
  //     query: `
  //       {
  //         site {
  //           siteMetadata {
  //             title
  //             description
  //             siteUrl
  //             site_url: siteUrl
  //           }
  //         }
  //       }
  //     `,
  //     feeds: [
  //       {
  //         output: x => `/rss.xml`,
  //         title: x => `Gatsby RSS Feed`,
  //         serialize: ({
  //           query: {
  //             site: { siteMetadata },
  //             items,
  //             languages,
  //           },
  //         }) => ({
  //           languages: languages.map(l => l.frontmatter),
  //           items: items.group.map(group => ({
  //             language: group.lang,
  //             items: group.nodes.map(n => {
  //               const { slug } = n.fields
  //               return {
  //                 ...n.frontmatter,
  //                 description: n.excerpt,
  //                 url: `${siteMetadata.siteUrl}/${group.lang}/${slug}`,
  //                 guid: `${siteMetadata.siteUrl}/${group.lang}/${slug}`,
  //                 // custom_elements: [{ 'content:encoded': edge.node.html }],
  //               }
  //             }),
  //           })),
  //         }),
  //         query: `
  //           {
  //             languages: allLanguagesAml {
  //               nodes {
  //                 frontmatter {
  //                   id
  //                   title
  //                   titleShort
  //                   lc
  //                 }
  //               }
  //             }

  //             items: allMdx(
  //               filter: {
  //                 frontmatter: { type: { eq: "article" }, published: { eq: true } }
  //               }
  //               sort: { order: DESC, fields: [frontmatter___date] }
  //             ) {
  //               group(field: frontmatter___lang) {
  //                 lang: fieldValue
  //                 totalCount
  //                 nodes {
  //                   excerpt
  //                   fields { slug }
  //                   frontmatter {
  //                     title
  //                     date
  //                     language: lang
  //                   }
  //                 }
  //               }
  //             }
  //           }

  //         `,
  //       },
  //     ],
  //   },
  // },
  {
    resolve: `gatsby-plugin-offline`,
    options: {
      // globPatterns: [`**/*.{js,css,html}`],
    },
  },
  {
    resolve: `gatsby-plugin-netlify`,
    options: {
      allPageHeaders: [
        ...(!isNetlifyProduction ? [`X-Robots-Tag: noindex, nofollow`] : []),
      ],
    },
  },
].filter(x => x)

module.exports = {
  siteMetadata: {
    title: `GaiAma.org`,
    author: `GaiAma`,
    description: `GaiAma.org website`,
    siteUrl,
    version,
  },
  plugins,
}
