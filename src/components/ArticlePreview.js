/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { Link } from '@components/Link'
import Img from 'gatsby-image/withIEPolyfill'
import { colors } from '@src/theme'

const StyledLink = props => (
  <Link
    sx={{
      border: `none`,
      color: `link`,
      ':hover': {
        backgroundColor: `transparent`,
        color: `gray80`,
      },
    }}
    {...props}
  />
)

const ArticlePreview = ({ article, readMoreLabel, ...props }) => (
  <article sx={articleStyles.article} {...props}>
    <StyledLink to={article.fields.url}>
      {article.frontmatter.cover && (
        <Img fluid={article.frontmatter.cover.childImageSharp.fluid} />
      )}
      <h2 sx={articleStyles.title}>{article.frontmatter.title}</h2>
      {/* {article.frontmatter.subtitle && (
        <h4 sx={articleStyles.title}>{article.frontmatter.subtitle}</h4>
      )} */}
    </StyledLink>

    <p sx={articleStyles.body}>
      {article.frontmatter.summary || article.excerpt}
    </p>

    <footer sx={articleStyles.footer}>
      <div sx={articleStyles.footerInner}>
        <time sx={articleStyles.time}>{article.fields.dateStrLocalized}</time>
        <StyledLink to={article.fields.url}>{readMoreLabel}</StyledLink>
      </div>
    </footer>
  </article>
)

ArticlePreview.propTypes = {
  article: PropTypes.object.isRequired,
  readMoreLabel: PropTypes.string,
}

export default ArticlePreview

const articleStyles = {
  article: {
    position: `relative`,
    boxShadow: ({ colors }) => `0 0 4px 0px ${colors.gray52}`,
    backgroundColor: `lightBlue`,
    display: `flex`,
    flexDirection: `column`,
    overflow: `hidden`,
    transition: `transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s, padding 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s`,
    ':hover': {
      transform: `translateY(-4px)`,
      boxShadow: ({ colors }) => `0 0 10px 0px ${colors.gray52}`,
    },
  },
  title: {
    color: `text`,
    margin: `.5rem 1rem 0`,
    letterSpacing: `.05rem`,
  },
  body: {
    margin: `1rem`,
  },
  footer: {
    marginTop: `auto`,
    // borderTop: `1px solid #ccc`,
    // borderImageSource: `linear-gradient(to right, #cccccc21, #ccc, #cccccc21)`,
    // borderImageSlice: `1`,
    color: `#5d5d5d`,
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
      background: `linear-gradient(to right, ${colors.gray4}, ${colors.gray3}, ${colors.gray4}) no-repeat`,
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
