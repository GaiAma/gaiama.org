import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import NewstickerItem from './NewstickerItem'

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
    <div css={{
      paddingLeft: layout === `column` && `1.5rem`,
      position: `relative`,
    }}>
      {(title || link) &&
        <header css={{
          display: `flex`,
          alignItems: `baseline`,
          justifyContent: `space-between`,
          marginBottom: `1rem`,
        }}>
          {title && <h3 css={{
            fontSize: `2.2rem`,
            margin: 0,
            lineHeight: 1.2,
          }}>
            {title}
          </h3>}

          {link && <div>
            <Link
              to={link}
              css={{ fontSize: `1rem` }}
          >
              {linkLabel}
            </Link>
          </div>}
        </header>
      }

      <div css={{
        display: layout === `row` && `flex`,
      }}>
        {items.map((item, index) =>
          item.node && <NewstickerItem
            key={item.node.frontmatter.id || index}
            item={item.node}
            readmoreLabel={readmoreLabel}
            layout={layout}
            css={{
              marginBottom: `1.6rem`,
              '&:not(:last-child)': {
                marginRight: layout === `row` && `4rem`,
              },
            }}
          />
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

// fragment newstickerMessages on RootQueryType {
//   newstickerMessages: file (
//     absolutePath: { regex: "/\/Newsticker\/messages\/$lang/" }
//   ) {
//     id
//   }
// }

export const fragment = graphql`
  fragment NewsTicker on RootQueryType {
    NewsTicker: javascriptFrontmatter(
      fileAbsolutePath: { regex: "/components\/NewsTicker/" }
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
      slug
      lang
      layout
    }
  }

  fragment newstickerSquare on RootQueryType {
    news: allMarkdownRemark (
      filter: {
        fields: {
          lang: { eq: $lang }
          isDraft: { eq: false }
        }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 4
    ) {
      edges {
        node {
          ...newstickerCommonFields
          frontmatter {
            id
            title
            date
            summary
            cover {
              childImageSharp {
                resolutions(width: 80, height: 80, quality: 75) {
                  ...GatsbyImageSharpResolutions
                }
              }
            }
          }
        }
      }
    }
  }

  fragment newstickerLandscape on RootQueryType {
    news: allMarkdownRemark (
      filter: {
        fields: {
          lang: { eq: $lang }
          isDraft: { eq: false }
        }
      }
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
            cover {
              childImageSharp {
                resolutions(width: 324, height: 150, quality: 75) {
                  ...GatsbyImageSharpResolutions
                }
              }
            }
          }
        }
      }
    }
  }
`
