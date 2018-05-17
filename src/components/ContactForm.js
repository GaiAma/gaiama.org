import React, { Component } from 'react'
import PropTypes from 'prop-types'
import g from 'glamorous'
import isEmail from 'validator/lib/isEmail'
import { colors, fontFamilies } from '@/theme'
import { Button } from '@/components/layout/Button'
import TextareaAutosize from 'react-textarea-autosize'
import localStore from '@/utils/local-store'
import axios from 'axios'

axios.defaults.headers.post[`Content-Type`] = `application/json`

const StyledInput = g.input({
  width: `100%`,
  border: `1px solid #ccc`,
  background: `#fff`,
  lineHeight: 1.5,
  padding: `0 .5rem`,
})

export default class ContactForm extends Component {
  static propTypes = {
    emailLabel: PropTypes.string,
    emailPlaceholder: PropTypes.string,
    emailErrorLabel: PropTypes.string,
    requiredLabel: PropTypes.string,
    generalErrorLabel: PropTypes.string,
    messageLabel: PropTypes.string,
    consentLabel: PropTypes.string,
    submitLabel: PropTypes.string,
    lang: PropTypes.string,
    endpoint: PropTypes.string,
  }
  static defaultProps = {
    emailLabel: ``,
    emailPlaceholder: ``,
    emailErrorLabel: ``,
    messageLabel: ``,
    consentLabel: ``,
    submitLabel: ``,
    lang: `en`,
  }
  constructor(props) {
    super(props)
    this.state = {
      values: {
        email: ``,
        message: ``,
      },
      errors: {
        email: ``,
        message: ``,
        general: ``,
      },
      generalError: ``,
      successMsg: ``,
      isSubmitting: false,
    }
    if (!typeof window !== `undefined`) {
      this.state.values = {
        ...this.state.values,
        ...localStore.getItem(`ContactForm`),
      }
    }
  }

  hasErrors = () => Object.values(this.state.errors).filter(x => x).length

  handleChange = event => {
    const { type, name, checked, value } = event.target
    const val = type === `checkbox` ? checked : value
    this.setState(
      {
        values: {
          ...this.state.values,
          [name]: val,
        },
      },
      () => localStore.setItem(`ContactForm`, this.state.values)
    )
  }

  handleSubmit = event => {
    if (typeof window === `undefined`) {
      return this.setState({ generalError: `error` })
    }

    event.preventDefault()
    this.setState({ isSubmitting: true, generalError: ``, errors: {} })
    const errors = {}
    const { email, message, consent } = this.state.values

    if (!isEmail(email)) {
      errors.email = this.props.emailErrorLabel
    }

    if (!message.trim()) {
      errors.message = this.props.requiredLabel
    }

    if (!consent) {
      errors.consent = true
    }

    if (errors.email || errors.message) {
      return this.setState({ errors, isSubmitting: false })
    }

    return axios
      .post(`${this.props.endpoint}?c=${Math.random()}`, {
        email: email.trim(),
        // preserve whitespace & line-breaks https://stackoverflow.com/a/9141737/3484824
        message: message.trim(), //.replace(/(\r\n|\n\r|\r|\n)/g, `&nbsp;`),
        lang: this.props.lang,
      })
      .then(({ data }) => {
        if (data && data.msg === `OK`) {
          localStore.removeItem(`ContactForm`)
          this.setState({ generalError: `` })
          return this.setState({ successMsg: `success` })
        }
        throw new Error({ generalError: this.props.generalErrorLabel })
      })
      .catch(err => {
        this.setState({ generalError: this.props.generalErrorLabel })
      })
      .then(() => this.setState({ isSubmitting: false }))
  }

  componentDidMount() {}

  render() {
    const {
      emailLabel,
      emailPlaceholder,
      messageLabel,
      submitLabel,
      endpoint,
      consentLabel,
    } = this.props
    const {
      values,
      errors,
      generalError,
      successMsg,
      isSubmitting,
    } = this.state

    if (successMsg) {
      return (
        <div
          css={{
            border: `1px solid green`,
            color: `green`,
            padding: `.5rem .5rem .4rem`,
          }}
        >
          {successMsg}
        </div>
      )
    }

    return (
      <form
        action={endpoint}
        method="post"
        onSubmit={this.handleSubmit}
        noValidate
      >
        <div css={{ position: `relative`, paddingBottom: `1.4rem` }}>
          <label>
            <div css={{ fontFamily: fontFamilies.accent, fontSize: `1.5rem` }}>
              {emailLabel}
            </div>
            <StyledInput
              name="email"
              type="email"
              onChange={this.handleChange}
              value={values.email}
              placeholder={emailPlaceholder}
              required
              css={{
                width: `100%`,
                border: errors.email && `1px solid red`,
              }}
            />
            {errors.email && (
              <div
                css={{ position: `absolute`, color: `red`, fontSize: `.9rem` }}
              >
                {errors.email}
              </div>
            )}
          </label>
        </div>

        <div
          css={{
            position: `relative`,
            paddingBottom: `1.4rem`,
          }}
        >
          <label>
            <div css={{ fontFamily: fontFamilies.accent, fontSize: `1.5rem` }}>
              {messageLabel}
            </div>
            <TextareaAutosize
              name="message"
              value={values.message}
              onInput={this.handleChange}
              maxRows={10}
              required
              css={{
                minHeight: `8rem`,
                width: `100%`,
              }}
            />
            {errors.message && (
              <div
                css={{ position: `absolute`, color: `red`, fontSize: `.9rem` }}
              >
                {errors.message}
              </div>
            )}
          </label>
        </div>

        <div
          css={{
            position: `relative`,
            paddingBottom: `1.4rem`,
            color: errors.consent && `red`,
          }}
        >
          <label>
            <input
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={this.handleChange}
              value={values.consent}
            />
            <span css={{ fontSize: `.9rem`, marginLeft: `.5rem` }}>
              {consentLabel}
            </span>
            {errors.consent && (
              <div
                css={{ position: `absolute`, color: `red`, fontSize: `.9rem` }}
              >
                {errors.consent}
              </div>
            )}
          </label>
        </div>

        {generalError && (
          <div
            css={{
              border: `1px solid red`,
              padding: `.5rem .5rem .4rem`,
              marginBottom: `.5rem`,
              color: `red`,
              fontSize: `.9rem`,
            }}
          >
            {generalError}
          </div>
        )}

        <Button
          label="Submit"
          disabled={isSubmitting}
          css={{
            ...styles.button,
            background: `#2d2a34`,
            color: colors.darkWhite,
          }}
        >
          {isSubmitting ? `loading...` : submitLabel}
        </Button>
      </form>
    )
  }
}

const styles = {
  button: {
    fontFamily: fontFamilies.accent,
    fontSize: `1.5rem`,
    width: `100%`,
    border: `1px solid #ccc`,
    background: `#fff`,
    transition: `background-color .2s linear`,
    '&:hover': {
      background: colors.primaryLite,
      color: colors.darkWhite,
    },
  },
}
