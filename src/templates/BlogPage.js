/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Head from 'react-helmet'
import MainLayout from '@components/MainLayout'
import RenderArticles from '@components/RenderArticles'
import { media } from '@src/theme'

const BlogPage = props => {
  const articles = props.data.articles.edges

  return (
    <MainLayout cover={articles[0].node.frontmatter.cover.publicURL} {...props}>
      <Head
        meta={[
          {
            property: `og:type`,
            content: `blog`,
          },
        ]}
      />

      <RenderArticles
        articles={articles}
        readMoreLabel={props.data.page.frontmatter.readMoreLabel}
        sx={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `center`,
          [media.greaterThan(`small`)]: {
            justifyContent: `space-between`,
          },
          '& > article': {
            flex: `0 0 97%`,
            maxWidth: `370px`,
            marginBottom: `4rem`,
            [media.greaterThan(`small`)]: {
              flexBasis: `47%`,
            },
            [media.greaterThan(`large`)]: {
              flexBasis: `29%`,
            },
          },
        }}
      />
    </MainLayout>
  )
}

BlogPage.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
}

export default BlogPage

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
      ...MdxTranslations
      fields {
        url
      }
      frontmatter {
        title
        lang
        slug
        summary
        intro {
          paragraphs
        }
        readMoreLabel
        sortLabels {
          all
          asc
          desc
        }
        sidebar {
          artwork {
            image: childImageSharp {
              fixed(quality: 75) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }

    articles: allMdx(
      filter: {
        fields: { type: { eq: "post" } }
        frontmatter: { lang: { eq: $lang }, isPublished: { eq: true } }
      }
      sort: { fields: [fields___dateTime], order: DESC }
    ) {
      edges {
        previous {
          frontmatter {
            id
          }
        }
        next {
          frontmatter {
            id
          }
        }
        node {
          excerpt(pruneLength: 135)
          frontmatter {
            id
            title
            subtitle
            summary
            tags
            cover {
              publicURL
              childImageSharp {
                fluid(
                  maxWidth: 400
                  maxHeight: 230
                  quality: 75
                  cropFocus: ENTROPY
                ) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            url
            slug
            lang
            dateTime
            dateStrLocalized
          }
        }
      }
    }

    labels: mdx(
      frontmatter: { type: { eq: "SiteMeta" }, lang: { eq: $lang } }
    ) {
      frontmatter {
        labeled
        labels {
          type
          value
        }
      }
    }
  }
`
