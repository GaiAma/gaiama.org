import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import QS from '@/utils/query-string'
import MainLayout from '@/components/MainLayout'
import Link from '@/components/Link'
import TitledCopy from '@/components/TitledCopy'
import Randomizer from '@/components/Randomizer'
import RenderArticles from '@/components/RenderArticles'
import { media } from '@/theme'

const BlogPage = props => {
  const { sort, filter } = QS.parse()
  const isSortAsc = sort === `asc`
  const isSortDesc = !sort || sort === `desc`
  const tags = filter || []
  const filterLabel = props.data.labels.frontmatter.labels.find(x => x.type === filter)

  const articles = props.data.articles.edges
    .filter(a =>
      tags.length
        ? a.node.frontmatter.tags &&
          a.node.frontmatter.tags.some(t => tags.includes(t))
        : true
    )
    .sort((_a, _b) => {
      const a = moment(parseInt(_a.node.frontmatter.date))
      const b = moment(parseInt(_b.node.frontmatter.date))
      const isBefore = a.isBefore(b)
      const isAfter = a.isAfter(b)
      const sortAsc = isBefore
        ? -1
        : isAfter
          ? 1
          : 0
      const sortDesc = isBefore
        ? 1
        : isAfter
          ? -1
          : 0
      return isSortAsc
        ? sortAsc
        : sortDesc
    })

  return (
    <MainLayout {...props}>
      {!filter && (
        <Randomizer
          quotes={props.data.quotes.frontmatter.quotes}
          nextQuoteLabel={props.data.quotes.frontmatter.nextQuoteLabel}
          css={{
            textAlign: `center`,
            '& blockquote': {
              display: `inline-block`,
            },
            '& p': {
              fontSize: `2rem`,
              lineHeight: 1.3,
              fontFamily: `Amatic SC`,
              margin: 0,
              maxWidth: `650px`,
              [media.greaterThan(`medium`)]: {
                '&': { fontSize: `2.5rem` },
              },
            },
            '& footer': {
              textAlign: `center`,
              fontSize: `.85rem`,
            },
            '& cite': {
              color: `#afafaf`,
              fontStyle: `normal`,
              margin: `0 1rem`,
            },
            '& button': {
              background: `transparent`,
              border: `transparent`,
              color: `hsla(0,0%,0%,0.8)`,
              padding: 0,
              '&:hover': {
                transform: `scale(1.05)`,
              },
            },
          }}
        />
      )}

      <TitledCopy
        centered
        title={filter ?
          `${props.data.labels.frontmatter.labeled} ${filterLabel.value}`
          : null}
          // : props.data.page.frontmatter.title}
        paragraphs={props.data.page.frontmatter.intro.paragraphs}
        css={{
          marginBottom: `1.5rem`,
          '& div': {
            fontSize: `0.85rem`,
            [media.greaterThan(`medium`)]: {
              fontSize: `1rem`,
            },
          },
        }}
      />

      <div
        css={{
          display: `flex`,
          justifyContent: `center`,
          textAlign: `center`,
          position: `relative`,
          margin: `2rem auto 3rem`,
          [media.greaterThan(`small`)]: {
            width: `60%`,
          },
          '&:before': {
            content: `""`,
            height: `1px`,
            width: `100%`,
            position: `absolute`,
            display: `block`,
            top: `50%`,
            left: `0`,
            right: `0`,
            background: `linear-gradient(to right, #cccccc21, #6d6d6d, #cccccc21) no-repeat`,
          },
        }}
      >
        <div
          css={{
            display: `flex`,
            justifyContent: `space-between`,
            background: `#fff`,
            fontSize: `.9rem`,
            position: `relative`,
            // transform: `translateY(.8rem)`,
            '& > a': {
              margin: `0 .5rem`,
              padding: `.2rem .5rem`,
            },
          }}
        >
          <Link
            to={props.location.pathname}
            sort="desc"
            persistQuery
            css={{
              pointerEvents: isSortDesc && `none`,
            }}
          >
            {props.data.page.frontmatter.sortLabels.desc}
          </Link>

          {filter && <Link
            to={props.data.page.frontmatter.slug}
            exact
          >
            {props.data.page.frontmatter.sortLabels.all}
          </Link>}

          <Link
            to={props.location.pathname}
            sort="asc"
            persistQuery
            exact
            css={{
              pointerEvents: isSortAsc && `none`,
            }}
          >
            {props.data.page.frontmatter.sortLabels.asc}
          </Link>
        </div>
      </div>

      <RenderArticles
        articles={articles}
        css={{
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
  query BlogPageQuery(
    $lang: String!
    $slug: String!
  ) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    
    page: javascriptFrontmatter (
      frontmatter: {
        slug: { eq: $slug }
      }
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
        intro {
          paragraphs
        }
        sortLabels {
          all
          asc
          desc
        }
        sidebar {
          artwork {
            image: childImageSharp {
              resolutions(quality: 75) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
        }
      }
    }

    articles: allMarkdownRemark (
      filter: {
        fields: {
          lang: { eq: $lang },
          isDraft: { eq: false }
        }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      #limit: 15
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
          html
          excerpt(pruneLength: 280)
          frontmatter {
            id
            title
            date
            dateStr
            summary
            tags
            cover {
              childImageSharp {
                sizes(maxWidth: 400, maxHeight: 230, quality: 75, cropFocus: ENTROPY) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
          fields {
            slug
            lang
            layout
          }
        }
      }
    }

    labels: siteMetaAml (
      frontmatter: { lang: { eq: $lang } }
    ) {
      frontmatter {
        labeled
        labels {
          type
          value
        }
      }
    }

    quotes: quotesAml (
      frontmatter: { lang: { eq: $lang } }
    ) {
      frontmatter {
        nextQuoteLabel
        quotes {
          author
          quote
        }
      }
    }
  }
`
