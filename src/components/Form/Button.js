import React from 'react'
import PropTypes from 'prop-types'
import { colors, fontFamilies } from '@src/theme'

const Input = ({ children, onClick, ...props }) => (
  <div css={styles.wrapper} {...props}>
    <button css={styles.button} onClick={onClick}>
      {children}
    </button>
  </div>
)

Input.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}
Input.defaultProps = {
  label: ``,
  onClick() {},
}

export default Input

const styles = {
  wrapper: {
    marginBottom: `1rem`,
  },
  button: {
    fontFamily: fontFamilies.accent,
    fontSize: `1.5rem`,
    width: `100%`,
    border: `1px solid ${colors.gray3}`,
    background: colors.white,
    transition: `background-color .2s linear`,
    '& svg': {
      visibility: `hidden`,
    },
    '&:hover': {
      background: colors.primaryLite,
      color: colors.darkWhite,
      '& svg': { visibility: `visible` },
    },
  },
}
