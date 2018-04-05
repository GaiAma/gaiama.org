import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import chunk from 'lodash/fp/chunk'
import QS from '@/utils/query-string'
import MainLayout from '@/components/MainLayout'
import Link from '@/components/Link'
import TitledCopy from '@/components/TitledCopy'
import RenderArticles from '@/components/RenderArticles'

const chunkedArticles = chunk(3)

const RenderRows = ({ rows }) => (
  <div>
    {rows.map((row, i) => (
      <RenderArticles
        key={i}
        articles={row}
      />
    ))}
  </div>
)
RenderRows.propTypes = {
  rows: PropTypes.array,
}

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
      <TitledCopy
        centered
        title={filter ?
          `${props.data.labels.frontmatter.labeled} ${filterLabel.value}`
          : props.data.page.frontmatter.title}
        paragraphs={props.data.page.frontmatter.intro.paragraphs}
        css={{
          marginBottom: `1.5rem`,
          '& div': {
            fontSize: `1rem`,
          },
        }}
      />

      <div
        css={{
          display: `flex`,
          justifyContent: `center`,
          borderBottom: `1px solid #ccc`,
          borderImageSource: `linear-gradient(to right, #cccccc21, #ccc, #cccccc21)`,
          borderImageSlice: `1`,
          textAlign: `center`,
          margin: `2rem auto 3rem`,
          width: `60%`,
        }}
      >
        <div
          css={{
            display: `flex`,
            justifyContent: `space-between`,
            background: `#fff`,
            fontSize: `.9rem`,
            transform: `translateY(.8rem)`,
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

      <RenderRows
        rows={chunkedArticles(articles)}
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
              resolutions {
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
                resolutions(width: 327, height: 192, quality: 75) {
                  ...GatsbyImageSharpResolutions
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
  }
`
