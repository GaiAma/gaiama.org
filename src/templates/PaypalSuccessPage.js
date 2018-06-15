import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import MainLayout from '@/components/MainLayout'
import TitledCopy from '@/components/TitledCopy'
import Newsticker from '@/components/Newsticker'

const PaypalSuccessPage = props => {
  const { page, NewsTicker } = props.data
  return (
    <MainLayout {...props}>
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
        <Img
          resolutions={page.frontmatter.assets.gratitude.image.resolutions}
        />
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
  query PaypalSuccessPageQuery($lang: String!, $slug: String!) {
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
              resolutions(quality: 75) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
        }
      }
    }
  }
`
