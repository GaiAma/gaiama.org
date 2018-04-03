import React from 'react'
import PropTypes from 'prop-types'
import QS from '@/utils/query-string'
import GatsbyLink from 'gatsby-link'

const Link = ({
  children,
  to,
  sort,
  filter,
  ext,
  ...props
}) => {
  const qs = QS.parse()

  if (sort !== undefined) {
    qs.sort = sort
  }

  to = QS.stringify(qs, to)

  if (ext !== undefined) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <GatsbyLink
      exact
      to={to}
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
}

export default Link
