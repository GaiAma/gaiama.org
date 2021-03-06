/* global document, window */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Component } from 'react'
import PropTypes from 'prop-types'
import isEmail from 'validator/lib/isEmail'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner'
import { colors, fontFamilies } from '@src/theme'
import { Button } from '@components/layout/Button'
import { Link } from '@components/Link'
import localStore from '@src/utils/local-store'
import { request } from '@src/utils/request'

const inputStyle = {
  width: `100%`,
  border: `1px solid`,
  borderColor: `gray3`,
  backgroundColor: `white`,
  lineHeight: 1.5,
  padding: `0 .5rem`,
  borderRadius: `sm`,
}

const StyledInput = props => <input sx={inputStyle} {...props} />
const StyledTextarea = props => <textarea sx={inputStyle} {...props} />

const initialState = {
  values: {
    email: ``,
    message: ``,
    consent: false,
  },
  errors: {
    email: ``,
    message: ``,
    general: ``,
  },
  attempts: 0,
  generalError: ``,
  hasSucceeded: false,
  isSubmitting: false,
}

export default class ContactForm extends Component {
  static propTypes = {
    emailLabel: PropTypes.string,
    emailPlaceholder: PropTypes.string,
    emailErrorLabel: PropTypes.string,
    consentErrorLabel: PropTypes.string,
    requiredLabel: PropTypes.string,
    minLengthErrorLabel: PropTypes.string,
    minMessageLength: PropTypes.number,
    bbcodeErrorLabel: PropTypes.string,
    toQuickLabel: PropTypes.string,
    generalErrorLabel: PropTypes.string,
    messageLabel: PropTypes.string,
    privacyLabel: PropTypes.string,
    privacyLink: PropTypes.string,
    consentLabel: PropTypes.string,
    submitLabel: PropTypes.string,
    success: PropTypes.string,
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
    this.state = initialState
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

    const val =
      type === `checkbox`
        ? checked
        : name === `email`
        ? value.replace(/\s/g, ``)
        : value

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

    return this.submit()
  }

  checkTime() {
    // from https://stackoverflow.com/a/2024230/3484824
    // & https://stackoverflow.com/a/59887628/3484824
    // or just? https://stackoverflow.com/a/2024243/3484824
    return (
      Math.abs(Math.round((this.initTime - new Date().getTime()) / 1000)) < 10
    )
  }

  submit(autoRetry) {

    // if (this.state.attempts > 2 && autoRetry) {
    //   return this.setState({
    //     isSubmitting: false,
    //     generalError: this.props.generalErrorLabel,
    //   })
    // }

    const errors = {}
    this.setState({ isSubmitting: true, generalError: ``, errors })

    const { email, message, consent } = this.state.values
    const msg = message.trim()

    if (!isEmail(email)) {
      errors.email = this.props.emailErrorLabel
    }

    if (!msg) {
      errors.message = this.props.requiredLabel
    }

    const whitespaceWithinRegexp = /.+\s.+/g
    if (
      msg.length < this.props.minMessageLength ||
      !whitespaceWithinRegexp.test(msg)
    ) {
      errors.message = this.props.minLengthErrorLabel
    }

    const containsBBCode = /\[url[=\]].*\[\/url\]/is
    if (containsBBCode.test(msg)) {
      errors.message = this.props.bbcodeErrorLabel
    }

    // TODO: consider http://api.stopforumspam.org/api?emailhash=
    // using https://www.npmjs.com/package/crypto-js in browser
    // or https://www.npmjs.com/package/pure-md5 might be smaller 1.9KB
    // in node require('crypto').createHash('md5').update('hello world').digest('hex')
    // https://stackoverflow.com/questions/1655769/fastest-md5-implementation-in-javascript
    // inspiration https://plugins.trac.wordpress.org/browser/antispam-bee/branches/2.6.5/antispam_bee.php

    if (!consent) {
      errors.consent = this.props.consentErrorLabel
    }

    if (errors.email || errors.message || errors.consent) {
      return this.setState({ errors, isSubmitting: false })
    }

    // this.increaseAttempts()

    if (this.checkTime()) {
      return this.setState({
        isSubmitting: false,
        generalError: this.props.toQuickLabel,
      })
    }

    // const sanitizedMessage = message
    //   // // replace multiple line breaks (2 and more) by <br><br>
    //   // .replace(/(\r\n|\n\r|\r|\n){2,}/g, `<br><br>`)
    //   // // replace single line breaks by <br>
    //   // .replace(/(\r\n|\n\r|\r|\n)/g, `<br>`)
    //   .trim()

    const payload = [
      `email=${encodeURIComponent(email)}`,
      `lang=${encodeURIComponent(this.props.lang)}`,
      `message=${encodeURIComponent(msg)}`,
    ]

    // if (process.env.NODE_ENV !== `production`) {
    //   return this.reset()
    // }

    return request
      .post(this.props.endpoint, payload.join(`&`))
      .then((result) => {
        // console.log({ result })
        if (result === `Ok`) {
          this.reset()
          return this.setState({ hasSucceeded: true }, () => {
            const el = document.getElementById(`success`)
            el && window.scrollTo(0, el.offsetTop - 90)
          })
        }
        throw new Error({ generalError: this.props.generalErrorLabel })
      })
      .catch(() => {
        // this.increaseAttempts()
        // this.submit(true)
        throw new Error({ generalError: this.props.generalErrorLabel })
      })
      .then(() => this.setState({ isSubmitting: false }))
  }

  // increaseAttempts() {
  //   this.setState({ attempts: this.state.attempts + 1 })
  // }

  reset() {
    this.setState({
      ...initialState,
      values: initialState.values,
      errors: initialState.errors,
    })
    localStore.removeItem(`ContactForm`)
  }

  textareaHeight() {
    const { message } = this.state.values
    const tabCount = (message.match(/\n/g) || []).length
    const messageLength = message.length / 120
    if (messageLength < 0) return Math.ceil(tabCount + 4)
    return Math.ceil(tabCount + messageLength + 8)
  }

  render() {
    const {
      emailLabel,
      emailPlaceholder,
      messageLabel,
      submitLabel,
      endpoint,
      consentLabel,
      privacyLabel,
      privacyLink,
    } = this.props
    const {
      values,
      errors,
      generalError,
      hasSucceeded,
      isSubmitting,
    } = this.state

    if (hasSucceeded) {
      return (
        <div
          id="success"
          sx={{
            backgroundColor: `white`,
            border: `1px solid`,
            borderColor: `success`,
            color: `success`,
            padding: `0.5rem 0.5rem 0.4rem`,
          }}
        >
          {this.props.success}
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
        <div
          sx={{
            position: `relative`,
            paddingBottom: `1.4rem`,
            '& input': {
              borderColor: `${errors.email && `failure`}`,
            },
          }}
        >
          <label>
            <div
              sx={{
                fontFamily: `accent`,
                fontSize: `1.5rem`,
              }}
            >
              {emailLabel}
            </div>
            <StyledInput
              name="email"
              type="email"
              onChange={this.handleChange}
              value={values.email}
              placeholder={emailPlaceholder}
              readOnly={this.state.isSubmitting}
              required
              aria-required="true"
            />
            {errors.email && (
              <div
                sx={{
                  // position: `absolute`,
                  color: `failure`,
                  marginTop: `0.4rem`,
                  border: `1px solid`,
                  borderColor: `failure`,
                  fontSize: `0.9rem`,
                }}
              >
                {errors.email}
              </div>
            )}
          </label>
        </div>

        <div
          sx={{
            position: `relative`,
            // paddingBottom: `1.4rem`,
            '& textarea': {
              borderColor: `${errors.email && `failure`}`,
            },
          }}
        >
          <label>
            <div
              sx={{
                fontFamily: `accent`,
                fontSize: `1.5rem`,
              }}
            >
              {messageLabel}
            </div>
            <StyledTextarea
              name="message"
              value={values.message}
              onChange={this.handleChange}
              readOnly={this.state.isSubmitting}
              required
              aria-required="true"
              sx={{
                height: `${this.textareaHeight()}rem`,
                minHeight: `8rem`,
                maxHeight: `25rem`,
              }}
            />
            {errors.message && (
              <div
                sx={{
                  // position: `absolute`,
                  color: `failure`,
                  marginTop: `0.4rem`,
                  border: `1px solid`,
                  borderColor: `failure`,
                  fontSize: `0.9rem`,
                }}
              >
                {errors.message}
              </div>
            )}
          </label>
        </div>

        <div
          sx={{
            position: `relative`,
            marginTop: `1rem`,
            paddingBottom: `1.4rem`,
            color: `${errors.consent && `failure`}`,
          }}
        >
          <label>
            <input
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={this.handleChange}
              value={values.consent}
              disabled={this.state.isSubmitting}
            />
            <span
              sx={{
                fontSize: `0.9rem`,
                margin: `0 0.5rem`,
              }}
              dangerouslySetInnerHTML={{ __html: consentLabel }}
            />
            <Link to={privacyLink} variant="plain">
              {privacyLabel}
            </Link>
            {errors.consent && (
              <div
                sx={{
                  // position: `absolute`,
                  color: `failure`,
                  marginTop: `0.4rem`,
                  border: `1px solid`,
                  borderColor: `failure`,
                  fontSize: `0.9rem`,
                }}
              >
                {errors.consent}
              </div>
            )}
          </label>
        </div>

        {generalError && (
          <div
            sx={{
              border: `1px solid`,
              borderColor: `failure`,
              padding: `0.5rem 0.5rem 0.4rem`,
              marginBottom: `0.5rem`,
              color: `failure`,
              fontSize: `0.9rem`,
            }}
          >
            {generalError}
          </div>
        )}

        <Button
          disabled={isSubmitting}
          sx={{
            ...styles.button,
            backgroundColor: `purpleDark`,
            color: `darkWhite`,
            borderRadius: `md`,
          }}
        >
          {isSubmitting ? (
            <FontAwesomeIcon icon={faSpinner} size="xs" spin />
          ) : (
            submitLabel
          )}
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
    border: `1px solid ${colors.gray3}`,
    background: colors.white,
    transition: `background-color .2s linear`,
    '&:hover': {
      background: colors.primaryLite,
      color: colors.darkWhite,
    },
  },
}
