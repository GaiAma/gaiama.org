import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import MainLayout from '@components/MainLayout'

// pull in all content then maybe KCDs match-sorter to sort by urls
const NotFound = props => (
  <MainLayout {...props}>
    <h1>{props.data.page.frontmatter.title}</h1>
  </MainLayout>
)

NotFound.propTypes = {
  data: PropTypes.object,
}

export default NotFound

export const query = graphql`
  query($lang: String!, $slug: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...legal
    ...Accounts

    page: mdx(frontmatter: { slug: { eq: $slug }, lang: { eq: $lang } }) {
      ...MdxTranslations
      frontmatter {
        title
        lang
        slug
        summary
      }
    }
  }
`
