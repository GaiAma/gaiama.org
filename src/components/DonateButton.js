/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaypal } from '@fortawesome/free-brands-svg-icons/faPaypal'
import { faCcVisa } from '@fortawesome/free-brands-svg-icons/faCcVisa'
import { faCcMastercard } from '@fortawesome/free-brands-svg-icons/faCcMastercard'
import { faCcAmex } from '@fortawesome/free-brands-svg-icons/faCcAmex'
import Link from '@components/Link'

export const DonateButton = ({ paymentOptions = false, ...props }) => (
  <div>
    <Link {...props} />

    {!!paymentOptions && (
      <div sx={{ display: `flex` }}>
        <FontAwesomeIcon icon={faPaypal} />
        <FontAwesomeIcon icon={faCcVisa} />
        <FontAwesomeIcon icon={faCcMastercard} />
        <FontAwesomeIcon icon={faCcAmex} />
      </div>
    )}
  </div>
)

DonateButton.propTypes = {
  paymentOptions: PropTypes.bool,
}
