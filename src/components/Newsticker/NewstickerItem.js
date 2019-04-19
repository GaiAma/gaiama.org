import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Img from 'gatsby-image/withIEPolyfill'
import { colors, fontFamilies } from '@src/theme'

const StyledLink = styled(Link)`
  border: none;
  :hover {
    background-color: transparent;
    color: ${colors.link};
  }
`

const Wrapper = styled.div`
  padding: 0.5rem;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s,
    padding 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  :hover {
    transform: translateY(-4px);
    box-shadow: 0 0 10px 0px ${colors.gray52};
  }
`

const NewstickerItem = ({ item, readmoreLabel, layout, ...props }) => {
  const coverImage =
    item.frontmatter.cover && item.frontmatter.cover.image.fluid

  return (
    <Wrapper {...props}>
      <div
        css={css`
          display: flex;
          flex-direction: ${layout === `row` && `column`};
        `}
      >
        <StyledLink to={item.fields.url}>
          {coverImage && (
            <div css={styles.imageWrapper(layout)}>
              <Img fluid={coverImage} css={styles.image} />
            </div>
          )}

          <div>
            <h2 css={styles.title(layout)}>{item.frontmatter.title}</h2>

            <p css={styles.excerpt}>
              {item.excerpt || item.frontmatter.summary}

              {readmoreLabel && (
                <span css={styles.readmoreLink}>{readmoreLabel}</span>
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
