/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { colors } from '@src/theme'

/**
 * hiding outline for pointing devices based on
 * http://kizu.ru/en/blog/keyboard-only-focus/#proper-solution
 */
const PureButton = ({ children, onClick, styles, ...props }) => (
  <button
    tabIndex={0}
    onClick={onClick}
    sx={{
      ...styles,
      '&:focus, & > span:focus': {
        outline: `none`,
      },
      '&:not(:-moz-focusring):focus > span': {
        boxShadow: `none`,
      },
      '&:focus > span': {
        boxShadow: `0 0 3px 2px ${colors.blueLight}`,
      },
    }}
    {...props}
  >
    <span
      tabIndex={-1}
      sx={{
        position: `relative`,
        padding: `0 0.2rem`,
      }}
    >
      {children}
    </span>
  </button>
)
PureButton.propTypes = {
  onClick: PropTypes.func,
  styles: PropTypes.object,
}
PureButton.defaultProps = {
  onClick() {},
  styles: {},
}

const Button = PureButton

export default Button
export { Button, PureButton }
