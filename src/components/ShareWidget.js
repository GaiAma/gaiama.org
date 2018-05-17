import React from 'react'
import PropTypes from 'prop-types'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
  faFacebookSquare,
  faTwitterSquare,
  faGooglePlusSquare,
  faTelegramPlane,
} from '@fortawesome/fontawesome-free-brands/shakable'
import { colors } from '@/theme'

const ShareWidget = ({ label, ...props }) => (
  <div
    css={{
      display: `flex`,
      // justifyContent: `space-between`,
      alignItems: `center`,
      // margin: `4rem auto 3rem`,
      // width: `99%`,
      // [media.greaterThan(`small`)]: { width: `70%` },
      // [media.greaterThan(`large`)]: { width: `50%` },
      // [media.greaterThan(`xlarge`)]: { width: `30%` },
    }}
    {...props}
  >
    {label && <h4 css={{ fontSize: `1.5rem`, margin: 0 }}>{label}</h4>}

    <div css={{ '& svg': { color: colors.brands.facebook, margin: `0 1rem` } }}>
      <a href="https://" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
      </a>
    </div>
    <div css={{ '& svg': { color: colors.brands.twitter, margin: `0 1rem` } }}>
      <a href="https://" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitterSquare} size="lg" />
      </a>
    </div>
    <div css={{ '& svg': { color: colors.brands.gplus, margin: `0 1rem` } }}>
      <a href="https://" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGooglePlusSquare} size="lg" />
      </a>
    </div>
    <div
      css={{ '& svg': { color: colors.brands.telegram, marginLeft: `1rem` } }}
    >
      <a href="https://" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTelegramPlane} size="lg" />
      </a>
    </div>
  </div>
)

ShareWidget.propTypes = {
  label: PropTypes.string,
}

export default ShareWidget
