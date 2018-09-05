const { resolve, join } = require(`path`)
const { writeFileSync } = require(`fs`)
const { homepage } = require(`./package.json`)
const moment = require(`moment`)
const { compareAsc, parse: parseDate } = require(`date-fns`)
const mkDir = require(`make-dir`)
const { Feed } = require(`feed`)
const { shuffle } = require(`lodash`)
const R = require(`ramda`)
const { homepage } = require(`./package.json`)
const { redirects } = require(`./redirects.js`)
// const dotenv = require(`dotenv`).config({
//   path: resolve(`..`, `.env`),
// })

const isMaster = process.env.BRANCH === `master`
const publicDir = join(__dirname, `public`)
const feeds = {}

const isPost = R.and(
  R.pathEq([`frontmatter`, `layout`], `BlogPost`),
  R.pathEq([`frontmatter`, `published`], true)
)
const isPage = R.compose(
  R.endsWith(`Page`),
  R.pathOr(`N/A`, [`frontmatter`, `layout`])
)
const isPageOrPost = R.anyPass([isPage, isPost])

const getNLast = n =>
  R.compose(
    R.head,
    R.takeLast(n)
  )
const lastContains = R.compose(
  R.contains(`index`),
  R.last
)
const getGroup = R.compose(
  R.ifElse(lastContains, getNLast(3), getNLast(2)),
  R.split(`/`),
  R.prop(`fileAbsolutePath`)
)
const sortByDirectory = R.sortBy(getGroup)
const groupByPage = R.groupWith((a, b) => getGroup(a) === getGroup(b))
// sort content: pages before articles, by date
const sortTuplesByDateAndLayout = R.sort((a, b) => {
  const _a = a[0].frontmatter
  const _b = b[0].frontmatter
  // either both layouts are equal in our case both equal BlogPost or none of them equals BlogPost
  return _a.layout === _b.layout || [_a, _b].every(x => x.layout !== `BlogPost`)
    ? compareAsc(parseDate(_a.date), parseDate(_b.date))
    : _a.layout === `BlogPost`
      ? 1
      : -1
})
const prepareSortedTuple = R.compose(
  sortTuplesByDateAndLayout,
  groupByPage,
  sortByDirectory
)
const sortEnglishLast = R.sortBy(R.path([`frontmatter`, `lang`]))
const notIsErrorPage = node => node.frontmatter.is !== `ErrorPage`

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (isPageOrPost(node)) {
    const theMoment = moment(node.frontmatter.date, `Y-MM-DD`)
    const addNodeField = (name, value) =>
      createNodeField({
        node,
        name,
        value,
      })

    addNodeField(`type`, isPost(node) ? `post` : `page`)
    addNodeField(`slug`, node.frontmatter.slug)
    addNodeField(`lang`, node.frontmatter.lang)
    addNodeField(`dateTime`, theMoment.toISOString())
    addNodeField(`dateStr`, theMoment.format(`Y-MM-DD`))
    addNodeField(
      `dateStrLocalized`,
      theMoment.locale(node.frontmatter.lang).format(`DD MMM Y`)
    )
    // .format(node.frontmatter.lang === `de` ? `DD.MM.Y` : `Y-MM-DD`),
  }
}

exports.createPages = async ({ actions, getNodes, graphql }) => {
  const { createPage, createNodeField } = actions

  // setup mappings
  const PagesAndPosts = getNodes().filter(isPageOrPost)
  const Pages = PagesAndPosts.filter(isPage)
  const Posts = PagesAndPosts.filter(isPost)
  const BlogPages = Pages.filter(node => node.frontmatter.layout === `BlogPage`)

  prepareSortedTuple(PagesAndPosts).forEach((group, index) =>
    sortEnglishLast(group).forEach((node, _, array) => {
      const { lang, slug } = node.fields
      const { layout, shortId, shortlink, oldId, oldSlug } = node.frontmatter

      createPage({
        path: node.fields.slug,
        component: resolve(`./src/templates/${layout}.js`),
        context: {
          slug: node.fields.slug,
          lang: node.fields.lang,
        },
      })
      // create root 404
      if (layout === `404` && node.fields.lang === `en`) {
        createPage({
          path: `/404`,
          component: resolve(`./src/templates/${layout}.js`),
          context: {
            slug: node.fields.slug,
            lang: node.fields.lang,
          },
        })
      }

      createNodeField({
        node,
        name: `translations`,
        value: array.filter(n => n.id !== node.id).map(node => node.id),
      })

      // set up short url redirects
      if (notIsErrorPage(node)) {
        const slug_short = `/${index + 1}`
        console.log(`${slug_short} ${node.frontmatter.slug}`)
        createNodeField({
          node,
          name: `slug_short`,
          value: slug_short,
        })
        redirects.push(
          `${slug_short} ${node.frontmatter.slug} ${
            node.frontmatter.lang === `de` ? `302 Language=de` : `301`
          }`
        )
      }

      // legacy short url redirects
      const idsToRedirect = [shortId, shortlink, oldId, oldSlug]
      idsToRedirect.map(id => {
        if (!id) return false
        return redirects.push(`${`/${lang}`}/${id} ${slug} 301`)
      })
    })
  )

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

  Posts.forEach(node =>
    createNodeField({
      node,
      name: `suggested`,
      value:
        node.frontmatter.suggested && node.frontmatter.suggested.length
          ? collectSuggestedNodes(node).slice(0, 3)
          : shuffle(
              Posts.filter(node =>
                moment(node.fields.dateTime).isAfter(1427472056000)
              )
            )
              .slice(0, 3)
              .map(node => node.frontmatter.id),
    })
  )

  const getBlogPage = lang => BlogPages.find(node => node.fields.lang === lang)

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
    throw Promise.reject(graphNodes.errors)
  }

  const languages = graphNodes.data.languages.edges
  const feedComponents = graphNodes.data.feed.edges

  // introduce blog posts to their siblings
  languages.forEach(lang => {
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

    Posts.filter(node => node.fields.lang === lang.node.frontmatter.id)
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
          id: `${homepage}${node.frontmatter.slug}`,
          link: `${homepage}${node.frontmatter.slug}`,
          date: new Date(node.fields.dateTime),
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

    feeds.dir = join(publicDir, lang.node.frontmatter.id, `blog`)
    feeds.atom = feed.atom1()
    feeds.rss = feed.rss2()
    feeds.json = feed.json1()
  })
}

exports.onPostBuild = () => {
  // const { redirects } = store.getState()
  // redirects.forEach(({ fromPath, toPath, isPermanent }) => {
  //   redirects.push([fromPath, toPath, isPermanent ? 301 : null].join(` `))
  // })

  redirects.push(`/en/blog/* /en/blog/ 301`)
  redirects.push(`/de/blog/* /de/blog/ 301`)

  // redirect everything still not catched to /en/:splat
  redirects.push(`/* /en/:splat 301`)

  redirects.push(`/en/* /en/404/?url=:splat 404`)
  redirects.push(`/de/* /de/404/?url=:splat 404`)

  if (redirects.length) {
    writeFileSync(join(publicDir, `_redirects`), redirects.join(`\n`))
  }

  if (feeds.dir) {
    mkDir.sync(feeds.dir)
    writeFileSync(join(feeds.dir, `atom.xml`), feeds.atom)
    writeFileSync(join(feeds.dir, `rss.xml`), feeds.rss)
    writeFileSync(join(feeds.dir, `feed.json`), feeds.json)
  }

  // add robots.txt to site root depending on $BRANCH env var
  console.log(`$BRANCH`, process.env.BRANCH, isMaster)
  const robotsTxt = `User-agent: *\nDisallow:${isMaster ? `` : ` /`}`
  writeFileSync(join(publicDir, `robots.txt`), robotsTxt)
}

/**
 * maybe split up assets into subfolders?
 * check out https://github.com/webpack-contrib/file-loader#placeholders
 */
exports.onCreateWebpackConfig = ({ actions, stage }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [resolve(__dirname), resolve(__dirname, `src`), `node_modules`],
    },
    // check https://github.com/webpack-contrib/jshint-loader/issues/48
    // & https://github.com/gatsbyjs/gatsby/issues/5520
    // module: {
    //   rules: [
    //     {
    //       test: /\.(png|jpg|gif)$/i,
    //       use: [
    //         {
    //           loader: `url-loader`,
    //           options: {
    //             // limit: 8192,
    //             name: `static/[ext]/[name][hash:8].[ext]`,
    //           },
    //         },
    //       ],
    //     },
    //     {
    //       use: [
    //         {
    //           loader: `file-loader`,
    //           options: {
    //             // limit: 8192,
    //             name: `static/[ext]/[name][hash:8].[ext]`,
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // },
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
