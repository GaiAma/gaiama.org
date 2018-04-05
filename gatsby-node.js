const { resolve } = require(`path`)
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
const moment = require(`moment`)
const { chunk, round } = require(`lodash/fp`)

const IMAGES_PER_GALLERY = 54

// const log = (dest, content) =>
//   require(`fs`).writeFile(
//     dest,
//     JSON.stringify(content, null, 2),
//     x => x && console.log(x)
//   )

const isPage = ({ node }) => node.internal.type === `JavascriptFrontmatter`
const isBlog = ({ node }) => node.internal.type === `MarkdownRemark`
const isPageOrPost = x => isPage(x) || isBlog(x)

// const identityPlus1 = compose(inc, identity)

const chunkImages = chunk(IMAGES_PER_GALLERY)

const paginator = ({ current, total }) => {
  const listGenerator = compose(
    map(inc),
    times(identity)
  )

  const listCapper = map(i => {
    // const range = current > 1 + 10 && false
    //   ? 7
    //   : 3
    const range = 3
    if (
      i > current - range &&
      i < current + range
    ) {
      return i
    }

    if (
      i < total &&
      i > current
    ) {
      return `next`
    }

    if (
      i > 1 &&
      current > 3 &&
      i < current 
    ) {
      return `prev`
    }

    return i
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
      value:
        node.frontmatter.draft ||
        node.frontmatter.status !== 1 ||
        false,
    })
    createNodeField({
      node,
      name: `layout`,
      value:
        node.frontmatter.layout ||
        `BlogPost`,
    })
  }
}

exports.createPages = async ({ boundActionCreators, getNodes, graphql }) => {
  const { createPage, createNodeField, createRedirect } = boundActionCreators

  // get pages and posts
  const graphNodes = await graphql(`{
    languages: allJavascriptFrontmatter (
      filter: { fileAbsolutePath: { regex: "/languages/" } }
    ) {
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

    pages: allJavascriptFrontmatter (
      filter: {
        frontmatter: {
          slug: { ne: null },
          layout: { ne: null }
        }
      }
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

    articles: allMarkdownRemark (
      filter: { fields: { isDraft: { eq: false } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            id
            title
            shortId
            shortlink
            oldId
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

    gallery: allGalleryJson (
      sort: { fields: [date], order: DESC }
    ) {
      edges {
        node {
          lang
          date
          key
        }
      }
    }
  }`)
  
  if (graphNodes.errors) {
    return Promise.reject(graphNodes.errors)
  }

  // create pages & blog posts
  graphNodes.data.pages.edges
    .concat(graphNodes.data.articles.edges)
    .filter(isPageOrPost)
    .forEach(({ node }) => {
      const { lang, layout, slug } = node.fields
      const { shortId, shortlink, oldId } = node.frontmatter

      if (layout === `GalleryPage`) {
        const graphImages = graphNodes.data.gallery.edges
        return graphNodes.data.languages.edges.forEach(({ node: language }) => {
          const langCode = language.frontmatter.id
          const filteredImages = graphImages.filter(
            x => x.node.lang === langCode
          )

          const allImages = filteredImages
          const allImageCount = allImages.length
          const chunkedImages = chunkImages(allImages)
          const total = chunkedImages.length

          chunkedImages.map((gallery, index) => {
            const pageNr = inc(index)
            return createPage({
              path: pageNr === 1
                  ? slug
                  : `${slug}/${pageNr}`,
              component: resolve(`./src/templates/${layout}.js`),
              context: {
                slug,
                lang,
                pageNr,
                limit: IMAGES_PER_GALLERY,
                skip: pageNr === 1
                  ? 0
                  : round(allImageCount / total * index),
                total,
                first: 1,
                last: total,
                previous: pageNr > 1 ? pageNr - 1 : 0,
                next: pageNr + 1 <= total ? pageNr + 1 : 0,
                pagination: paginator({ current: pageNr, total }),
              },
            })
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
      const idsToRedirect = [shortId, shortlink, oldId]
      idsToRedirect.map(id => {
        if (!id) return false
        return createRedirect({
          fromPath: `${lang === `en` ? `` : `/${lang}`}/${id}`,
          toPath: slug,
          isPermanent: true,
          Language: lang,
        })
      })

      return true
    })

  // setup mappings
  const allNodes = getNodes()
  const PagesAndPosts = allNodes.filter(x => isPageOrPost({ node: x }))

  PagesAndPosts.forEach(node => {
    // translation mapping
    if (node.frontmatter.translations) {
      const translatedNodes =
        node.frontmatter.translations.map(
          id => {
            const translation = PagesAndPosts.find(x => x.frontmatter.id === id)
            return translation
              ?  translation.id
              : console.log(`NO translation: `, id, node.frontmatter.slug)
          })

      translatedNodes.length &&
        createNodeField({
          node,
          name: `translations`,
          value: translatedNodes,
        })
    }

    // suggested content mapping
    if (node.frontmatter.suggested) {
      const suggestedNodes =
        node.frontmatter.suggested.map(
          _id => {
            const id = `${_id}`
            const propToMatch = id.length === 4
              ? `oldId`
              : `id`
            const suggestion = PagesAndPosts.find(x =>
              x.frontmatter[propToMatch] === id &&
              x.frontmatter.lang === node.frontmatter.lang
            )
            return suggestion
              ?  suggestion.id
              : console.log(`NO suggestion: `, id, node.frontmatter.slug)
          })

      suggestedNodes.length &&
        createNodeField({
          node,
          name: `suggested`,
          value: suggestedNodes,
        })
    }

    return true
  })

  const getBlogPage = lang => allNodes.find(node =>
    isPage({ node }) &&
    node.fields.layout === `BlogPage` &&
    node.fields.lang === lang
  )

  graphNodes.data.languages.edges.forEach(lang =>
    allNodes
      .filter(
        node => isBlog({ node }) &&
        node.frontmatter.status === 1 &&
        node.fields.lang === lang.node.frontmatter.id
      )
      .sort((_a, _b) => {
      const a = moment(parseInt(_a.frontmatter.date))
      const b = moment(parseInt(_b.frontmatter.date))
      return a.isBefore(b)
        ? 1
        : a.isAfter(b)
          ? -1
          : 0
      })
      .forEach((node, index, array) => {
        const older = array[index + 1]
        const newer = array[index - 1]
        const all = getBlogPage(node.fields.lang)

        createNodeField({
          node, name: `older`, value: older && older.id ? older.id : null,
        })
        createNodeField({
          node, name: `all`, value: all && all.id ? all.id : null,
        })
        createNodeField({
          node, name: `newer`, value: newer && newer.id ? newer.id : null,
        })
      })
  )

  return true
}

/**
 * maybe split up assets into subfolders?
 */
// exports.modifyWebpackConfig = ({ config, stage }) => {
//   config.loader(`file-loader`, current => {
//     // current.config.query.name = `static/[name].[hash:8].[ext]`
//     // current.config.query.useRelativePath = true
//     const test = () => {}
//     test()
//     return current
//   })
// }
