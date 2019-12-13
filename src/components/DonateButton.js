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
  <div
    sx={{
      display: `flex`,
      maxWidth: `14rem`,
      flexDirection: `column`,
      margin: `0 auto`,
    }}
  >
    <Link {...props} sx={{ display: `block` }} />

    {!!paymentOptions && (
      <div
        sx={{
          display: `flex`,
          justifyContent: `space-between`,
          marginTop: `1rem`,
        }}
      >
        <FontAwesomeIcon icon={faPaypal} size="lg" />
        <FontAwesomeIcon
          icon={faCcVisa}
          size="lg"
          sx={{ margin: `0 1rem 0` }}
        />
        <FontAwesomeIcon
          icon={faCcMastercard}
          size="lg"
          sx={{ margin: `0 1rem 0` }}
        />
        <FontAwesomeIcon icon={faCcAmex} size="lg" />
      </div>
    )}
  </div>
)

DonateButton.propTypes = {
  paymentOptions: PropTypes.bool,
}
