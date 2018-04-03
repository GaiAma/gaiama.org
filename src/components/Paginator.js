/** @format */
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import map from 'ramda/src/map'
import { colors } from '@/theme'

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
    }}
  >
    <nav
      aria-label={paginationNavAriaLabel}
      css={{
        display: `flex`,
        justifyContent: `space-between`,
        margin: `2rem 0 1rem`,
        '& > *': {
          padding: `.5rem`,
          margin: `0 1rem`,
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
          color: `#fff`,
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
          <FontAwesomeIcon icon="caret-left" size="lg" />
          <span aria-label={previousPageAriaLabel} css={{ marginLeft: `.5rem` }}>
            {previousPageLabel}
          </span>
        </Link>
      )}

      {next > 0 && (
        <Link to={`${slug}/${next}`}>
          <span aria-label={nextPageAriaLabel} css={{ marginRight: `.5rem` }}>
            {nextPageLabel}
          </span>
          <FontAwesomeIcon icon="caret-right" size="lg" />
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

export {
  Paginator,
  Pager,
}

export const PaginatorFragment = graphql`
  fragment Paginator on RootQueryType {
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