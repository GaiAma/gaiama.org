import React from 'react'
import PropTypes from 'prop-types'
import QS from '@/utils/query-string'
import { Link as GatsbyLink } from 'gatsby'

if (typeof window !== `undefined`) {
  // eslint-disable-next-line
  window.__navigatingToLink = false
}

const Link = ({
  children,
  to,
  sort,
  filter,
  ext,
  blank,
  persistQuery,
  ...props
}) => {
  if (persistQuery) {
    const qs = QS.parse()

    if (sort !== undefined) {
      qs.sort = sort
    }

    to = QS.stringify(qs, to)
  }

  const target = blank ? `_blank` : ``

  return ext !== undefined ? (
    <a href={to} target={target} rel="noopener noreferrer" {...props}>
      {children}
    </a>
  ) : (
    <GatsbyLink
      to={to}
      onClick={() => {
        // eslint-disable-next-line
        window.__navigatingToLink = true
      }}
      {...props}
    >
      {children}
    </GatsbyLink>
  )
}

Link.propTypes = {
  to: PropTypes.string,
  sort: PropTypes.string,
  filter: PropTypes.string,
  ext: PropTypes.string,
  blank: PropTypes.bool,
  persistQuery: PropTypes.bool,
}

Link.defaultProps = {
  blank: true,
}

export default Link
