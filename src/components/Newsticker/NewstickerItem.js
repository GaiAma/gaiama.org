import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import summarize from '@/utils/summarize'
import { fontFamilies } from '@/theme'

const NewstickerItem = ({
  item,
  readmoreLabel,
  layout,
  ...props
}) => {
  const coverImage = item.frontmatter.cover &&
    item.frontmatter.cover.childImageSharp.resolutions

  return (
    <div {...props}>
      <div css={{
        display: `flex`,
        flexDirection: layout === `row` && `column`,
      }}>
        {coverImage &&
          <Link
            to={item.fields.slug}
            css={styles.imageWrapper(layout)}
          >
            <Img resolutions={coverImage} css={styles.image} />
          </Link>}

        <div>
          <h2 css={styles.title(layout)}>
            <Link to={item.fields.slug}>
              {item.frontmatter.title}
            </Link>
          </h2>

          <p css={styles.excerpt}>
            {summarize(
              item.frontmatter.summary || item.html,
              140 - item.frontmatter.title.length
            )}

            {readmoreLabel && <Link
              to={item.fields.slug}
              css={styles.readmoreLink}
            >
              {readmoreLabel}
            </Link>}
          </p>
        </div>
      </div>
    </div>
  )
}
NewstickerItem.propTypes = {
  item: PropTypes.object.isRequired,
  readmoreLabel: PropTypes.string,
  layout: PropTypes.string,
}
NewstickerItem.defaultProps = {
  layout: `column`,
}

const styles = {
  title: layout => ({
    fontFamily: fontFamilies.main,
    fontSize: layout === `column` ? `.9rem` : `1rem`,
    lineHeight: 1,
    marginBottom: layout === `column` ? `.2rem` : `.5rem`,
  }),

  imageWrapper: layout => ({
    flex: `0 0 auto`,
    width: layout === `column` && `5rem`,
    margin: layout === `column` ? `0 1rem 0 0` : `0 0 1rem`,
  }),

  image: {
    maxWidth: `100%`,
    border: `1px solid #979797`,
    boxShadow: `1px 1px 6px rgba(0,0,0,0.50)`,
  },

  excerpt: {
    margin: 0,
    fontSize: `0.85rem`,
    lineHeight: 1.2,
  },

  readmoreLink: {
    float: `right`,
  },
}

export default NewstickerItem
