import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import MainLayout from '@/components/MainLayout'

const SimplePage = props => {
  const { page } = props.data
  return (
    <MainLayout {...props}>
      <p dangerouslySetInnerHTML={{ __html: page.frontmatter.content }} />
    </MainLayout>
  )
}
SimplePage.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object,
}

export default SimplePage

export const query = graphql`
  query($lang: String!, $slug: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...legal
    ...Accounts

    page: javascriptFrontmatter(frontmatter: { slug: { eq: $slug } }) {
      fields {
        url
        translations {
          fields {
            url
          }
          frontmatter {
            title
            lang
            slug
          }
        }
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
