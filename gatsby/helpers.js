const { compareAsc, parse: parseDate } = require(`date-fns`)
const R = require(`ramda`)
const { shuffle } = require(`lodash`)
const speakingUrl = require(`speakingurl`)

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

const getRemainingSuggestions = (id, node_count) =>
  R.pipe(
    R.filter(n => n.frontmatter.id !== id),
    shuffle,
    R.slice(0, node_count)
  )

const getSuggestedNodes = (Posts, node, node_count) => {
  const suggested = []

  if (node.frontmatter.suggested && node.frontmatter.suggested.length) {
    node.frontmatter.suggested.forEach(nid => {
      const suggestion = Posts.find(
        ({ frontmatter: { slug, id, oldId, lang } }) =>
          [slug, id, oldId].includes(`${nid}`) && lang === node.frontmatter.lang
      )
      if (suggestion) {
        suggested.push(suggestion)
      }
    })
  }

  if (suggested.length < node_count) {
    getRemainingSuggestions(
      node.frontmatter.id,
      Math.abs(suggested.length - node_count)
    )(Posts).forEach(n => suggested.push(n.id))
  }

  if (!suggested.length) {
    console.log(`No suggestions found`, node.fields.slug)
  }

  return R.slice(0, node_count, suggested)
}

module.exports = {
  getSlug,
  getUrl,
  getSuggestedNodes,
  getRemainingSuggestions,
  isHomePage,
  isPage,
  isPageOrPost,
  isPost,
  notIsErrorPage,
  prepareSortedTuple,
  sortEnglishLast,
}
