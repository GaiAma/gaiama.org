import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Head from 'react-helmet'
import { css } from '@emotion/core'
import * as QS from '@gaiama/query-string'
import MainLayout from '@components/MainLayout'
import Link from '@components/Link'
import TitledCopy from '@components/TitledCopy'
import RenderArticles from '@components/RenderArticles'
import { colors, media } from '@src/theme'

const BlogPage = props => {
  const { sort, filter } = QS.parse()
  const isSortAsc = sort === `asc`
  // const isSortDesc = !sort || sort === `desc`
  const tags = filter || []
  const filterLabel = props.data.labels.frontmatter.labels.find(
    x => x.type === filter
  ) || { value: filter }

  const filterWithFallback = items => {
    const results = items.filter(a =>
      tags.length
        ? a.node.frontmatter.tags.length &&
          a.node.frontmatter.tags.some(t => tags.includes(t))
        : true
    )
    return results.length ? results : items
  }
  const articles = filterWithFallback(props.data.articles.edges).sort(
    ({ node: a }, { node: b }) => {
      const isBefore = a.fields.dateTime < b.fields.dateTime
      const isAfter = a.fields.dateTime > b.fields.dateTime
      const sortAsc = isBefore ? -1 : isAfter ? 1 : 0
      const sortDesc = isBefore ? 1 : isAfter ? -1 : 0
      return isSortAsc ? sortAsc : sortDesc
    }
  )

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

      <TitledCopy
        rank="1"
        centered
        title={
          filter
            ? `${props.data.labels.frontmatter.labeled} ${filterLabel.value}`
            : null
        }
        // : props.data.page.frontmatter.title}
        paragraphs={props.data.page.frontmatter.intro.paragraphs}
        css={css`
          margin-bottom: 1.5rem;
          & div {
            font-size: 0.85rem;
            ${media.greaterThan(`medium`)} {
              font-size: 1rem;
            }
          }
        `}
      />

      <div
        css={css`
          display: flex;
          justify-content: center;
          text-align: center;
          position: relative;
          margin: 2rem auto 3rem;
          ${media.greaterThan(`small`)} {
            width: 60%;
          }
          &:before {
            content: '';
            height: 1px;
            width: 100%;
            position: absolute;
            display: block;
            top: 50%;
            left: 0;
            right: 0;
            background: linear-gradient(
                to right,
                ${colors.gray4},
                ${colors.gray9},
                ${colors.gray4}
              )
              no-repeat;
          }
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            background: ${colors.white};
            font-size: 0.9rem;
            position: relative;
            & > a {
              margin: 0 0.5rem;
              padding: 0.2rem 0.5rem;
            }
          `}
        >
          <Link
            to={props.location.pathname}
            sort="desc"
            persistQuery
            css={css`
              pointer-events: ${!isSortAsc && `none`};
              border: none;
              color: ${!isSortAsc && colors.grayTurqoise};
            `}
          >
            {props.data.page.frontmatter.sortLabels.desc}
          </Link>

          {filter && (
            <Link to={props.data.page.fields.url}>
              {props.data.page.frontmatter.sortLabels.all}
            </Link>
          )}

          <Link
            to={props.location.pathname}
            sort="asc"
            persistQuery
            css={css`
              pointer-events: ${isSortAsc && `none`};
              border: none;
              color: ${isSortAsc && colors.grayTurqoise};
            `}
          >
            {props.data.page.frontmatter.sortLabels.asc}
          </Link>
        </div>
      </div>

      <RenderArticles
        articles={articles}
        readMoreLabel={props.data.page.frontmatter.readMoreLabel}
        css={css`
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          ${media.greaterThan(`small`)} {
            justify-content: space-between;
          }
          & > article {
            flex: 0 0 97%;
            max-width: 370px;
            margin-bottom: 4rem;
            ${media.greaterThan(`small`)} {
              flex-basis: 47%;
            }
            ${media.greaterThan(`large`)} {
              flex-basis: 29%;
            }
          }
        `}
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

    page: javascriptFrontmatter(fields: { url: { eq: $url } }) {
      ...PageTranslations
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
        frontmatter: { lang: { eq: $lang }, published: { eq: true } }
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
