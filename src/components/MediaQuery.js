import React from 'react'
import PropTypes from 'prop-types'

/**
 * media query helper
 * maybe add json2mq for convenience
 */

export const mediaQuery = mq =>
  typeof window !== `undefined` &&
  /* eslint-disable-next-line no-undef */
  window.matchMedia(mq).matches

export const ReactMedia = ({
  mq,
  onMatch: OnMatch,
  onMisMatch: OnMisMatch,
  children,
  ...props
}) => {
  const matches = mediaQuery(mq)
  if (OnMatch && matches) {
    return <OnMatch {...props} />
  }
  if (OnMisMatch && matches) {
    return <OnMisMatch {...props} />
  }
  return matches && children
}

ReactMedia.propTypes = {
  mq: PropTypes.string,
  onMatch: PropTypes.func,
  onMisMatch: PropTypes.func,
}

export default ReactMedia
