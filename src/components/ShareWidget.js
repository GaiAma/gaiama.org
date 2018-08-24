import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { colors, media } from '@/theme'

const ShareWidget = ({ label, post, siteUrl, ...props }) => (
  <div
    css={{
      [media.greaterThan(`xsmall`)]: {
        display: `flex`,
        alignItems: `center`,
      },
      // justifyContent: `space-between`,
      // margin: `4rem auto 3rem`,
      // width: `99%`,
      // [media.greaterThan(`small`)]: { width: `70%` },
      // [media.greaterThan(`large`)]: { width: `50%` },
      // [media.greaterThan(`xlarge`)]: { width: `30%` },
    }}
    {...props}
  >
    {label && (
      <h4
        css={{
          fontSize: `1.5rem`,
          margin: 0,
          marginRight: `2rem`,
          [media.lessThan(`xsmall`)]: { marginBottom: `1rem` },
        }}
      >
        {label}
      </h4>
    )}

    <div
      css={{
        display: `flex`,
        alignItems: `center`,
      }}
    >
      <div
        css={{
          '& svg': { color: colors.brands.facebook, marginRight: `1rem` },
        }}
      >
        <a
          href={`http://www.facebook.com/sharer.php?u=${encodeURIComponent(
            siteUrl + post.frontmatter.slug
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={[`fab`, `facebook-square`]} size="lg" />
        </a>
      </div>
      <div
        css={{ '& svg': { color: colors.brands.twitter, margin: `0 1rem` } }}
      >
        <a
          href={
            post.frontmatter.tweet_id
              ? `https://twitter.com/intent/retweet?tweet_id=${encodeURIComponent(
                  post.frontmatter.tweet_id
                )}`
              : `http://twitter.com/share?text=${encodeURIComponent(
                  post.frontmatter.title
                )}&url=${encodeURIComponent(siteUrl + post.frontmatter.slug)}`
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={[`fab`, `twitter-square`]} size="lg" />
        </a>
      </div>
      <div css={{ '& svg': { color: colors.brands.gplus, margin: `0 1rem` } }}>
        <a
          href={`https://plus.google.com/share?url=${encodeURIComponent(
            siteUrl + post.frontmatter.slug
          )}&hl=${encodeURIComponent(post.frontmatter.lang)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={[`fab`, `google-plus-square`]} size="lg" />
        </a>
      </div>
      <div
        css={{ '& svg': { color: colors.brands.telegram, marginLeft: `1rem` } }}
      >
        <a
          href={`https://telegram.me/share/url?url=${encodeURIComponent(
            siteUrl + post.frontmatter.slug
          )}&text=${encodeURIComponent(post.frontmatter.title)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={[`fab`, `telegram-plane`]} size="lg" />
        </a>
      </div>
    </div>
  </div>
)

ShareWidget.propTypes = {
  label: PropTypes.string,
  post: PropTypes.object,
  siteUrl: PropTypes.string,
}

export default ShareWidget
