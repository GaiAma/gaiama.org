import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { keyframes } from 'glamor'
// import { colors } from '@/theme'

const messages = {
  en: {
    'happygaia.com': { message: `HappyGaia is now GaiAma` },
    'subscribed-to-newsletter': {
      // type: `success`,
      message: `Thanks for having successfully subscribed to our newsletter :-)`,
    },
  },
  de: {
    'happygaia.com': { message: `HappyGaia ist jetzt GaiAma` },
    'subscribed-to-newsletter': {
      // type: `success`,
      message: `Du hast dich erfolgreich für unseren Newsletter angemeldet, vielen Dank :-)`,
    },
  },
}

class ReferrerMessages extends Component {
  constructor(props) {
    super(props)
    ;(this.element = null),
      (this.state = {
        height: 0,
      })
  }

  componentDidMount() {
    this.setState({ height: this.element.clientHeight })
  }

  render() {
    const {
      urlParams: { ref },
      lang,
      ...props
    } = this.props

    // const slideDown = keyframes({
    //   '10%': { top: 0 },
    //   '80%': { top: 0 },
    //   '100%': { top: `-${this.state.height}px` },
    // })

    const { message } = messages[lang][ref]
    // const { type, message } = messages[lang][ref]
    return (
      <div
        ref={x => {
          this.element = x
        }}
        css={{
          // animation: `${slideDown} 10s ease-in-out 3s forwards`,
          // // animation: `${slideDown} 10s cubic-bezier(0, .2, .5, 0) 3s forwards`,
          // background: colors[type],
          // position: `absolute`,
          // left: 0,
          // right: 0,
          // top: `-${this.state.height}px`,
          // zIndex: 10,
          // color: `#fff`,
          fontWeight: 500,
          letterSpacing: `.03rem`,
          padding: `.5rem 1rem`,
          textAlign: `center`,
        }}
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
