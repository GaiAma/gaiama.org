import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import chunk from 'lodash/fp/chunk'
import QS from '@/utils/query-string'
import { fontFamilies } from '@/theme'
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
        title={props.data.page.frontmatter.title}
        paragraphs={props.data.page.frontmatter.intro.paragraphs}
        css={{
          marginBottom: `1.5rem`,
          '& div': {
            fontSize: `1rem`,
          },
        }}
      />

      <div css={{
        margin: `0 0 3rem`,
        display: `flex`,
        justifyContent: `center`,
      }}>
        <div css={{
          '& a:first-child': {
            fontFamily: fontFamilies.accent,
            fontSize: `1.2rem`,
            color: isSortDesc ? `#000` : `#999`,
            '&:hover': { color: `#000` },
            '&:after': {
              content: isSortDesc && `<`,
              margin: `0 .5rem`,
            },
          },
          '& a:last-child': {
            fontFamily: fontFamilies.accent,
            fontSize: `1.2rem`,
            color: isSortAsc ? `#000` : `#999`,
            '&:hover': { color: `#000` },
            '&:before': {
              content: isSortAsc && `>`,
              margin: `0 .5rem`,
            },
          },
        }}>
          <Link
            to={props.location.pathname}
            sort="desc"
          >
            {props.data.page.frontmatter.sortLabels.desc}
          </Link>

          <Link
            to={props.location.pathname}
            sort="asc"
            exact
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
  }
`
