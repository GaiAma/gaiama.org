import React from 'react'
import PropTypes from 'prop-types'
import MainLayout from '@/components/MainLayout'

const PrivacyPage = props => {
  const { page } = props.data
  return (
    <MainLayout {...props}>
      <p dangerouslySetInnerHTML={{ __html: page.frontmatter.content }} />
    </MainLayout>
  )
}
PrivacyPage.propTypes = {
  data: PropTypes.object,
  pathContext: PropTypes.object,
}

export default PrivacyPage

export const query = graphql`
  query PrivacyPageQuery($lang: String!, $slug: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...legal

    page: javascriptFrontmatter(frontmatter: { slug: { eq: $slug } }) {
      fields {
        translations {
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
      }
    }
  }
`
