const moment = require(`moment`)
const { parseISO, format, formatISO } = require(`date-fns`)
const { enUS, de } = require(`date-fns/locale/`)
const { getSlug, getUrl, isPage, isPost } = require(`./helpers`)

const dateLocales = {
  en: enUS,
  de: de,
}

module.exports = store => ({ node, actions }) => {
  if (!isPage(node) && !isPost(node)) return
  const { createNodeField } = actions
  const { date, lang } = node.frontmatter
  // 2020-03-31 23:21:33.065829
  const nodeDate = moment(date, `Y-MM-DD`, true)
  // const nodeDate = isPage(node)
  //   ? moment(date, `Y-MM-DD`, true)
  //   : moment(date, `Y-MM-DD HH:mm:ss`, true)

  if (!nodeDate.isValid()) {
    console.log(
      `invalid date`,
      node.frontmatter.slug || node.frontmatter.title || node
    )
  }

  const addField = (name, value) => createNodeField({ node, name, value })

  addField(`type`, isPost(node) ? `post` : `page`)
  addField(`slug`, getSlug(node))
  addField(`url`, getUrl(node))
  addField(`lang`, lang)
  if (date) {
    addField(`dateTime`, nodeDate.toISOString())
    addField(`dateStr`, nodeDate.format(`Y-MM-DD`))
    addField(`dateStrLocalized`, nodeDate.locale(lang).format(`DD MMM Y`))
  } else {
    const nodePublished = parseISO(node.frontmatter.published)
    addField(`dateTime`, formatISO(nodePublished))
    addField(`dateStr`, format(nodePublished, `yyyy-MM-dd`))
    addField(
      `dateStrLocalized`,
      format(nodePublished, `do MMM yyyy`, { locale: dateLocales[lang] })
    )
  }
}
