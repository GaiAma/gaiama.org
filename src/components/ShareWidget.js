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
      justifyContent: `space-between`,
      alignItems: `center`,
      width: `30%`,
      margin: `4rem auto 0`,
    }}
    {...props}
  >
    {label &&
      <h4 css={{ fontSize: `1.5rem`, margin: 0 }}>
        {label}
      </h4>
    }

    <div css={{ '& svg': { color: colors.brands.facebook } }}>
      <a href="https://" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
      </a>
    </div>
    <div css={{ '& svg': { color: colors.brands.twitter } }}>
      <a href="https://" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitterSquare} size="lg" />
      </a>
    </div>
    <div css={{ '& svg': { color: colors.brands.gplus } }}>
      <a href="https://" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGooglePlusSquare} size="lg" />
      </a>
    </div>
    <div css={{ '& svg': { color: colors.brands.telegram } }}>
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
