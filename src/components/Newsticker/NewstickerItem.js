/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'
import { colors, fontFamilies } from '@src/theme'

const StyledLink = props => (
  <Link
    {...props}
    sx={{
      border: `none`,
      ':hover': {
        backgroundColor: `transparent`,
        color: colors.link,
      },
    }}
  />
)

const Wrapper = props => (
  <div
    {...props}
    sx={{
      padding: `0.5rem`,
      transition: `transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s,
                    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s,
                    padding 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s`,
      ':hover': {
        transform: `translateY(-4px)`,
        boxShadow: `0 0 10px 0px ${colors.gray52}`,
      },
    }}
  />
)

const NewstickerItem = ({ item, readmoreLabel, layout, ...props }) => {
  const coverImage =
    item.frontmatter.cover && item.frontmatter.cover.image.fluid

  return (
    <Wrapper {...props}>
      <div
        sx={{
          display: `flex`,
          flexDirection: layout === `row` && `column`,
        }}
      >
        <StyledLink to={item.fields.url}>
          {coverImage && (
            <div sx={styles.imageWrapper(layout)}>
              <Img fluid={coverImage} sx={styles.image} />
            </div>
          )}

          <div>
            <h2 sx={styles.title(layout)}>{item.frontmatter.title}</h2>

            <p sx={styles.excerpt}>
              {item.excerpt || item.frontmatter.summary}

              {readmoreLabel && (
                <span sx={styles.readmoreLink}>{readmoreLabel}</span>
              )}
            </p>
          </div>
        </StyledLink>
      </div>
    </Wrapper>
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
    border: `1px solid ${colors.gray6}`,
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
