const moment = require(`moment`)
const { getSlug, getUrl, isPageOrPost, isPost } = require(`./helpers`)

module.exports = store => async ({ node, actions }) => {
  if (!isPageOrPost(node)) return

  const { createNodeField } = actions
  const { date, lang } = node.frontmatter
  const nodeDate = moment(date, `Y-MM-DD`)

  const addField = (name, value) =>
    createNodeField({
      node,
      name,
      value,
    })

  addField(`type`, isPost(node) ? `post` : `page`)
  addField(`slug`, getSlug(node))
  addField(`url`, getUrl(node))
  addField(`lang`, lang)
  addField(`dateTime`, nodeDate.toISOString())
  addField(`dateStr`, nodeDate.format(`Y-MM-DD`))
  addField(`dateStrLocalized`, nodeDate.locale(lang).format(`DD MMM Y`))
}
