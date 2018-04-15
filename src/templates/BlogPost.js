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
  colors,
  fontFamilies,
  gradients,
  media,
} from '@/theme'

const BlogPost = props => {
  const { page: post, BlogPost, NewsTicker } = props.data
  const theMoment = moment(parseInt(post.frontmatter.date))

  return (
    <MainLayout {...props}>
      <Head
        title={post.frontmatter.title}
        meta={[
          {
            name: `description`,
            content: summarize(post.frontmatter.summary || post.html),
          },
        ]}
      />

      <PostHeader
        title={post.frontmatter.title}
        dateTime={theMoment.format()}
        dateStr={post.frontmatter.dateStr}
      />

      <PostBody>{renderAst(post.htmlAst)}</PostBody>

      <ShareWidget
        label={BlogPost.frontmatter.shareLabel}
        css={{ marginBottom: `4rem` }}
      />

      <TitledCopy
        centered
        title={BlogPost.frontmatter.SupportWidget.title}
        paragraphs={BlogPost.frontmatter.SupportWidget.description}
        css={{ margin: `0 auto 3rem` }}
      />

      <SupportWidget
        readMoreLink={props.data.SupportWidget.frontmatter.readMoreLink}
        readMoreLabel={props.data.SupportWidget.frontmatter.readMoreLabel}
        lang={props.pathContext.lang}
        css={{ margin: `0 0 3rem` }}
      />

      {post.fields.suggested &&
        <Newsticker
          items={post.fields.suggested}
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
          // borderBottom: `1px solid #ccc`,
          // borderImageSource: `linear-gradient(to right, #cccccc21, #ccc, #cccccc21)`,
          // borderImageSlice: `1`,
          textAlign: `center`,
          margin: `2rem auto 3rem`,
          width: `80%`,
          position: `relative`,
          '&:before': {
            content: `""`,
            height: `1px`,
            width: `100%`,
            position: `absolute`,
            display: `block`,
            top: `50%`,
            right: `0`,
            left: `0`,
            background: `linear-gradient(to right, #cccccc21, #abaaaa, #cccccc21) no-repeat`,
          },
        }}
      >
        <div
          css={{
            position: `relative`,
            display: `flex`,
            justifyContent: `space-between`,
            background: `#fff`,
            // transform: `translateY(1.05rem)`,
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
  pathContext: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }),
}

export default BlogPost

export const query = graphql`
         query BlogPostQuery($lang: String!, $slug: String!) {
           ...siteData
           ...SiteMeta
           ...languages
           ...homepage
           ...menu
           ...SupportWidget
           ...NewsTicker

           BlogPost: blogPostAml(frontmatter: { lang: { eq: $lang } }) {
             frontmatter {
               shareLabel
               relatedArticlesLabel
               SupportWidget {
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

           page: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
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
                       resolutions(width: 370, height: 150, cropFocus: ENTROPY, quality: 75) {
                         ...GatsbyImageSharpResolutions_withWebp
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

const PostHeader = ({ title, dateTime, dateStr }) => (
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
        // borderBottom: `1px solid #ccc`,
        // borderImageSource: `linear-gradient(to right, #cccccc21, #ccc, #cccccc21)`,
        // borderImageSlice: `1`,
        textAlign: `center`,
        fontSize: `.8rem`,
        margin: `-.5rem auto 0`,
        width: `30%`,
        position: `relative`,
        '&:before': {
          content: `""`,
          height: `1px`,
          width: `100%`,
          position: `absolute`,
          display: `block`,
          top: `50%`,
          left: `0`,
          right: `0`,
          background: `linear-gradient(to right, #cccccc21, #abaaaa, #cccccc21) no-repeat`,
        },
      }}
    >
      <time
        dateTime={dateTime}
        css={{
          position: `relative`,
          // transform: `translateY(.55rem)`,
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
  dateTime: PropTypes.string,
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
        marginBottom: `4rem`,
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
        marginBottom: `4rem`,
        [media.lessThan(`small`)]: {
          flexDirection: `column`,
          alignItems: `center`,
          '& > *:not(:last-child)': {
            marginBottom: `1rem`,
          },
        },
        '& > *': {
          width: 600,
          maxWidth: `80%`,
          margin: `0 .5rem`,
        },
        '& > *:first-child, & > *:last-child': {
          marginRight: `auto`,
          marginLeft: `auto`,
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
        width: `98%`,
        maxWidth: `700px`,
        margin: `0 auto 3rem`,
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
