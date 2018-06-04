const { resolve, join } = require(`path`)
const { writeFileSync } = require(`fs`)
const moment = require(`moment`)
const mkDir = require(`make-dir`)
const webpack = require(`webpack`)
const Feed = require(`feed`)
const {
  compose,
  identity,
  inc,
  indexOf,
  map,
  times,
  uniq,
  update,
} = require(`ramda`)
const { chunk, round } = require(`lodash/fp`)
const dotenv = require(`dotenv`).config({
  path: resolve(`..`, `.env`),
})

const IMAGES_PER_GALLERY = 54
const publicDir = join(__dirname, `public`)
const redirections = [`/ /en 301`]

// const log = (dest, content) =>
//   require(`fs`).writeFile(
//     dest,
//     JSON.stringify(content, null, 2),
//     x => x && console.log(x)
//   )

const isPage = ({ node }) =>
  node && node.internal && node.internal.type === `JavascriptFrontmatter`
const isPost = ({ node }) =>
  node && node.internal && node.internal.type === `MarkdownRemark`
const isPageOrPost = x => isPage(x) || isPost(x)

const chunkImages = chunk(IMAGES_PER_GALLERY)

const paginator = ({ current, total }) => {
  const listGenerator = compose(map(inc), times(identity))

  const listCapper = map(i => {
    // const range = current > 1 + 10 && false
    //   ? 7
    //   : 3
    const range = 3
    if (i > current - range && i < current + range) {
      return `${i}`
    }

    if (i < total && i > current) {
      return `next`
    }

    if (i > 1 && current > 3 && i < current) {
      return `prev`
    }

    return `${i}`
  })

  return compose(
    update(indexOf(`next`), `...`),
    update(indexOf(`prev`), `...`),
    uniq,
    listCapper,
    listGenerator
  )(total)
}

exports.onCreateNode = ({ node, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (isPageOrPost({ node })) {
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
      name: `isDraft`,
      value: node.frontmatter.draft || node.frontmatter.status !== 1 || false,
    })
    createNodeField({
      node,
      name: `layout`,
      value: node.frontmatter.layout || `BlogPost`,
    })
    createNodeField({
      node,
      name: `dateTime`,
      value: moment(parseInt(node.frontmatter.date)).format(),
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
            }
            internal {
              type
            }
          }
        }
      }

      articles: allMarkdownRemark(
        filter: { fields: { isDraft: { eq: false } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
            excerpt(pruneLength: 135)
            frontmatter {
              id
              title
              shortId
              shortlink
              oldId
              oldSlug
              date
              translations
            }
            fields {
              slug
              lang
              layout
            }
            internal {
              type
            }
          }
        }
      }

      gallery: allGalleryJson(sort: { fields: [date], order: DESC }) {
        edges {
          node {
            lang
            date
            key
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
        const graphImages = graphNodes.data.gallery.edges
        const allImages = graphImages.filter(x => x.node.lang === lang)

        const allImageCount = allImages.length
        const chunkedImages = chunkImages(allImages)
        const total = chunkedImages.length

        return chunkedImages.map((gallery, index) => {
          const pageNr = inc(index)
          const gallerySlug = `${slug}/${pageNr}`
          // redirect from /1 to /
          if (pageNr === 1) {
            redirections.push(`${gallerySlug} ${slug} 301`)
          }
          return createPage({
            path: pageNr === 1 ? slug : gallerySlug,
            component: resolve(`./src/templates/${layout}.js`),
            context: {
              slug,
              lang,
              pageNr,
              limit: IMAGES_PER_GALLERY,
              skip: pageNr === 1 ? 0 : round(allImageCount / total * index) + 2,
              total,
              first: 1,
              last: total,
              previous: pageNr > 1 ? pageNr - 1 : 0,
              next: pageNr + 1 <= total ? pageNr + 1 : 0,
              pagination: paginator({ current: pageNr, total }),
            },
          })
        })
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

      // set up short url redirects
      const idsToRedirect = [shortId, shortlink, oldId, oldSlug]
      idsToRedirect.map(id => {
        if (!id) return false

        const oldUrl = `${lang === `en` ? `` : `/${lang}`}/${id}`
        return redirections.push(`${oldUrl} ${slug} 301`)
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
      value: node.frontmatter.suggested.length
        ? collectSuggestedNodes(node).slice(0, 3)
        : [],
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
        json: `https://www.gaiama.org/${lang.node.frontmatter.id}/blog/json`,
        atom: `https://www.gaiama.org/${lang.node.frontmatter.id}/blog/atom`,
      },
      author: {
        name: `GaiAma`,
        link: `https://www.gaiama.org`,
      },
    })

    Posts.filter(
      node =>
        node.frontmatter.status === 1 &&
        node.fields.lang === lang.node.frontmatter.id
    )
      .sort((_a, _b) => {
        const a = moment(parseInt(_a.frontmatter.date))
        const b = moment(parseInt(_b.frontmatter.date))
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

        feed.addItem({
          title: node.frontmatter.title,
          id: `https://www.gaiama.org${node.frontmatter.slug}`,
          link: `https://www.gaiama.org${node.frontmatter.slug}`,
          date: new Date(parseInt(node.frontmatter.published)),
          content: node.excerpt,
          author: [
            {
              name: `GaiAma`,
              link: `https://www.gaiama.org`,
            },
          ],
        })
      })

    const feedDir = join(publicDir, lang.node.frontmatter.id, `blog`)
    mkDir.sync(feedDir)
    writeFileSync(join(feedDir, `atom.xml`), feed.atom1())
    writeFileSync(join(feedDir, `rss.xml`), feed.rss2())
    writeFileSync(join(feedDir, `feed.json`), feed.json1())
  })

  return true
}

// /**
//  * maybe split up assets into subfolders?
//  * check out https://github.com/webpack-contrib/file-loader#placeholders
//  */
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
  config.merge({
    plugins: [
      new webpack.DefinePlugin({
        'process.env': Object.keys(dotenv.parsed).reduce((acc, index) => {
          acc[index] = JSON.stringify(dotenv.parsed[index])
          return acc
        }, {}),
      }),
    ],
  })
}

// exports.modifyBabelrc = ({ babelrc }) => ({
//   plugins: babelrc.plugins.concat([`transform-regenerator`]),
// })

exports.onPostBuild = ({ store }) => {
  // const { redirects } = store.getState()

  // redirects.forEach(({ fromPath, toPath, isPermanent }) => {
  //   redirections.push([fromPath, toPath, isPermanent ? 301 : null].join(` `))
  // })

  redirections.push(`/en/* /en/404 400`)
  redirections.push(`/de/* /de/404 400`)

  if (redirections.length) {
    writeFileSync(join(publicDir, `_redirects`), redirections.join(`\n`))
  }
}
