import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { fontFamilies } from '@/theme'

const NewstickerItem = ({ item, readmoreLabel, layout, ...props }) => {
  const coverImage =
    item.frontmatter.cover && item.frontmatter.cover.image.fluid

  return (
    <div {...props}>
      <div
        css={{
          display: `flex`,
          flexDirection: layout === `row` && `column`,
        }}
      >
        {coverImage && (
          <Link to={item.frontmatter.slug} css={styles.imageWrapper(layout)}>
            <Img fluid={coverImage} css={styles.image} />
          </Link>
        )}

        <div>
          <h2 css={styles.title(layout)}>
            <Link to={item.frontmatter.slug}>{item.frontmatter.title}</Link>
          </h2>

          <p css={styles.excerpt}>
            {item.excerpt || item.frontmatter.summary}

            {readmoreLabel && (
              <Link to={item.frontmatter.slug} css={styles.readmoreLink}>
                {readmoreLabel}
              </Link>
            )}
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
