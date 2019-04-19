const { join } = require(`path`)
const { writeFile } = require(`fs`).promises
// const { Feed } = require(`feed`)
// const moment = require(`moment`)
// const mkDir = require(`make-dir`)

// const generateFeeds = ({ languages }) => {
//   languages.forEach(lang => {
//     const langFeed = Feeds.find(x => x.frontmatter.lang === lang.frontmatter.id)
//     const feed = new Feed({
//       title: langFeed.frontmatter.title,
//       description: langFeed.frontmatter.description,
//       id: langFeed.frontmatter.id,
//       link: langFeed.frontmatter.link,
//       image: langFeed.frontmatter.image,
//       favicon: langFeed.frontmatter.favicon,
//       copyright: langFeed.frontmatter.copyright,
//       generator: langFeed.frontmatter.generator,
//       feedLinks: {
//         json: `${homepage}/${lang.frontmatter.id}/blog/json`,
//         atom: `${homepage}/${lang.frontmatter.id}/blog/atom`,
//       },
//       author: {
//         name: `GaiAma`,
//         link: homepage,
//       },
//     })

//     // TODO: we might be able to refactor, to stop redoing everything over and over..
//     // like sorting everything upfront
//     Posts.filter(node => node.fields.lang === lang.frontmatter.id)
//       .sort((_a, _b) => {
//         const a = moment(_a.fields.dateTime)
//         const b = moment(_b.fields.dateTime)
//         return a.isBefore(b) ? 1 : a.isAfter(b) ? -1 : 0
//       })
//       .forEach((node, index, array) => {
//         feed.addItem({
//           title: node.frontmatter.title,
//           id: `${homepage}${node.frontmatter.slug}`,
//           link: `${homepage}${node.frontmatter.slug}`,
//           date: new Date(node.fields.dateTime),
//           content: node.excerpt,
//           author: [
//             {
//               name: `GaiAma`,
//               link: homepage,
//             },
//           ],
//         })
//       })

//     store.feeds.dir = join(publicDir, lang.frontmatter.id, `blog`)
//     store.feeds.atom = feed.atom1()
//     store.feeds.rss = feed.rss2()
//     store.feeds.json = feed.json1()
//   })

//     if (feeds.dir) {
//       await mkDir(feeds.dir)
//       await Promise.all([
//         writeFile(join(feeds.dir, `atom.xml`), feeds.atom),
//         writeFile(join(feeds.dir, `rss.xml`), feeds.rss),
//         writeFile(join(feeds.dir, `feed.json`), feeds.json),
//       ])
//     }
//   }

module.exports = ({ feeds, isProduction, publicDir, redirects, serveJson }) =>
  async function onPostBuild({ store }) {
    // await writeFile(
    //   __dirname + `/TEST_STORE.json`,
    //   JSON.stringify(store.getState(), null, 4)
    // )
    // const { redirects } = store.getState()
    // redirects.forEach(({ fromPath, toPath, isPermanent }) => {
    //   redirects.push([fromPath, toPath, isPermanent ? 301 : null].join(` `))
    // })

    const finalRedirects = redirects.concat([
      `/en/blog/atom/* /en/blog/rss.xml 301`,
      `/de/blog/atom/* /de/blog/rss.xml 301`,

      `/en/blog/* https://www.happygaia.com/en/blog/?url=:splat 301`,
      `/de/blog/* https://www.happygaia.com/de/blog/?url=:splat 301`,

      // manual redirection fixes
      `/globetrawter/blog/oh-don-t-stop/ https://www.happygaia.com/en/blog/oh-dont-stop/ 301`,
      `/en/globetrawter/* https://www.happygaia.com/en/blog/ 301`,
      `/de/globetrawter/* https://www.happygaia.com/de/blog/ 301`,

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

      `/en/* /en/404/?url=:splat 404`,
      `/de/* /de/404/?url=:splat 404`,

      // redirect everything still not catched to /en/:splat
      `/* /en/:splat 301`,
    ])

    if (finalRedirects.length) {
      await writeFile(join(publicDir, `_redirects`), finalRedirects.join(`\n`))

      if (!isProduction) {
        serveJson.redirects = serveJson.redirects.concat(
          finalRedirects.map(x => {
            const [source, destination] = x
              .replace(/(:splat|\*)/g, ``)
              .split(` `)
            return { source, destination }
          })
        )

        await writeFile(
          join(publicDir, `serve.json`),
          JSON.stringify(serveJson, null, 2)
        )
      }
    }
  }
