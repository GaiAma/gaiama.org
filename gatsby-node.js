const { resolve, join } = require(`path`)
const { writeFileSync } = require(`fs`)
const { homepage } = require(`./package.json`)
const moment = require(`moment`)
const mkDir = require(`make-dir`)
// const webpack = require(`webpack`)
const Feed = require(`feed`)
// const {
//   compose,
//   identity,
//   flatten,
//   inc,
//   indexOf,
//   map,
//   times,
//   uniq,
//   update,
// } = require(`ramda`)
// const { chunk, round } = require(`lodash/fp`)
const { shuffle } = require(`lodash`)
// const dotenv = require(`dotenv`).config({
//   path: resolve(`..`, `.env`),
// })

// const IMAGES_PER_GALLERY = 54
const publicDir = join(__dirname, `public`)

const redirections = [
  // Redirect default Netlify subdomain to primary domain
  `https://gaiama.netlify.com/en/* ${homepage}/en/:splat 301!`,
  `https://gaiama.netlify.com/de/* ${homepage}/de/:splat 301!`,
  `https://gaiama.netlify.com/* ${homepage}/en/:splat 301!`,
  // subdomain redirects
  `https://spende.gaiama.org/* ${homepage}/de/spenden/ 301!`,
  `https://donate.gaiama.org/* ${homepage}/en/donate/ 301!`,
  // donation shortcuts
  `/spenden /de/spenden/ 301`,
  `/spende /de/spenden/ 301`,
  `/donate /en/donate/ 301`,
  // redirect root to /de based on browser language
  `/ /de/ 302 Language=de`, // remove * & :splat for now
  // redirect root to /en otherwise
  `/ /en/ 301`,
]

const isPage = ({ node }) =>
  node && node.internal && node.internal.type === `JavascriptFrontmatter`
const isPost = ({ node }) =>
  node &&
  node.internal &&
  node.internal.type === `MarkdownRemark` &&
  /\/(happygaia|blog)\//.test(node.fileAbsolutePath)
const isPageOrPost = x => isPage(x) || isPost(x)

// const chunkImages = chunk(IMAGES_PER_GALLERY)

// const paginator = ({ current, total }) => {
//   const listGenerator = compose(map(inc), times(identity))

//   const listCapper = map(i => {
//     // const range = current > 1 + 10 && false
//     //   ? 7
//     //   : 3
//     const range = 3
//     if (i > current - range && i < current + range) {
//       return `${i}`
//     }

//     if (i < total && i > current) {
//       return `next`
//     }

//     if (i > 1 && current > 3 && i < current) {
//       return `prev`
//     }

//     return `${i}`
//   })

//   return compose(
//     update(indexOf(`next`), `...`),
//     update(indexOf(`prev`), `...`),
//     uniq,
//     listCapper,
//     listGenerator
//   )(total)
// }

exports.onCreateNode = ({ node, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (isPageOrPost({ node })) {
    const theMoment = moment(node.frontmatter.date, `Y-MM-DD`)
    createNodeField({
      node,
      name: `slug`,
      value: node.frontmatter.slug,
    })
    createNodeField({
      node,
      name: `lang`,
      value: node.frontmatter.lang,
    })
    createNodeField({
      node,
      name: `isPublished`,
      value: node.frontmatter.published,
    })
    createNodeField({
      node,
      name: `layout`,
      value: node.frontmatter.layout || `BlogPost`,
    })
    createNodeField({
      node,
      name: `dateTime`,
      value: theMoment.toISOString(),
    })
    createNodeField({
      node,
      name: `dateStr`,
      value: theMoment.format(`Y-MM-DD`),
    })
    createNodeField({
      node,
      name: `dateStrLocalized`,
      value: theMoment.locale(node.frontmatter.lang).format(`DD MMM Y`),
      // .format(node.frontmatter.lang === `de` ? `DD.MM.Y` : `Y-MM-DD`),
    })
  }
}

exports.createPages = async ({ boundActionCreators, getNodes, graphql }) => {
  const { createPage, createNodeField } = boundActionCreators

  // get pages and posts
  const graphNodes = await graphql(`
    {
      languages: allLanguagesAml {
        edges {
          node {
            frontmatter {
              id
              title
            }
            internal {
              type
            }
          }
        }
      }

      pages: allJavascriptFrontmatter(
        filter: { frontmatter: { slug: { ne: null }, layout: { ne: null } } }
      ) {
        edges {
          node {
            fields {
              slug
              lang
              layout
            }
            frontmatter {
              id
              translations
              menu
              cover {
                publicURL
                size
                internal {
                  mediaType
                }
              }
            }
            internal {
              type
            }
          }
        }
      }

      articles: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/(happygaia|blog)/" }
          fields: { isPublished: { eq: true } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
            fileAbsolutePath
            excerpt(pruneLength: 135)
            frontmatter {
              id
              title
              shortId
              shortlink
              oldId
              oldSlug
              translations
              published
              cover {
                publicURL
                size
                internal {
                  mediaType
                }
              }
            }
            fields {
              slug
              lang
              layout
              dateTime
            }
            internal {
              type
            }
          }
        }
      }

      feed: allFeedAml {
        edges {
          node {
            frontmatter {
              lang
              title
              description
              id
              link
              image
              favicon
              copyright
              generator
            }
          }
        }
      }
    }
  `)

  if (graphNodes.errors) {
    return Promise.reject(graphNodes.errors)
  }

  // create pages & blog posts
  graphNodes.data.pages.edges
    .concat(graphNodes.data.articles.edges)
    .filter(isPageOrPost)
    .forEach(({ node }) => {
      const { lang, layout, slug } = node.fields
      const { shortId, shortlink, oldId, oldSlug } = node.frontmatter

      if (layout === `GalleryPage`) {
        // const graphImages = graphNodes.data.gallery.edges
        // const allImages = graphImages.filter(x => x.node.lang === lang)
        // console.log(`\n\n\n\n------------------------\n`)
        // console.log(graphNodes.data.articles.edges.map(x => x.node.frontmatter))
        // console.log(`\n------------------------\n\n\n\n`)
        // const allImages = flatten(
        //   graphNodes.data.articles.edges.map(
        //     x => x.node.frontmatter.gallery || []
        //   )
        // )
        // const allImageCount = allImages.length
        // const chunkedImages = chunkImages(allImages)
        // const total = chunkedImages.length
        // console.log(`allimages`, allImages)
        // createNode({
        //   id: `GaiAmaGallery`,
        //   children: [],
        //   parent: `__SOURCE__`,
        //   internal: {
        //     type: `GaiAmaGallery`,
        //     contentDigest: allImages.map(x => x.filename).join(`;`),
        //   },
        //   images: allImages,
        // })
        // return
        // return chunkedImages.map((gallery, index) => {
        //   const pageNr = inc(index)
        //   const gallerySlug = `${slug}/${pageNr}`
        //   // redirect from /1 to /
        //   if (pageNr === 1) {
        //     redirections.push(`${gallerySlug} ${slug} 301`)
        //   }
        //   // return createPage({
        //   //   path: pageNr === 1 ? slug : gallerySlug,
        //   //   component: resolve(`./src/templates/${layout}.js`),
        //   //   context: {
        //   //     slug,
        //   //     lang,
        //   //     pageNr,
        //   //     limit: IMAGES_PER_GALLERY,
        //   //     skip: pageNr === 1 ? 0 : round(allImageCount / total * index) + 2,
        //   //     total,
        //   //     first: 1,
        //   //     last: total,
        //   //     previous: pageNr > 1 ? pageNr - 1 : 0,
        //   //     next: pageNr + 1 <= total ? pageNr + 1 : 0,
        //   //     pagination: paginator({ current: pageNr, total }),
        //   //   },
        //   // })
        // })
      }

      // all non-gallery / non-paginated pages
      createPage({
        path: node.fields.slug,
        component: resolve(`./src/templates/${node.fields.layout}.js`),
        context: {
          slug: node.fields.slug,
          lang: node.fields.lang,
        },
      })
      // create root 404
      if (node.fields.layout === `404` && node.fields.lang === `en`) {
        createPage({
          path: `/404`,
          component: resolve(`./src/templates/${node.fields.layout}.js`),
          context: {
            slug: node.fields.slug,
            lang: node.fields.lang,
          },
        })
      }

      // set up short url redirects
      const idsToRedirect = [shortId, shortlink, oldId, oldSlug]
      idsToRedirect.map(id => {
        if (!id) return false
        return redirections.push(`${`/${lang}`}/${id} ${slug} 301`)
      })

      return true
    })

  // setup mappings
  const PagesAndPosts = getNodes().filter(x => isPageOrPost({ node: x }))
  const Pages = PagesAndPosts.filter(x => isPage({ node: x }))
  const Posts = PagesAndPosts.filter(x => isPost({ node: x }))
  const BlogPages = Pages.filter(node => node.fields.layout === `BlogPage`)

  // suggested content mapping
  const collectSuggestedNodes = node =>
    node.frontmatter.suggested.map(_id => {
      const id = `${_id}`
      const propToMatch = id.length === 4 ? `oldId` : `id`
      const suggestion = Posts.find(
        x =>
          x.frontmatter[propToMatch] === id &&
          x.frontmatter.lang === node.frontmatter.lang
      )
      return suggestion
        ? suggestion.id
        : console.log(`NO suggestion: `, id, node.frontmatter.slug)
    })

  PagesAndPosts.forEach(node => {
    // translation mapping
    const translatedNodes = node.frontmatter.translations
      ? node.frontmatter.translations.map(id => {
          const translation = PagesAndPosts.find(x => x.frontmatter.id === id)
          return translation
            ? translation.id
            : console.log(`NO translation: `, id, node.frontmatter.slug)
        })
      : []

    return createNodeField({
      node,
      name: `translations`,
      value: translatedNodes,
    })
  })

  Posts.forEach(node =>
    createNodeField({
      node,
      name: `suggested`,
      value:
        node.frontmatter.suggested && node.frontmatter.suggested.length
          ? collectSuggestedNodes(node).slice(0, 3)
          : shuffle(
              Posts.filter(
                node =>
                  node.fields.isPublished &&
                  moment(node.fields.dateTime).isAfter(1427472056000)
              )
            )
              .slice(0, 3)
              .map(node => node.frontmatter.id),
    })
  )

  const getBlogPage = lang => BlogPages.find(node => node.fields.lang === lang)

  const feedComponents = graphNodes.data.feed.edges

  // introduce blog posts to their siblings
  graphNodes.data.languages.edges.forEach(lang => {
    const langFeed = feedComponents.find(
      x => x.node.frontmatter.lang === lang.node.frontmatter.id
    )
    const feed = new Feed({
      title: langFeed.node.frontmatter.title,
      description: langFeed.node.frontmatter.description,
      id: langFeed.node.frontmatter.id,
      link: langFeed.node.frontmatter.link,
      image: langFeed.node.frontmatter.image,
      favicon: langFeed.node.frontmatter.favicon,
      copyright: langFeed.node.frontmatter.copyright,
      generator: langFeed.node.frontmatter.generator,
      feedLinks: {
        json: `${homepage}/${lang.node.frontmatter.id}/blog/json`,
        atom: `${homepage}/${lang.node.frontmatter.id}/blog/atom`,
      },
      author: {
        name: `GaiAma`,
        link: homepage,
      },
    })

    Posts.filter(
      node =>
        node.frontmatter.published &&
        node.fields.lang === lang.node.frontmatter.id
    )
      .sort((_a, _b) => {
        const a = moment(_a.fields.dateTime)
        const b = moment(_b.fields.dateTime)
        return a.isBefore(b) ? 1 : a.isAfter(b) ? -1 : 0
      })
      .forEach((node, index, array) => {
        const older = array[index + 1]
        const newer = array[index - 1]
        const all = getBlogPage(node.fields.lang)

        createNodeField({
          node,
          name: `older`,
          value: older && older.id ? older.id : null,
        })
        createNodeField({
          node,
          name: `all`,
          value: all && all.id ? all.id : null,
        })
        createNodeField({
          node,
          name: `newer`,
          value: newer && newer.id ? newer.id : null,
        })
      })

    const googleFeedItems = []

    graphNodes.data.articles.edges
      .filter(
        ({ node }) =>
          node.frontmatter.published &&
          node.fields.lang === lang.node.frontmatter.id
      )
      .forEach(({ node }) => {
        const feedItem = {
          title: node.frontmatter.title,
          id: `${homepage}${node.fields.slug}`,
          link: `${homepage}${node.fields.slug}`,
          date: new Date(node.fields.dateTimeMod || node.fields.dateTime),
          content: node.excerpt,
          image: node.frontmatter.cover
            ? {
                url: `${homepage}${node.frontmatter.cover.publicURL}`,
                type: node.frontmatter.cover.internal.mediaType,
                length: node.frontmatter.cover.size,
              }
            : null,
          author: [
            {
              name: `GaiAma`,
              link: homepage,
            },
          ],
        }
        feed.addItem(feedItem)
        googleFeedItems.push(feedItem)
      })

    const [newestArticle] = graphNodes.data.articles.edges.filter(
      ({ node }) =>
        node.frontmatter.published &&
        node.fields.lang === lang.node.frontmatter.id
    )

    graphNodes.data.pages.edges
      .filter(
        ({ node }) =>
          node.frontmatter.menu === `main` &&
          node.fields.lang === lang.node.frontmatter.id
      )
      .forEach(({ node }) =>
        feed.addItem({
          title: node.frontmatter.title,
          id: `${homepage}${node.fields.slug}`,
          link: `${homepage}${node.fields.slug}`,
          date: new Date(
            node.fields.dateTimeMod ||
              node.fields.dateTime ||
              newestArticle.node.fields.dateTimeMod ||
              newestArticle.node.fields.dateTime
          ),
          content: node.excerpt,
          image: node.frontmatter.cover
            ? {
                url: `${homepage}${node.frontmatter.cover.publicURL}`,
                type: node.frontmatter.cover.internal.mediaType,
                length: node.frontmatter.cover.size,
              }
            : node.fields.layout === `BlogPage`
              ? newestArticle.node.frontmatter.cover
                ? {
                    url: `${homepage}${
                      newestArticle.node.frontmatter.cover.publicURL
                    }`,
                    length: newestArticle.node.frontmatter.cover.size,
                    type:
                      newestArticle.node.frontmatter.cover.internal.mediaType,
                  }
                : null
              : null,
          author: [
            {
              name: `GaiAma`,
              link: homepage,
            },
          ],
        })
      )

    //     const sitemap = `
    // <?xml version="1.0" encoding="UTF-8"?>
    // <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    //   xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    //   xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    //   ${googleFeedItems
    //     .map(
    //       item => `
    //     <url>
    //       <loc>${item.link}</loc>
    //       <lastmod>${item.date}</lastmod>
    //       <changefreq>daily</changefreq>
    //       <image:image>
    //         <image:loc>${item.image}</image:loc>
    //       </image:image>
    //     </url>
    //   `
    //     )
    //     .join(``)}
    // </urlset>
    //     `.trim()

    const feedDir = join(publicDir, lang.node.frontmatter.id, `blog`)
    mkDir.sync(feedDir)
    writeFileSync(join(feedDir, `atom.xml`), feed.atom1())
    writeFileSync(join(feedDir, `rss.xml`), feed.rss2())
    writeFileSync(join(feedDir, `feed.json`), feed.json1())
    // writeFileSync(join(feedDir, `sitemap.xml`), sitemap)
  })

  return true
}

/**
 * maybe split up assets into subfolders?
 * check out https://github.com/webpack-contrib/file-loader#placeholders
 */
exports.modifyWebpackConfig = ({ config, stage }) => {
  config.loader(`url-loader`, {
    query: {
      // regExp: /^\/.*()$/,
      name: `static/[ext]/[name][hash:8].[ext]`,
    },
  })
  config.loader(`file-loader`, {
    query: {
      // regExp: /^\/.*()$/,
      name: `static/[ext]/[name][hash:8].[ext]`,
    },
  })

  /**
   * TODO move to dedicated plugin
   * merge in dotenv vars
   */
  // config.merge({
  //   plugins: [
  //     new webpack.DefinePlugin({
  //       'process.env': Object.keys(dotenv.parsed || {}).reduce((acc, index) => {
  //         acc[index] = JSON.stringify(dotenv.parsed[index])
  //         return acc
  //       }, {}),
  //     }),
  //   ],
  // })
}

exports.onPostBuild = ({ store }) => {
  // const { redirects } = store.getState()
  // redirects.forEach(({ fromPath, toPath, isPermanent }) => {
  //   redirections.push([fromPath, toPath, isPermanent ? 301 : null].join(` `))
  // })
  const finalRedirections = redirections.concat([
    `/en/blog/atom/* /en/blog/rss.xml 301`,
    `/de/blog/atom/* /de/blog/rss.xml 301`,

    `/en/blog/* /en/blog/?url=:splat 301`,
    `/de/blog/* /de/blog/?url=:splat 301`,

    // manual redirection fixes
    `/globetrawter/blog/oh-don-t-stop/ /en/blog/oh-dont-stop/ 301`,
    `/en/globetrawter/* /en/blog/ 301`,
    `/de/globetrawter/* /de/blog/ 301`,

    `/en/de/* / 301`,
    `/en/danke/* /de/spenden/ 301`,

    // non existent?
    `/de/10484/* /de/blog/ 301`,
    `/en/1213/* /en/blog/ 301`,
    `/de/1047/* /de/blog/ 301`,
    `/de/1213/* /de/blog/ 301`,
    `/de/1210/* /de/blog/ 301`,
    `/en/1210/* /en/blog/ 301`,
    `/en/1193/* /en/blog/ 301`,
    `/en/10592/* /en/blog/ 301`,

    // redirect everything still not catched to /en/:splat
    `/* /en/:splat 301`,

    `/en/* /en/404/?url=:splat 404`,
    `/de/* /de/404/?url=:splat 404`,
  ])

  writeFileSync(join(publicDir, `_redirects`), finalRedirections.join(`\n`))
}
