import React from 'react'
import PropTypes from 'prop-types'

const ReferrerMessages = ({
  urlParams: { ref },
  ...props
}) => (
  <div
    css={{}}
    {...props}
  >
    {ref === `example.com` && `Redirected from example.com`}
  </div>
)

ReferrerMessages.propTypes = {
  urlParams: PropTypes.shape({
    ref: PropTypes.string,
  }),
}

export default ReferrerMessages
