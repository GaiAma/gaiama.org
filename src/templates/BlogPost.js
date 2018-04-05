import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import Head from 'react-helmet'
import moment from 'moment'
import rehypeReact from 'rehype-react'
import MainLayout from '@/components/MainLayout'
import Link from '@/components/Link'
import ShareWidget from '@/components/ShareWidget'
import TitledCopy from '@/components/TitledCopy'
import { SupportWidget } from '@/components/Shared'
import Newsticker from '@/components/Newsticker'
import summarize from '@/utils/summarize'
import {
  // breakPoints,
  colors,
  fontFamilies,
  gradients,
} from '@/theme'

const BlogPost = props => {
  const { page: post, BlogPost, NewsTicker } = props.data
  return (
    <MainLayout {...props}>
      <Head
        title={post.frontmatter.title}
        meta={[
          { name: `description`, content: summarize(post.frontmatter.summary || post.html) },
        ]}
      />

      <PostHeader
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        dateStr={post.frontmatter.dateStr}
      />

      <PostBody>{renderAst(post.htmlAst)}</PostBody>

      <ShareWidget
        label={BlogPost.frontmatter.shareLabel}
      />

      <TitledCopy
        centered
        title={BlogPost.frontmatter.SupportWidget.title}
        paragraphs={BlogPost.frontmatter.SupportWidget.description}
        css={{ margin: `4rem auto 0` }}
      />

      <SupportWidget
        readMoreLink={props.data.SupportWidget.frontmatter.readMoreLink}
        readMoreLabel={props.data.SupportWidget.frontmatter.readMoreLabel}
        css={{ margin: `3rem 0` }}
      />

      {post.fields.suggested &&
        <Newsticker
          items={post.fields.suggested.slice(0, 3)}
          title={BlogPost.frontmatter.relatedArticlesLabel}
          linkLabel={NewsTicker.frontmatter.linkLabel}
          link={NewsTicker.frontmatter.link}
          readmoreLabel={NewsTicker.frontmatter.readmoreLabel}
          layout="row"
        />
      }

      <div
        css={{
          display: `flex`,
          justifyContent: `center`,
          borderBottom: `1px solid #ccc`,
          borderImageSource: `linear-gradient(to right, #cccccc21, #ccc, #cccccc21)`,
          borderImageSlice: `1`,
          textAlign: `center`,
          margin: `2rem auto 3rem`,
          width: `80%`,
        }}
      >
        <div
          css={{
            display: `flex`,
            justifyContent: `space-between`,
            background: `#fff`,
            transform: `translateY(1.05rem)`,
          }}
        >
          {[`newer`, `all`, `older`].map(x => (
            post.fields[x] && <div
              key={post.fields[x].frontmatter.slug}
              css={{
                color: `#c3c3c3`,
                padding: `.5rem`,
                margin: `0 2rem`,
              }}
            >
              <Link
                to={post.fields[x].frontmatter.slug}
                title={post.fields[x].frontmatter.title}
              >
                {BlogPost.frontmatter.pager[x]}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.object,
}

export default BlogPost

export const query = graphql`
  query BlogPostQuery(
    $lang: String!
    $slug: String!
  ) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...SupportWidget
    ...NewsTicker

    BlogPost: blogPostAml (
      frontmatter: { lang: { eq: $lang } }
    ) {
      frontmatter {
        shareLabel
        relatedArticlesLabel
        SupportWidget{
          title
          description
        }
        pager {
          older
          newer
          all
        }
      }
    }
    
    page: markdownRemark (
      frontmatter: {
        slug: { eq: $slug }
      }
    ) {
      fields {
        translations {
          frontmatter {
            title
            lang
            slug
          }
        }
        newer {
          frontmatter {
            title
            slug
          }
        }
        all {
          frontmatter {
            title
            slug
          }
        }
        older {
          frontmatter {
            title
            slug
          }
        }
        suggested {
          html
          frontmatter {
            id
            title
            lang
            slug
            summary
            cover {
              image: childImageSharp {
                resolutions (width: 327, height: 192, quality: 75) {
                  ...GatsbyImageSharpResolutions
                }
              }
            }
          }
        }
      }
      htmlAst
      html
      frontmatter {
        title
        id
        oldId
        slug
        lang
        status
        created
        published
        dateStr
        date
        summary
      }
    }
  }
`

const GaimaImage = ({ aspectRatio, children }) => (
  <div css={{ flex: aspectRatio }}>{children}</div>
)
GaimaImage.propTypes = {
  aspectRatio: PropTypes.string,
}

const renderAst = new rehypeReact({
  createElement,
  components: {
    'gaiama-image': GaimaImage,
    'gaiama-link': Link,
  },
}).Compiler

const PostHeader = ({ title, date, dateStr }) => (
  <div
    css={{
      textAlign: `center`,
      marginBottom: `3rem`,
    }}
  >
    <h1 css={{ marginBottom: `.5rem` }}>{title}</h1>

    <div
      css={{
        display: `block`,
        borderBottom: `1px solid #ccc`,
        borderImageSource: `linear-gradient(to right, #cccccc21, #ccc, #cccccc21)`,
        borderImageSlice: `1`,
        textAlign: `center`,
        fontSize: `.8rem`,
        margin: `-.5rem auto 0`,
        width: `30%`,
      }}
    >
      <time
        dateTime={moment(parseInt(date)).format()}
        css={{
          transform: `translateY(.55rem)`,
          display: `inline-block`,
          background: `#fff`,
          color: `#c3c3c3`,
          padding: `0 .5rem`,
        }}
      >
        {dateStr}
      </time>
    </div>
  </div>
)
PostHeader.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  dateStr: PropTypes.string,
}

const PostBody = ({ children }) => (
  <div
    css={{
      textAlign: `center`,
      '& h3': { fontSize: `1.7rem` },
      '& p': {
        maxWidth: [`753px`, `80ch`],
        marginRight: `auto`,
        marginLeft: `auto`,
      },
      '& ul, & ol': {
        listStylePosition: `inside`,
        margin: `4rem 0`,
      },
      // '& .text-centered': {
      //   textAlign: `center`,
      // },
      // '& p + .inline-gallery': {
      //   marginTop: `3rem`,
      // },
      '& .inline-gallery': {
        display: `flex`,
        justifyContent: `center`,
        margin: `4rem 0`,
        '& > *': {
          width: 600,
          margin: `0 .5rem !important`,
        },
        '& > *:first-child, & > *:last-child': {
          margin: `auto`,
        },
      },
      '& figure': {
        position: `relative`,
        margin: 0,
        '& > figcaption': {
          display: `flex`,
          background: gradients.primary,
          position: `absolute`,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          color: colors.darkWhite,
          padding: `.5rem`,
          justifyContent: `center`,
          alignItems: `center`,
          textAlign: `center`,
          fontFamily: fontFamilies.accent,
          fontSize: `1.4rem`,
          letterSpacing: `.1rem`,
          overflow: `hidden`,
          transition: `all .35s`,
          opacity: 0,
        },
        '&:hover > figcaption': {
          opacity: 1,
        },
      },
      '& .video-wrapper': {
        position: `relative`,
        overflow: `hidden`,
        paddingTop: `29.25%`,
        width: `100%`,
        '& > iframe': {
          position: `absolute`,
          top: `0`,
          left: `0`,
          width: `100%`,
          height: `100%`,
          border: `0`,
        },
      },
    }}
  >
    {children}
  </div>
)
