import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import NewstickerItem from './NewstickerItem'
import { media, ignoreInPrint } from '@src/theme'

const StyledLink = styled(Link)`
  font-size: 1rem;
  border: none;
`

const NewsTicker = ({
  items,
  title,
  link,
  linkLabel,
  readmoreLabel,
  layout,
  ...props
}) => (
  <div {...props}>
    <div
      css={css`
        padding-left: ${layout === `column` && `1.5rem`};
        position: relative;
        ${ignoreInPrint};
      `}
    >
      {(title || link) && (
        <header
          css={css`
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            margin-bottom: 1rem;
          `}
        >
          {title && (
            <h3
              css={css`
                font-size: 2.2rem;
                margin: 0;
                line-height: 1.2;
              `}
            >
              {title}
            </h3>
          )}

          {link && (
            <div>
              <StyledLink to={link}>{linkLabel}</StyledLink>
            </div>
          )}
        </header>
      )}

      <div
        css={css`
          display: ${layout === `row` && `flex`};
          flex-direction: column;
          ${media.lessThan(`medium`)} {
            align-items: center;
          }
          ${media.greaterThan(`medium`)} {
            flex-direction: row;
            justify-content: space-between;
          }
        `}
      >
        {items.map(
          (item, index) =>
            item?.frontmatter && (
              <NewstickerItem
                key={item.frontmatter.id || index}
                item={item}
                readmoreLabel={readmoreLabel}
                layout={layout}
                css={css`
                  margin-bottom: 3rem;
                  width: 90%;
                  max-width: 370px;
                  ${media.greaterThan(`medium`)} {
                    width: 30%;
                    margin-bottom: 1.6rem;
                  }
                `}
              />
            )
        )}
      </div>
    </div>
  </div>
)
NewsTicker.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string,
  link: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  linkLabel: PropTypes.string,
  readmoreLabel: PropTypes.string,
  layout: PropTypes.string,
}
NewsTicker.defaultProps = {
  layout: `column`,
}

export default NewsTicker

// fragment newstickerMessages on Query {
//   newstickerMessages: file (
//     absolutePath: { regex: "/\/Newsticker\/messages\/$lang/" }
//   ) {
//     id
//   }
// }

export const fragment = graphql`
  fragment NewsTicker on Query {
    NewsTicker: javascriptFrontmatter(
      fileAbsolutePath: { regex: "/components/NewsTicker/" }
      frontmatter: { lang: { eq: $lang } }
    ) {
      frontmatter {
        title
        linkLabel
        link
        readmoreLabel
      }
    }
  }

  fragment newstickerCommonFields on Mdx {
    excerpt(pruneLength: 120)
    timeToRead
    #code {
    #  body
    #}
    fields {
      lang
      url
    }
  }

  fragment newstickerLandscape on Query {
    news: allMdx(
      filter: { frontmatter: { lang: { eq: $lang }, published: { eq: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          ...newstickerCommonFields
          frontmatter {
            id
            title
            date
            summary
            slug
            cover {
              image: childImageSharp {
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
        }
      }
    }
  }
`
