import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { fontFamilies } from '@/theme'

export default class NewsletterWidget extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    bgColor: PropTypes.string,
  }
  static defaultProps = {
    bgColor: `#073135`,
  }

  constructor (props) {
    super(props)
    this.state = {
      email: ``,
    }
  }

  onEmail = event =>
    this.setState({ email: event.target.value })

  onSubmit = event => {
    event.preventDefault()
  }

  render () {
    const { placeholder, buttonLabel, bgColor, ...props } = this.props
    const { email } = this.state

    return (
      <form
        onSubmit={this.onSubmit}
        css={{
          background: `#fff`,
          border: `2px solid ${bgColor}`,
          padding: `1rem 1.2rem`,
        }}
        {...props}
      >
        <label css={{
          display: `block`,
          position: `relative`,
          marginBottom: `.5rem`,
        }}>
          {!email.length && <span
            css={{
              position: `absolute`,
              left: `50%`,
              transform: `translateX(-50%)`,
              fontFamily: fontFamilies.main,
              letterSpacing: `.05rem`,
              color: `#777`,
            }}
          >
            {placeholder}
          </span>}

          <input
            type="email"
            onInput={this.onEmail}
            css={{
              background: `transparent`,
              border: `0`,
              borderBottom: `1px solid #ddd`,
              outline: `none`,
              width: `100%`,
            }}
          />
        </label>

        <div css={{
          textAlign: `center`,
        }}>
          <button css={{
            fontFamily: fontFamilies.accent,
            fontSize: `1.3rem`,
            border: `1px solid #777`,
            background: `transparent`,
            lineHeight: 1.2,
            letterSpacing: `.1rem`,
          }}>
            {buttonLabel}
          </button>
        </div>
      </form>
    )
  }
}
