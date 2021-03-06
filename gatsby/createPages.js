const { resolve } = require(`path`)
const {
  // isHomePage,
  isPage,
  isPost,
  notIsErrorPage,
  prepareSortedTuple,
  sortEnglishLast,
} = require(`./helpers`)

module.exports = store => ({ actions, getNodes }) => {
  const { redirects } = store
  const { createPage, createNodeField } = actions

  // setup mappings
  const allNodes = getNodes()
  const Languages = allNodes.filter(x => x.internal.type === `LanguagesAml`)
  // const PagesAndPosts = allNodes.filter(R.either(isPage, isPost))
  const PagesAndPosts = allNodes.filter(node => isPage(node) || isPost(node))

  prepareSortedTuple(PagesAndPosts).forEach(group =>
    sortEnglishLast(group).forEach((node, _, array) => {
      // if (node.frontmatter.slug === `welcome-to-gaiamas-blog`) console.log(node)
      const { lang, url, slug } = node.fields
      const { layout, shortId, shortlink, oldId, oldSlug } = node.frontmatter

      const page = {
        component: resolve(`./src/templates/${layout}.js`),
        path: url,
        context: { url, slug, lang },
      }

      // https://github.com/gatsbyjs/gatsby/issues/5129#issuecomment-442397391
      // https://github.com/davidbailey00/manuelbieh.de/blob/62714633fb13b6e04c9e24f587114419299af946/gatsby-node.js#L66
      if (slug === `404`) {
        // create root 404
        if (lang === `en`) {
          createPage({
            ...page,
            path: `/404`,
          })
        }
        page.matchPath = `/${lang}/*`
      }

      createPage(page)

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
          })
          .sort((a, b) =>
            a.frontmatter.lang < b.frontmatter.lang
              ? -1
              : a.frontmatter.lang > b.frontmatter.lang
              ? 1
              : 0
          ),
      })

      // set up short url redirects
      // const slugShort = isHomePage(node) ? `/` : `/${index}`
      // createNodeField({
      //   node,
      //   name: `slug_short`,
      //   value: notIsErrorPage(node) ? slugShort : null,
      // })
      if (notIsErrorPage(node)) {
        // redirects.push(
        //   [
        //     slugShort,
        //     url + (isHomePage(node)
        //       ? ``
        //       : `?ref=${encodeURIComponent(slugShort)}`),
        //     `301!`,
        //     node.frontmatter.lang === `de` && `Language=de`,
        //   ]
        //     .filter(Boolean)
        //     .join(` `)
        //     .trim()
        // )

        // &fb_locale=en_US redirections as in https://stackoverflow.com/a/20827962/3484824
        node.fields.translations
          .filter(x => x.id !== node.frontmatter.lang)
          .forEach(lang =>
            redirects.push(
              [
                `${node.fields.url}?fb_locale=${lang.lc}`,
                `${lang.to}?ref=${encodeURIComponent(
                  `${node.fields.url}?fb_locale=${lang.lc}`
                )}`,
                `301!`,
                `Language=${lang.id}`,
              ]
                .filter(x => x)
                .join(` `)
                .trim()
            )
          )
      }

      // legacy short url redirects
      const idsToRedirect = [shortId, shortlink, oldId, oldSlug]
      idsToRedirect.map(id => {
        if (!id) return false
        return redirects.push(`${`/${lang}`}/${id} ${url} 301!`)
      })
    })
  )
}
