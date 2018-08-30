import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import NewstickerItem from './NewstickerItem'
import { media } from '@/theme'

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
      css={{
        paddingLeft: layout === `column` && `1.5rem`,
        position: `relative`,
      }}
    >
      {(title || link) && (
        <header
          css={{
            display: `flex`,
            alignItems: `baseline`,
            justifyContent: `space-between`,
            marginBottom: `1rem`,
          }}
        >
          {title && (
            <h3
              css={{
                fontSize: `2.2rem`,
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {title}
            </h3>
          )}

          {link && (
            <div>
              <Link to={link} css={{ fontSize: `1rem` }}>
                {linkLabel}
              </Link>
            </div>
          )}
        </header>
      )}

      <div
        css={{
          display: layout === `row` && `flex`,
          flexDirection: `column`,
          [media.lessThan(`medium`)]: {
            alignItems: `center`,
          },
          [media.greaterThan(`medium`)]: {
            flexDirection: `row`,
            justifyContent: `space-between`,
          },
        }}
      >
        {items.map(
          (item, index) =>
            item && (
              <NewstickerItem
                key={item.frontmatter.id || index}
                item={item}
                readmoreLabel={readmoreLabel}
                layout={layout}
                css={{
                  marginBottom: `3rem`,
                  width: `90%`,
                  maxWidth: `370px`,
                  [media.greaterThan(`medium`)]: {
                    width: `30%`,
                    marginBottom: `1.6rem`,
                  },
                  // '&:not(:last-child)': {
                  //   marginRight: layout === `row` && `4rem`,
                  // },
                }}
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

  fragment newstickerCommonFields on MarkdownRemark {
    excerpt(pruneLength: 120)
    timeToRead
    html
    fields {
      lang
    }
  }

  fragment newstickerLandscape on Query {
    news: allMarkdownRemark(
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
