import React from 'react'
import PropTypes from 'prop-types'
// import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
  colors,
  fontFamilies,
} from '@/theme'

const Input = ({
  label,
  onClick,
  ...props
}) => (
  <div
    css={{
      marginBottom: `1rem`,
      // textAlign: `right`,
    }}
    {...props}
  >
    <button
      css={{
        fontFamily: fontFamilies.accent,
        fontSize: `1.5rem`,
        width: `100%`,
        border: `1px solid #ccc`,
        background: `#fff`,
        transition: `background-color .2s linear`,
        '& svg': {
          visibility: `hidden`,
        },
        '&:hover': {
          background: colors.primaryLite,
          color: colors.darkWhite,
          '& svg': { visibility: `initial` },
        },
      }}
      onClick={onClick}
    >
      {label}
      {/* <FontAwesomeIcon icon={[`fas`, `check`]} /> */}
    </button>
  </div>
)

Input.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}
Input.defaultProps = {
  label: ``,
  onClick: () => {},
}

export default Input
