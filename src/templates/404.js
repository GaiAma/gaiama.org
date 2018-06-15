import React from 'react'
import PropTypes from 'prop-types'
import MainLayout from '@/components/MainLayout'

const NotFound = props => (
  <MainLayout {...props}>
    {/* {console.log(props)} */}
    <h1>{props.data.page.frontmatter.title}</h1>
  </MainLayout>
)

NotFound.propTypes = {
  data: PropTypes.object,
}

export default NotFound

export const query = graphql`
  query NotFoundPageQuery($lang: String!, $slug: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...legal
    ...Accounts

    page: javascriptFrontmatter(
      frontmatter: { slug: { eq: $slug }, lang: { eq: $lang } }
    ) {
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
        summary
      }
    }
  }
`
