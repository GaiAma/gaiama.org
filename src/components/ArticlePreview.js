import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'
import styled from '@emotion/styled'
import { colors } from '@src/theme'

const StyledLink = styled(Link)`
  border: none;
  :hover {
    background-color: transparent;
    color: ${colors.gray80};
  }
`

const ArticlePreview = ({ article, isVisible, readMoreLabel, ...props }) => (
  <article css={articleStyles.article(isVisible)} {...props}>
    <StyledLink to={article.fields.url}>
      {article.frontmatter.cover && (
        <Img fluid={article.frontmatter.cover.childImageSharp.fluid} />
      )}
      <h2 css={articleStyles.title}>{article.frontmatter.title}</h2>
      {/* {article.frontmatter.subtitle && (
        <h4 css={articleStyles.title}>{article.frontmatter.subtitle}</h4>
      )} */}
    </StyledLink>

    <p css={articleStyles.body}>
      {article.frontmatter.summary || article.excerpt}
    </p>

    <footer css={articleStyles.footer}>
      <div css={articleStyles.footerInner}>
        <time css={articleStyles.time}>{article.fields.dateStrLocalized}</time>
        <StyledLink to={article.fields.url}>{readMoreLabel}</StyledLink>
      </div>
    </footer>
  </article>
)

ArticlePreview.propTypes = {
  article: PropTypes.object.isRequired,
  isVisible: PropTypes.bool,
  readMoreLabel: PropTypes.string,
}

export default ArticlePreview

const articleStyles = {
  article: isVisible => ({
    // flex: `0 0 327`,
    position: `relative`,
    // width: `327`,
    // width: `29%`,
    // marginBottom: `4rem`,
    boxShadow: `0 0 4px 0px ${colors.gray52}`,
    background: colors.lightBlue,
    display: `flex`,
    flexDirection: `column`,
    overflow: `hidden`,
    transition: `transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s, padding 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s`,
    ':hover': {
      // transform: `scale(1.03)`,
      transform: `translateY(-4px)`,
      boxShadow: `0 0 10px 0px ${colors.gray52}`,
      // boxShadow: `rgba(25, 17, 34, 0.1) 0px 10px 42px`,
    },
  }),
  title: {
    margin: `.5rem 1rem 0`,
    letterSpacing: `.05rem`,
  },
  body: {
    margin: `1rem`,
    fontSize: `.9rem`,
  },
  footer: {
    marginTop: `auto`,
    // borderTop: `1px solid #ccc`,
    // borderImageSource: `linear-gradient(to right, #cccccc21, #ccc, #cccccc21)`,
    // borderImageSlice: `1`,
    color: colors.gray2,
    fontSize: `.9rem`,
    position: `relative`,
    '&:before': {
      content: `""`,
      width: `100%`,
      height: `1px`,
      position: `absolute`,
      display: `block`,
      top: `0`,
      left: `0`,
      right: `0`,
      background: `linear-gradient(to right, ${colors.gray4}, ${
        colors.gray3
      }, ${colors.gray4}) no-repeat`,
    },
  },
  footerInner: {
    margin: `0 1rem`,
    lineHeight: `2.5rem`,
    display: `flex`,
    justifyContent: `space-between`,
  },
  time: {
    fontSize: `0.8rem`,
  },
}
