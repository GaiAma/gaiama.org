/* global window */
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

/**
 * TODO: Maybe instead use https://github.com/Mastermindzh/react-cookie-consent
 */

const CookieBanner = ({ children, onAccept, onReject, ...props }) => {
  const initialConsentState = () =>
    window.localStorage.getItem(`cookie_consent`) || ``
  const [consentState, setConsentState] = useState(initialConsentState)

  // after render, on `consentState` change
  // store state in localStorage and run onAccept() if applicable
  useEffect(() => {
    window.localStorage.setItem(`cookie_consent`, consentState)
    if (consentState === `yes`) {
      onAccept()
    }
    if (consentState === `no`) {
      onReject()
    }
  }, [consentState])

  const setAccept = () => setConsentState(`yes`)
  const setReject = () => setConsentState(`no`)

  return consentState ? null : children({ setAccept, setReject })
}

CookieBanner.propTypes = {
  children: PropTypes.func,
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
}
CookieBanner.defaultProps = {
  children: () => {},
  onAccept: () => {},
  onReject: () => {},
}

export { CookieBanner }
