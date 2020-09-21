/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import Head from 'react-helmet'
import MainLayout from '@components/MainLayout'
import { Link } from '@components/Link'
import ShareWidget from '@components/ShareWidget'
import { SupportWidget } from '@components/Shared'
import { VideoPlayer } from '@gaiama/react-video-player'
import PodcastPlayer from '@components/PodcastPlayer'
import { gradients, media } from '@src/theme'

const BlogPost = props => {
  const { page: post, BlogPost, BlogPage, PodcastPlayerMeta } = props.data
  const { newer, older } = post
  return (
    <MainLayout {...props}>
      <Head
        title={post.frontmatter.title}
        meta={[
          {
            name: `description`,
            content: post.frontmatter.summary || post.excerpt,
          },
          {
            property: `og:type`,
            content: `article`,
          },
          {
            property: `og:image`,
            content:
              post.frontmatter.cover &&
              `${props.data.site.siteMetadata.siteUrl}${post.frontmatter.cover.publicURL}`,
          },
          {
            property: `article:published_time`,
            itemprop: `datePublished`,
            content: post.fields.dateTime,
          },
          // { property: `article:author`, content: `` },
          // { property: `article:section`, content: `Category` },
          // { property: `article:tag`, content: `Tags` },
          // { property: `article:tag`, content: `Tags` },
        ]}
      />

      <article itemScope itemType="https://schema.org/BlogPosting">
        <PostHeader
          title={post.frontmatter.title}
          subtitle={post.frontmatter.subtitle}
          dateTime={post.fields.dateTime}
          dateStr={post.fields.dateStr}
          dateStrLocalized={post.fields.dateStrLocalized}
          podcast={post.frontmatter.podcast}
          podcastPlayerMeta={PodcastPlayerMeta}
          shortUrl={
            // props.data.site.siteMetadata.siteUrl + post.fields.slug_short
            props.data.site.siteMetadata.siteUrl + post.fields.url
          }
        />

        <PostBody>
          {post.frontmatter.video?.url && (
            <VideoPlayer
              video={post.frontmatter.video.url}
              thumbnail={post.frontmatter.video.thumbnail?.image}
              label={props.data.SiteMeta.frontmatter.videoPlayerCookieButton}
            />
          )}

          <MDXRenderer>{post.body}</MDXRenderer>
        </PostBody>
      </article>

      <ShareWidget
        label={BlogPost.frontmatter.shareLabel}
        shareUrlSuccessLabel={BlogPost.frontmatter.shareUrl.success}
        shareUrlErrorLabel={BlogPost.frontmatter.shareUrl.error}
        getFullUrlLabel={BlogPost.frontmatter.shareUrl.getFullUrlLabel}
        copyLabel={BlogPost.frontmatter.shareUrl.copyLabel}
        linkLabelShort={BlogPost.frontmatter.shareUrl.linkLabelShort}
        linkLabelFull={BlogPost.frontmatter.shareUrl.linkLabelFull}
        post={post}
        siteUrl={props.data.site.siteMetadata.siteUrl}
        sx={{
          margin: `2rem auto 4rem`,
          maxWidth: `760px`,
        }}
      />

      <SupportWidget
        title={BlogPost.frontmatter.SupportWidget.title}
        description={BlogPost.frontmatter.SupportWidget.description}
        paypalButton={
          props.data.SiteMeta.frontmatter.assets.paypalButton.publicURL
        }
        bankButton={props.data.SupportWidget.frontmatter.bankButton}
        bankButtonAlt={props.data.SupportWidget.frontmatter.bankButtonAlt}
        bankInfo={props.data.SupportWidget.frontmatter.bankInfo}
        bankDetails={props.data.SupportWidget.frontmatter.bankDetails}
        lang={props.pageContext.lang}
        sx={{
          margin: `0 0 3rem`,
        }}
      />

      <div
        sx={{
          display: `flex`,
          justifyContent: `center`,
          textAlign: `center`,
          margin: `2rem auto 3rem`,
          overflow: `hidden`,
          width: `99%`,
          [media.greaterThan(`medium`)]: {
            width: `80%`,
          },
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
            background: `linear-gradient(to right, rgba(204, 204, 204, 0.13), #abaaaa, rgba(204, 204, 204, 0.13)) no-repeat`,
          },
        }}
      >
        <div
          sx={{
            position: `relative`,
            display: `flex`,
            justifyContent: `space-between`,
            background: `#fff`,
          }}
        >
          {[older, BlogPage, newer].map(
            x =>
              post.fields[x]?.url && (
                <div
                  key={post.fields[x].fields.url}
                  sx={{
                    padding: `0.5rem`,
                    margin: `0 2rem`,
                  }}
                >
                  <Link
                    to={post.fields[x].fields.url}
                    title={post.fields[x].frontmatter.title}
                    sx={{
                      border: `none`,
                    }}
                  >
                    {BlogPost.frontmatter.pager[x]}
                  </Link>
                </div>
              )
          )}
        </div>
      </div>
    </MainLayout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }),
}

export default BlogPost

export const query = graphql`
  query($lang: String!, $url: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...legal
    ...Accounts
    ...SupportWidget
    ...PodcastPlayer

    BlogPost: blogPostAml(frontmatter: { lang: { eq: $lang } }) {
      frontmatter {
        shareLabel
        shareUrl {
          copyLabel
          linkLabelShort
          linkLabelFull
          success
          error
          getFullUrlLabel
        }
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

    BlogPage: mdx(
      frontmatter: { layout: { eq: "BlogPage" } }
      fields: { lang: { eq: $lang } }
    ) {
      frontmatter {
        title
      }
      fields {
        url
      }
    }

    page: mdx(fields: { type: { eq: "post" }, url: { eq: $url } }) {
      body
      frontmatter {
        title
        lang
        summary
        cover {
          publicURL
        }
        # podcast {
        #   audio
        #   video
        # }
        # video {
        #   url
        #   thumbnail {
        #     image: childImageSharp {
        #       fluid(maxWidth: 760, quality: 75, cropFocus: ENTROPY) {
        #         ...GatsbyImageSharpFluid
        #       }
        #     }
        #   }
        # }
      }
      fields {
        dateTime
        dateStr
        dateStrLocalized
        url
        translations {
          fields {
            url
          }
          frontmatter {
            title
            lang
            slug
          }
        }
      }
      newer {
        frontmatter {
          title
        }
        fields {
          url
        }
      }
      older {
        frontmatter {
          title
        }
        fields {
          url
        }
      }
      suggested(count: 3) {
        excerpt(pruneLength: 135)
        fields {
          url
        }
        frontmatter {
          id
          title
          lang
          slug
          summary
          cover {
            image: childImageSharp {
              fluid(
                maxWidth: 400
                maxHeight: 230
                quality: 75
                cropFocus: ENTROPY
              ) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

const PostHeader = ({
  title,
  subtitle,
  dateTime,
  dateStr,
  dateStrLocalized,
  podcast,
  podcastPlayerMeta,
  shortUrl,
}) => (
  <div
    sx={{
      margin: 0,
    }}
  >
    <h1
      itemProp="headline"
      sx={{
        maxWidth: `51rem`,
        margin: `0 auto`,
        textAlign: `center`,
      }}
    >
      {title}
    </h1>
    {subtitle && (
      <h3
        sx={{
          maxWidth: `50.7rem`,
          margin: `1rem auto 0`,
        }}
      >
        {subtitle}
      </h3>
    )}

    {/* TODO: Flexbox text divider https://twitter.com/CodyWebHouse/status/1233058458297143296 */}
    <div
      sx={{
        display: `block`,
        textAlign: `center`,
        fontSize: `0.8rem`,
        margin: `1rem auto 0`,
        width: `90%`,
        position: `relative`,
        [media.greaterThan(`small`)]: {
          width: `60%`,
        },
        [media.greaterThan(`medium`)]: {
          width: `30%`,
        },
        // alternative text divider https://twitter.com/CodyWebHouse/status/1233058458297143296
        '&:before': {
          content: `""`,
          height: `1px`,
          width: `100%`,
          position: `absolute`,
          display: `block`,
          top: `50%`,
          left: `0`,
          right: `0`,
          background: `linear-gradient(to right, rgba(204, 204, 204, 0.13), #abaaaa, rgba(204, 204, 204, 0.13)) no-repeat`,
        },
      }}
    >
      <Link to={shortUrl} title={shortUrl} ext>
        <time
          itemProp="datePublished"
          content={dateTime}
          dateTime={dateTime}
          sx={{
            position: `relative`,
            display: `inline-block`,
            // TODO: dark-theme not working
            backgroundColor: `background`,
            color: `black`,
            padding: `0 0.5rem`,
          }}
        >
          {dateStrLocalized}
        </time>
      </Link>
    </div>

    {podcast && (
      <PodcastPlayer podcast={podcast} meta={podcastPlayerMeta.frontmatter} />
    )}
  </div>
)
PostHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  dateTime: PropTypes.string,
  publishedTime: PropTypes.object,
  dateStr: PropTypes.string,
  dateStrLocalized: PropTypes.string,
  podcast: PropTypes.object,
  podcastPlayerMeta: PropTypes.object,
  shortUrl: PropTypes.string,
}

const PostBody = ({ children }) => (
  <div
    className="postBody"
    sx={{
      wordBreak: `break-word`,
      wordWrap: `break-word`,
      '& > *': {
        maxWidth: `40rem`,
        marginTop: `2.5rem`,
        marginBottom: `0`,
        marginRight: `auto`,
        marginLeft: `auto`,
      },
      '& h2, & h3, & h4, & h5, & h6': {
        marginTop: `2rem`,
      },
      '& h3': {
        fontSize: `1.7rem`,
      },
      '& p:first-of-type': {
        marginTop: `3rem`,
      },
      '& p + p': {
        marginTop: `1.5rem`,
      },
      '& ul, & ol': {
        listStylePosition: `inside`,
      },
      /**
       * TODO: check out grids
       * https://cloudfour.com/thinks/breaking-out-with-css-grid-layout/
       * https://gedd.ski/post/article-grid-layout/
       */
      '& .inline-gallery': {
        maxWidth: `100%`,
        display: `flex`,
        justifyContent: `center`,
        [media.lessThan(`small`)]: {
          flexDirection: `column`,
          alignItems: `center`,
          '& > *': {
            marginTop: `1rem`,
          },
        },
        '& > *': {
          width: `600px`,
          maxWidth: `80% !important`,
          margin: `0 0.5rem !important`,
        },
      },
      '& .inline-gallery-1': {
        '& > *': {
          width: `600px`,
          maxWidth: `45% !important`,
        },
      },
      '& .inline-gallery-2': {
        '& > *': {
          width: `600px`,
          maxWidth: `35% !important`,
        },
      },
      '& .inline-gallery + .inline-gallery': {
        marginTop: `1rem`,
      },
      '& figure': {
        position: `relative`,
        '& > figcaption': {
          display: `flex`,
          background: `${gradients.primary}`,
          position: `absolute`,
          top: `0`,
          right: `0`,
          bottom: `0`,
          left: `0`,
          color: `darkWhite`,
          padding: `0.5rem`,
          justifyContent: `center`,
          alignItems: `center`,
          textAlign: `center`,
          fontFamily: `accent`,
          fontSize: `1.4rem`,
          letterSpacing: `0.1rem`,
          overflow: `hidden`,
          transition: `all 0.35s`,
          opacity: `0`,
          userSelect: `none`,
        },
        '&:hover > figcaption': {
          opacity: `1`,
        },
      },
      '& iframe': {
        border: `0`,
      },
      'li p': {
        margin: `0 !important`,
        display: `inline`,
      },
      'a.anchor': {
        border: `none`,
        ':hover': {
          backgroundColor: `transparent`,
          color: `link`,
        },
      },
    }}
  >
    {children}
  </div>
)
