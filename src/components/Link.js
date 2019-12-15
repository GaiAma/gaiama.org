/* global window */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import * as React from 'react'
import PropTypes from 'prop-types'
import { Box, Link as UiLink } from '@theme-ui/components'
// import * as QS from '@gaiama/query-string'
import { Link as GatsbyLink } from 'gatsby'

/**
 * fix custom scroll behaviour using __navigatingToLink
 * by https://github.com/gatsbyjs/gatsby/issues/7454#issuecomment-415786239
 * as reach/router does not (yet) provide the used action for onRouteUpdate
 */
if (typeof window !== `undefined`) {
  window.__navigatingToLink = false
}

const isFqdn = x => !/^\/(?!\/)/.test(x)
const isAnchor = x => /^#/.test(x)

export const Link = React.forwardRef(
  (
    { to, href, as, ext, variant = `default`, target, rel, children, ...props },
    ref
  ) => {
    const url = to || href
    const isExt = ext || isFqdn(url)
    const Tag = as ? as : isExt ? `a` : GatsbyLink
    const linkProps = {
      as: Tag,
      variant,
      ...(!isExt
        ? { to: url }
        : {
            href: url,
          }),
      ...(isExt &&
        !isAnchor(url) && {
          target: target || `_blank`,
          rel: rel || `nofollow noopener noreferrer`,
        }),
    }
    return (
      <Box as="span" {...props} __themeKey="links">
        <UiLink ref={ref} {...linkProps}>
          {children}
        </UiLink>
      </Box>
    )
  }
)
Link.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  variant: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
  as: PropTypes.string,
  ext: PropTypes.bool,
}
Link.defaultProps = {
  variant: `default`,
}

// const Cta = props => (
//   <div
//     {...props}
//     sx={{
//       display: `inline-block`,
//       textAlign: `center`,
//       a: {
//         fontWeight: `400`,
//         borderRadius: `sm`,
//         fontSize: `1.2rem`,
//         backgroundColor: `cta`,
//         color: `#042f37`,
//         border: `none`,
//         padding: `0.5rem 1rem`,
//         ':hover': {
//           color: `white`,
//           backgroundColor: `primary`,
//         },
//       },
//     }}
//   />
// )

// const Link = ({
//   children,
//   to,
//   sort,
//   filter,
//   ext,
//   blank,
//   persistQuery,
//   cta,
//   variant,
//   ...props
// }) => {
//   if (persistQuery) {
//     const qs = QS.parse()
//     if (sort !== undefined) {
//       qs.sort = sort
//     }
//     to = QS.stringify(qs, to)
//   }

//   const isExt = ext || !/^\/(?!\/)/.test(to)

//   const externalLink = (
//     <Box
//       {...props}
//       as="a"
//       href={to}
//       target={blank ? `_blank` : ``}
//       rel="noopener noreferrer"
//       variant={variant}
//     >
//       {children}
//     </Box>
//   )

//   const internalLink = (
//     <Box
//       {...props}
//       as={GatsbyLink}
//       to={to}
//       variant={variant}
//       onClick={() => {
//         window.__navigatingToLink = true
//       }}
//     >
//       {children}
//     </Box>
//   )

//   const link = isExt ? externalLink : internalLink

//   return !cta ? link : <Cta>{link}</Cta>
// }

// Link.propTypes = {
//   to: PropTypes.string,
//   sort: PropTypes.string,
//   filter: PropTypes.string,
//   variant: PropTypes.string,
//   ext: PropTypes.bool,
//   blank: PropTypes.bool,
//   persistQuery: PropTypes.bool,
//   cta: PropTypes.bool,
// }

// Link.defaultProps = {
//   blank: true,
// }

// export default Link
