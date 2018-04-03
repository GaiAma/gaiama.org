import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import hex2rgba from 'hex2rgba'
import { colors } from '@/theme'
import summarize from '@/utils/summarize'

const ArticlePreview = ({ article, isVisible, ...props }) => (
  <article css={articleStyles.article(isVisible)} {...props}>
    <Link to={article.fields.slug}>
      {article.frontmatter.cover && <Img
        resolutions={article.frontmatter.cover.childImageSharp.resolutions}
      />}
      <h2
        css={articleStyles.title}
      >
        {article.frontmatter.title}
      </h2>
    </Link>

    <p css={articleStyles.body}>
      {summarize(article.frontmatter.summary || article.html)}
    </p>

    <footer css={articleStyles.footer}>
      <div css={articleStyles.footerInner}>
        <time css={articleStyles.time}>
          {article.frontmatter.dateStr}
        </time>
        <Link to={article.fields.slug}>
          {`read more`}
        </Link>
      </div>
    </footer>
  </article>
)

ArticlePreview.propTypes = {
  article: PropTypes.object.isRequired,
  isVisible: PropTypes.bool,
}

export default ArticlePreview

const articleStyles = {
  article: (isVisible) => ({
    // flex: `0 0 327`,
    position: `relative`,
    // width: `327`,
    // width: `29%`,
    // marginBottom: `4rem`,
    boxShadow: `0 0 8px 0px #00000085`,
    background: hex2rgba(colors.lightBlue, 0.5),
    display: `flex`,
    flexDirection: `column`,
    overflow: `hidden`,
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
    borderTop: `1px solid #ccc`,
    borderImageSource: `linear-gradient(to right, #cccccc21, #ccc, #cccccc21)`,
    borderImageSlice: `1`,
    color: `#a7a7a7`,
    fontSize: `.9rem`,
  },
  footerInner: {
    margin: `0 1rem`,
    lineHeight: `2.5rem`,
    display: `flex`,
    justifyContent: `space-between`,
  },
}