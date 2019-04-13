import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import MainLayout from '@components/MainLayout'

const SimplePage = props => {
  const { page } = props.data
  return (
    <MainLayout {...props}>
      <div dangerouslySetInnerHTML={{ __html: page.frontmatter.content }} />
    </MainLayout>
  )
}
SimplePage.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object,
}

export default SimplePage

export const query = graphql`
  query($lang: String!, $url: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...legal
    ...Accounts

    page: javascriptFrontmatter(fields: { url: { eq: $url } }) {
      ...PageTranslations
      fields {
        url
      }
      frontmatter {
        title
        lang
        slug
        content
        summary
      }
    }
  }
`
