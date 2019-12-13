/* global window */
/** @jsx jsx */
import { jsx } from 'theme-ui'
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

const Cta = props => (
  <div
    {...props}
    sx={{
      display: `inline-block`,
      textAlign: `center`,
      a: {
        fontWeight: `400`,
        borderRadius: `sm`,
        fontSize: `1.2rem`,
        backgroundColor: `cta`,
        color: `#042f37`,
        border: `none`,
        padding: `0.5rem 1rem`,
        ':hover': {
          color: `white`,
          backgroundColor: `primary`,
        },
      },
    }}
  />
)

const Link = ({
  children,
  to,
  sort,
  filter,
  ext,
  blank,
  persistQuery,
  cta,
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

  const link = isExt ? externalLink : internalLink

  return !cta ? link : <Cta>{link}</Cta>
}

Link.propTypes = {
  to: PropTypes.string,
  sort: PropTypes.string,
  filter: PropTypes.string,
  ext: PropTypes.bool,
  blank: PropTypes.bool,
  persistQuery: PropTypes.bool,
  cta: PropTypes.bool,
}

Link.defaultProps = {
  blank: true,
}

export default Link
