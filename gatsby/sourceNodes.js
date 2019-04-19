module.exports = store =>
  function sourceNodes({ actions }) {
    const { createTypes } = actions
    const typeDefs = `
    type TranslationFields {
      url: String
    }
    type TranslationFrontmatter {
      title: String
      lang: String
      slug: String
    }
    type Translations {
      id: String
      title: String
      titleShort: String
      lc: String
      to: String
      fields: TranslationFields
      frontmatter: TranslationFrontmatter
    }

    type MdxFields {
      newer: Mdx
      older: Mdx
      all: Mdx
      translations: [Translations]
      slug_short: String
    }
    type Mdx implements Node {
      fields: MdxFields
    }
    type JavascriptFrontmatterFields {
      translations: [Translations]
    }
    type JavascriptFrontmatter implements Node {
      fields: JavascriptFrontmatterFields
    }
  `
    createTypes(typeDefs)
  }
