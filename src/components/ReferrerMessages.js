import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { toast } from '@src/utils/toast'

// TODO move messages to /content
const messages = {
  en: {
    'happygaia.com': `HappyGaia is now GaiAma`,
    subscribed: `Thanks for successfully subscribing to our newsletter. 😃`,
    unsubscribed: `You've been successfully unsubscribed from our newsletter. 😌`,
    alreadyunsubscribed: `You've already successfully unsubscribed. 😌`,
    unsubscribeerror: `Sorry an error occurred, please try again or send us a message via contact form. 😳`,
  },
  de: {
    'happygaia.com': `HappyGaia ist jetzt GaiAma`,
    subscribed: `Du hast dich erfolgreich für unseren Newsletter angemeldet, vielen Dank. 😃`,
    unsubscribed: `Du wurdest erfolgreich von unserem Newsletter abgemeldet. 😌`,
    alreadyunsubscribed: `Du wurdest bereits erfolgreich abgemeldet. 😌`,
    unsubscribeerror: `Bitte entschuldige, es gab ein Problem. Bitte versuche es erneut oder sende uns eine Nachricht über das Kontaktformular. 😳`,
  },
}

class ReferrerMessages extends Component {
  componentDidMount() {
    const {
      urlParams: { ref },
      lang,
    } = this.props
    if (messages[lang][ref]) {
      toast.success(messages[lang][ref])
    }
  }

  render() {
    const {
      urlParams: { ref },
      lang,
      ...props
    } = this.props

    const message = messages[lang][ref]
    if (!message) return null

    return (
      <div
        css={css`
          font-weight: 500;
          letter-spacing: 0.03rem;
          padding: 0.5rem 1rem;
          text-align: center;
        `}
        {...props}
      >
        {message}
      </div>
    )
  }
}
ReferrerMessages.propTypes = {
  urlParams: PropTypes.shape({
    ref: PropTypes.string,
  }),
  lang: PropTypes.string,
}

export default ReferrerMessages
