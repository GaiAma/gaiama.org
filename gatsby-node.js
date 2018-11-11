const { resolve, join } = require(`path`)
const { writeFileSync } = require(`fs`)
const moment = require(`moment`)
const { compareAsc, parse: parseDate } = require(`date-fns`)
const mkDir = require(`make-dir`)
const { Feed } = require(`feed`)
const { shuffle } = require(`lodash`)
const R = require(`ramda`)
const speakingUrl = require(`speakingurl`)
const { homepage } = require(`./package.json`)
const { redirects } = require(`./redirects.js`)
const serveJson = require(`./serve.json`)
// const dotenv = require(`dotenv`).config({
//   path: resolve(`..`, `.env`),
// })

const { BRANCH, GAIAMA_CONTENT_ID, GAIAMA_FULL_CONTENT } = process.env
const isProduction = GAIAMA_CONTENT_ID
const isMaster = BRANCH === `master`
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
const notIsErrorPage = node => node.frontmatter.layout !== `ErrorPage`
const isHomePage = node => node.frontmatter.layout === `HomePage`
// TODO: maybe use slugify?
const getSlug = node =>
  speakingUrl(node.frontmatter.slug || node.frontmatter.title, {
    lang: node.frontmatter.lang,
  })
const getUrl = node =>
  [
    ``,
    node.frontmatter.lang,
    isPost(node) ? `blog` : null,
    isHomePage(node) ? null : getSlug(node),
    ``,
  ]
    .filter(x => x !== null)
    .join(`/`)

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
    addNodeField(`slug`, getSlug(node))
    addNodeField(`url`, getUrl(node))
    addNodeField(`lang`, node.frontmatter.lang)
    addNodeField(`dateTime`, theMoment.toISOString())
    addNodeField(`dateStr`, theMoment.format(`Y-MM-DD`))
    addNodeField(
      `dateStrLocalized`,
      theMoment.locale(node.frontmatter.lang).format(`DD MMM Y`)
    )
    // .format(node.frontmatter.lang === `de` ? `DD.MM.Y` : `Y-MM-DD`),
    // TODO: add "better" table of contents to markdown
    // addNodeField(
    //   `headings`,
    //   node.headings &&
    //     node.headings.map(x => ({
    //       title: x.value,
    //       anchor: speakingUrl(x.value, {
    //         lang: node.frontmatter.lang,
    //       }),
    //     }))
    // )
  }
}

exports.createPages = async ({ actions, getNodes, graphql }) => {
  const { createPage, createNodeField } = actions

  // setup mappings
  const allNodes = getNodes()
  const Languages = allNodes.filter(x => x.internal.type === `LanguagesAml`)
  const Feeds = allNodes.filter(x => x.internal.type === `FeedAml`)
  const PagesAndPosts = allNodes.filter(isPageOrPost)
  const Pages = PagesAndPosts.filter(isPage)
  const Posts = PagesAndPosts.filter(isPost)

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
        : (isProduction || GAIAMA_FULL_CONTENT) &&
            console.log(`NO suggestion: `, id, node.frontmatter.slug)
    })

  const getBlogPage = lang =>
    Pages.find(
      node =>
        node.frontmatter.layout === `BlogPage` && node.fields.lang === lang
    )

  prepareSortedTuple(PagesAndPosts).forEach((group, index) =>
    sortEnglishLast(group).forEach((node, _, array) => {
      const { lang, url, slug } = node.fields
      const { layout, shortId, shortlink, oldId, oldSlug } = node.frontmatter

      // console.log(`${slug} => ${url}`)

      const component = resolve(`./src/templates/${layout}.js`)
      const context = { url, slug, lang }

      createPage({ component, path: url, context })

      // create root 404
      slug === `404` &&
        lang === `en` &&
        createPage({
          component,
          path: `/404`,
          context,
        })

      createNodeField({
        node,
        name: `translations`,
        value: array
          .map(n => {
            const lang = Languages.find(
              x => x.frontmatter.id === n.frontmatter.lang
            )
            if (!lang) return null
            return Object.assign({}, lang.frontmatter, {
              to: n.fields.url,
              fields: {
                url: n.fields.url,
              },
              frontmatter: {
                title: n.frontmatter.title,
                lang: n.frontmatter.lang,
                slug: n.frontmatter.slug,
                cover: {
                  publicURL: n.frontmatter.cover
                    ? n.frontmatter.cover.publicURL
                    : ``,
                },
              },
            })
          }) //.filter(n => n.id !== node.id).map(node => node.id),
          .filter(n => n)
          .sort(
            (a, b) =>
              a.frontmatter.lang < b.frontmatter.lang
                ? -1
                : a.frontmatter.lang > b.frontmatter.lang
                  ? 1
                  : 0
          ),
      })

      // set up short url redirects
      if (notIsErrorPage(node)) {
        const slug_short = isHomePage(node) ? `/` : `/${index}`
        createNodeField({
          node,
          name: `slug_short`,
          value: slug_short,
        })
        redirects.push(
          [
            slug_short,
            `${url}?utm_source=${encodeURIComponent(homepage + slug_short)}`,
            `301!`,
            node.frontmatter.lang === `de` && `Language=de`,
          ]
            .filter(x => x)
            .join(` `)
            .trim()
        )
      }

      // legacy short url redirects
      const idsToRedirect = [shortId, shortlink, oldId, oldSlug]
      idsToRedirect.map(id => {
        if (!id) return false
        return redirects.push(`${`/${lang}`}/${id} ${url} 301!`)
      })

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
    })
  )

  // introduce blog posts to their siblings
  Languages.forEach(lang => {
    const langFeed = Feeds.find(x => x.frontmatter.lang === lang.frontmatter.id)
    const feed = new Feed({
      title: langFeed.frontmatter.title,
      description: langFeed.frontmatter.description,
      id: langFeed.frontmatter.id,
      link: langFeed.frontmatter.link,
      image: langFeed.frontmatter.image,
      favicon: langFeed.frontmatter.favicon,
      copyright: langFeed.frontmatter.copyright,
      generator: langFeed.frontmatter.generator,
      feedLinks: {
        json: `${homepage}/${lang.frontmatter.id}/blog/json`,
        atom: `${homepage}/${lang.frontmatter.id}/blog/atom`,
      },
      author: {
        name: `GaiAma`,
        link: homepage,
      },
    })

    // TODO: we might be able to refactor, to stop redoing everything over and over..
    // like sorting everything upfront
    Posts.filter(node => node.fields.lang === lang.frontmatter.id)
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

        feed.addItem({
          title: node.frontmatter.title,
          id: `${homepage}${node.frontmatter.slug}`,
          link: `${homepage}${node.frontmatter.slug}`,
          date: new Date(node.fields.dateTime),
          content: node.excerpt,
          author: [
            {
              name: `GaiAma`,
              link: homepage,
            },
          ],
        })
      })

    feeds.dir = join(publicDir, lang.frontmatter.id, `blog`)
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

  const finalRedirects = redirects.concat([
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

  if (finalRedirects.length) {
    writeFileSync(join(publicDir, `_redirects`), finalRedirects.join(`\n`))

    if (!isProduction) {
      serveJson.redirects = serveJson.redirects.concat(
        finalRedirects.map(x => {
          const [source, destination] = x.replace(/(:splat|\*)/g, ``).split(` `)
          return { source, destination }
        })
      )
      writeFileSync(
        join(publicDir, `serve.json`),
        JSON.stringify(serveJson, null, 2)
      )
    }
  }

  if (feeds.dir) {
    mkDir.sync(feeds.dir)
    writeFileSync(join(feeds.dir, `atom.xml`), feeds.atom)
    writeFileSync(join(feeds.dir, `rss.xml`), feeds.rss)
    writeFileSync(join(feeds.dir, `feed.json`), feeds.json)
  }

  // add robots.txt to site root depending on $BRANCH env var
  const robotsTxt = `User-agent: *\nDisallow:${isMaster ? `` : ` /`}`
  console.log(`$BRANCH`, BRANCH, isMaster, robotsTxt)
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
