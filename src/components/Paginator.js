import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons/faCaretLeft'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight'
import map from 'ramda/src/map'
import { colors, media } from '@src/theme'

const Paginator = ({
  pagination,
  pageNr,
  slug,
  paginationNavAriaLabel,
  currentAriaLabel,
  pageNrAriaLabel,
  ...props
}) => (
  <div
    css={{
      display: `flex`,
      justifyContent: `center`,
      position: `relative`,
      margin: `2rem 0 1rem`,
    }}
  >
    <div
      css={{
        '&:before': {
          content: `""`,
          height: `1px`,
          width: `100%`,
          position: `absolute`,
          display: `block`,
          top: `50%`,
          left: `0`,
          right: `0`,
          // background: `linear-gradient(to right, #cccccc21, #ccc, #cccccc21) no-repeat`,
          background: `linear-gradient(to right, rgba(204,204,204,0.13), #ccc, rgba(204,204,204,0.13)) no-repeat`,
        },
      }}
    >
      <nav
        aria-label={paginationNavAriaLabel}
        css={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          position: `relative`,
          background: `#fff`,
          '& > *': {
            padding: `.5rem`,
            margin: `0 0.4rem`,
            [media.greaterThan(`medium`)]: {
              margin: `0 1rem`,
            },
          },
        }}
      >
        {map(i => {
          const isCurrent = i === pageNr
          if ([`prev`, `next`].includes(i)) {
            return <span key={i}>…</span>
          }

          if (isCurrent) {
            return (
              <span
                key={i}
                aria-label={`${currentAriaLabel} ${i}`}
                aria-current="true"
              >
                {i}
              </span>
            )
          }

          return (
            <Link
              key={i}
              to={`${slug}/${i === 1 ? `` : i}`}
              role="menuitem"
              aria-label={`${pageNrAriaLabel} ${i}`}
              aria-current={false}
              css={{
                fontWeight: isCurrent && `bold`,
              }}
            >
              {i}
            </Link>
          )
        }, pagination)}
      </nav>
    </div>
  </div>
)

Paginator.propTypes = {
  pagination: PropTypes.array,
  pageNr: PropTypes.number,
  slug: PropTypes.string,
  paginationNavAriaLabel: PropTypes.string,
  currentAriaLabel: PropTypes.string,
  pageNrAriaLabel: PropTypes.string,
}

const Pager = ({
  next,
  previous,
  slug,
  pagerNavAriaLabel,
  nextPageLabel,
  nextPageAriaLabel,
  previousPageLabel,
  previousPageAriaLabel,
  ...props
}) => (
  <div
    css={{
      display: `flex`,
      justifyContent: `center`,
    }}
  >
    <nav
      aria-label={pagerNavAriaLabel}
      css={{
        display: `flex`,
        justifyContent: `space-around`,
        '& > a': {
          background: colors.link,
          color: colors.white,
          borderRadius: `2px`,
          padding: `.5rem 1rem`,
          margin: `1rem`,
          display: `flex`,
          justifyContent: `space-between`,
          alignItems: `center`,
        },
      }}
    >
      {previous > 0 && (
        <Link to={`${slug}/${previous === 1 ? `` : previous}`}>
          <FontAwesomeIcon icon={faCaretLeft} size="lg" />
          <span
            aria-label={previousPageAriaLabel}
            css={{ marginLeft: `.5rem` }}
          >
            {previousPageLabel}
          </span>
        </Link>
      )}

      {next > 0 && (
        <Link to={`${slug}/${next}`}>
          <span aria-label={nextPageAriaLabel} css={{ marginRight: `.5rem` }}>
            {nextPageLabel}
          </span>
          <FontAwesomeIcon icon={faCaretRight} size="lg" />
        </Link>
      )}
    </nav>
  </div>
)

Pager.propTypes = {
  next: PropTypes.number,
  previous: PropTypes.number,
  slug: PropTypes.string,
  pagerNavAriaLabel: PropTypes.string,
  nextPageLabel: PropTypes.string,
  nextPageAriaLabel: PropTypes.string,
  previousPageLabel: PropTypes.string,
  previousPageAriaLabel: PropTypes.string,
}

export { Paginator, Pager }

export const PaginatorFragment = graphql`
  fragment Paginator on Query {
    Paginator: paginatorAml(frontmatter: { lang: { eq: $lang } }) {
      frontmatter {
        paginationNavAriaLabel
        pagerNavAriaLabel
        nextPageLabel
        nextPageAriaLabel
        previousPageLabel
        previousPageAriaLabel
        currentAriaLabel
        pageNrAriaLabel
      }
    }
  }
`
