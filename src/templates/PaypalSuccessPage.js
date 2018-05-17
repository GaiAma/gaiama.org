import React from 'react'
import PropTypes from 'prop-types'
import MainLayout from '@/components/MainLayout'
import TitledCopy from '@/components/TitledCopy'
import Newsticker from '@/components/Newsticker'
// import { breakPoints } from '@/theme'

const PaypalSuccessPage = props => {
  const { page, NewsTicker } = props.data
  return (
    <MainLayout {...props}>
      <TitledCopy
        centered
        title={page.frontmatter.intro.title}
        paragraphs={page.frontmatter.intro.text}
        css={{ marginBottom: `6rem` }}
      />

      <Newsticker
        items={props.data.news.edges.map(x => x.node)}
        title={NewsTicker.frontmatter.title}
        linkLabel={NewsTicker.frontmatter.linkLabel}
        link={NewsTicker.frontmatter.link}
        readmoreLabel={NewsTicker.frontmatter.readmoreLabel}
        layout="row"
      />
    </MainLayout>
  )
}
PaypalSuccessPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.object,
    news: PropTypes.object,
    NewsTicker: PropTypes.object,
  }),
}
export default PaypalSuccessPage

export const query = graphql`
  query PaypalSuccessPageQuery($lang: String!, $slug: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...legal
    ...NewsTicker
    ...newstickerLandscape

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
        intro {
          title
          text
        }
      }
    }
  }
`
