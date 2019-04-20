import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
// import { withMDXScope } from 'gatsby-mdx/context'
// import { TableOfContents } from '@gaiama/react-mdx-table-of-contents'
import MainLayout from '@components/MainLayout'

const SimplePage = props => {
  const { page /*,scope*/ } = props.data
  // const TOC = () =>
  //   TableOfContents({ items: props.data.page.tableOfContents.items })
  return (
    <MainLayout {...props}>
      <MDXRenderer /*scope={{ TableOfContents: TOC, ...scope }}*/>
        {page.code.body}
      </MDXRenderer>
    </MainLayout>
  )
}
SimplePage.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object,
}

export default SimplePage
// export default withMDXScope(SimplePage)

export const query = graphql`
  query($lang: String!, $url: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...legal
    ...Accounts

    page: mdx(fields: { url: { eq: $url } }) {
      code {
        body
      }
      #tableOfContents
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
        summary
      }
    }
  }
`
