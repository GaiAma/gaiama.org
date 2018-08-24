import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import MainLayout from '@/components/MainLayout'
import TitledCopy from '@/components/TitledCopy'
import Newsticker from '@/components/Newsticker'

const PaypalSuccessPage = props => {
  const { page, NewsTicker } = props.data
  return (
    <MainLayout {...props}>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>

      <TitledCopy
        centered
        title={page.frontmatter.intro.title}
        paragraphs={page.frontmatter.intro.text}
        css={{ marginBottom: `2rem` }}
      />

      <div
        css={{
          display: `flex`,
          justifyContent: `center`,
          marginBottom: `2rem`,
        }}
      >
        <Img fixed={page.frontmatter.assets.gratitude.image.fixed} />
      </div>

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
  query($lang: String!, $slug: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...legal
    ...Accounts
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
        summary
        intro {
          title
          text
        }
        assets {
          gratitude {
            image: childImageSharp {
              fixed(quality: 75) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`
