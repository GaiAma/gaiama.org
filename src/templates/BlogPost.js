import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { css } from '@emotion/core'
import Head from 'react-helmet'
import MainLayout from '@components/MainLayout'
import Link from '@components/Link'
import ShareWidget from '@components/ShareWidget'
import { SupportWidget } from '@components/Shared'
import Newsticker from '@components/Newsticker'
import { VideoPlayer } from '@gaiama/react-video-player'
import PodcastPlayer from '@components/PodcastPlayer'
import { colors, fontFamilies, gradients, media } from '@src/theme'

const BlogPost = props => {
  const {
    page: post,
    BlogPost,
    BlogPage,
    NewsTicker,
    PodcastPlayerMeta,
  } = props.data
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
              `${props.data.site.siteMetadata.siteUrl}${
                post.frontmatter.cover.publicURL
              }`,
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
          datetime={post.fields.dateTime}
          dateStr={post.fields.dateStr}
          dateStrLocalized={post.fields.dateStrLocalized}
          podcast={post.frontmatter.podcast}
          podcastPlayerMeta={PodcastPlayerMeta}
          shortUrl={
            props.data.site.siteMetadata.siteUrl + post.fields.slug_short
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

          <MDXRenderer>{post.code.body}</MDXRenderer>
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
        css={css`
          margin: 2rem auto 4rem;
          max-width: 760px;
        `}
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
        css={css`
          margin: 0 0 3rem;
        `}
      />

      {post.suggested?.length && (
        <Newsticker
          items={post.suggested}
          title={BlogPost.frontmatter.relatedArticlesLabel}
          linkLabel={NewsTicker.frontmatter.linkLabel}
          link={NewsTicker.frontmatter.link}
          readmoreLabel={NewsTicker.frontmatter.readmoreLabel}
          layout="row"
        />
      )}

      <div
        css={css`
          display: flex;
          justify-content: center;
          text-align: center;
          margin: 2rem auto 3rem;
          overflow: hidden;
          width: 99%;
          ${media.greaterThan(`medium`)} {
            width: 80%;
          }
          position: relative;
          &:before {
            content: '';
            height: 1px;
            width: 100%;
            position: absolute;
            display: block;
            top: 50%;
            right: 0;
            left: 0;
            background: linear-gradient(
                to right,
                rgba(204, 204, 204, 0.13),
                #abaaaa,
                rgba(204, 204, 204, 0.13)
              )
              no-repeat;
          }
        `}
      >
        <div
          css={css`
            position: relative;
            display: flex;
            justify-content: space-between;
            background: #fff;
          `}
        >
          {[older, BlogPage, newer].map(
            x =>
              post.fields[x]?.url && (
                <div
                  key={post.fields[x].fields.url}
                  css={css`
                    padding: 0.5rem;
                    margin: 0 2rem;
                  `}
                >
                  <Link
                    to={post.fields[x].fields.url}
                    title={post.fields[x].frontmatter.title}
                    css={css`
                      border: none;
                    `}
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
    ...NewsTicker
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

    BlogPage: javascriptFrontmatter(
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
      code {
        body
      }
      frontmatter {
        title
        #subtitle
        #id
        #oldId
        #slug
        lang
        summary
        #tweet_id
        cover {
          publicURL
        }
        podcast {
          audio
          video
        }
        video {
          url
          thumbnail {
            image: childImageSharp {
              fluid(maxWidth: 760, quality: 75, cropFocus: ENTROPY) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
      fields {
        dateTime
        dateStr
        dateStrLocalized
        slug_short
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
    css={css`
      margin: 0;
    `}
  >
    <h1
      itemProp="headline"
      css={css`
        max-width: 51rem;
        max-width: 40ch;
        margin: 0 auto;
        text-align: center;
      `}
    >
      {title}
    </h1>
    {subtitle && (
      <h3
        css={css`
          max-width: 50.7rem;
          max-width: 48.7ch;
          margin: 1rem auto 0;
        `}
      >
        {subtitle}
      </h3>
    )}

    <div
      css={css`
        display: block;
        text-align: center;
        font-size: 0.8rem;
        margin: 1rem auto 0;
        width: 90%;
        position: relative;
        ${media.greaterThan(`small`)} {
          width: 60%;
        }
        ${media.greaterThan(`medium`)} {
          width: 30%;
        }
        &:before {
          content: '';
          height: 1px;
          width: 100%;
          position: absolute;
          display: block;
          top: 50%;
          left: 0;
          right: 0;
          background: linear-gradient(
              to right,
              rgba(204, 204, 204, 0.13),
              #abaaaa,
              rgba(204, 204, 204, 0.13)
            )
            no-repeat;
        }
      `}
    >
      <Link to={shortUrl} title={shortUrl} ext>
        <time
          itemProp="datePublished"
          content={dateTime}
          dateTime={dateTime}
          css={css`
            position: relative;
            display: inline-block;
            background: #fff;
            color: ${colors.black};
            padding: 0 0.5rem;
          `}
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
    css={css`
      word-break: break-word;
      word-wrap: break-word;
      & > div > * {
        max-width: 50rem;
        max-width: 80ch;
        margin-top: 2.5rem;
        margin-bottom: 0;
        margin-right: auto;
        margin-left: auto;
      }
      & h2,
      & h3,
      & h4,
      & h5,
      & h6 {
        margin-top: 2rem;
        max-width: 50.3rem;
        max-width: 51.4ch;
      }
      & h3 {
        font-size: 1.7rem;
      }
      & p:first-of-type {
        margin-top: 3rem;
      }
      & p + p {
        margin-top: 1.5rem;
      }
      & ul,
      & ol {
        list-style-position: inside;
      }
      /**
       * TODO: check out grids
       * https://cloudfour.com/thinks/breaking-out-with-css-grid-layout/
       * https://gedd.ski/post/article-grid-layout/
      */
      & .inline-gallery {
        max-width: 100%;
        display: flex;
        justify-content: center;
        ${media.lessThan(`small`)} {
          flex-direction: column;
          align-items: center;
          & > * {
            margin-top: 1rem;
          }
        }
        & > * {
          width: 600px;
          max-width: 80%;
          margin: 0 0.5rem;
        }
      }
      & .inline-gallery + .inline-gallery {
        margin-top: 1rem;
      }
      & figure {
        position: relative;
        & > figcaption {
          display: flex;
          background: ${gradients.primary};
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          color: ${colors.darkWhite};
          padding: 0.5rem;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-family: ${fontFamilies.accent};
          font-size: 1.4rem;
          letter-spacing: 0.1rem;
          overflow: hidden;
          transition: all 0.35s;
          opacity: 0;
          user-select: none;
        }
        &:hover > figcaption {
          opacity: 1;
        }
      }
      & iframe {
        border: 0;
      }
      li p {
        margin: 0 !important;
        display: inline;
      }
      a.anchor {
        border: none;
        :hover {
          background-color: transparent;
          color: ${colors.link};
        }
      }
    `}
  >
    {children}
  </div>
)
