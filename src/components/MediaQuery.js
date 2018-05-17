import React from 'react'
import PropTypes from 'prop-types'

/**
 * media query helper
 * TODO add json2mq for convenience
 * TODO add resize listener
 * inspiration
 *  - 💚 https://github.com/bvaughn/react-virtualized/blob/master/source/vendor/detectElementResize.js
 *  - https://stackoverflow.com/a/48123390/3484824
 *  - https://stackoverflow.com/a/47275732/3484824
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
