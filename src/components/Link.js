/* global window */
import React from 'react'
import PropTypes from 'prop-types'
import * as QS from '@gaiama/query-string'
import { Link as GatsbyLink } from 'gatsby'

/**
 * fix custom scroll behaviour using __navigatingToLink
 * by https://github.com/gatsbyjs/gatsby/issues/7454#issuecomment-415786239
 * as reach/router does not (yet) provide the used action for onRouteUpdate
 */
if (typeof window !== `undefined`) {
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

  const isExt = ext || !/^\/(?!\/)/.test(to)

  const externalLink = (
    <a
      {...props}
      href={to}
      target={blank ? `_blank` : ``}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )

  const internalLink = (
    <GatsbyLink
      {...props}
      to={to}
      onClick={() => {
        window.__navigatingToLink = true
      }}
    >
      {children}
    </GatsbyLink>
  )

  return isExt ? externalLink : internalLink
}

Link.propTypes = {
  to: PropTypes.string,
  sort: PropTypes.string,
  filter: PropTypes.string,
  ext: PropTypes.bool,
  blank: PropTypes.bool,
  persistQuery: PropTypes.bool,
}

Link.defaultProps = {
  blank: true,
}

export default Link
