/* global document, window */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import isEmail from 'validator/lib/isEmail'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner'
import { colors, fontFamilies } from '@src/theme'
import { Button } from '@components/layout/Button'
import TextareaAutosize from 'react-textarea-autosize'
import localStore from '@src/utils/local-store'

axios.defaults.headers.post[`Content-Type`] = `application/json`

const inputStyle = {
  width: `100%`,
  border: `1px solid`,
  borderColor: `gray3`,
  backgroundColor: `white`,
  lineHeight: 1.5,
  padding: `0 .5rem`,
}

const StyledInput = props => <input sx={inputStyle} {...props} />
const StyledTextarea = props => <TextareaAutosize sx={inputStyle} {...props} />

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
    requiredLabel: PropTypes.string,
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

  submit(autoRetry) {
    if (this.state.attempts > 2 && autoRetry) {
      return this.setState({
        isSubmitting: false,
        generalError: this.props.generalErrorLabel,
      })
    }

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

    if (errors.email || errors.message || errors.consent) {
      return this.setState({ errors, isSubmitting: false })
    }

    this.increaseAttempts()

    return axios
      .post(this.props.endpoint, {
        email: email,
        lang: this.props.lang,
        message: message
          // replace multiple line breaks (2 and more) by <br><br>
          .replace(/(\r\n|\n\r|\r|\n){2,}/g, `<br><br>`)
          // replace single line breaks by <br>
          .replace(/(\r\n|\n\r|\r|\n)/g, `<br>`)
          .trim(),
      })
      .then(({ data }) => {
        if (data && data.msg === `OK`) {
          this.reset()
          localStore.removeItem(`ContactForm`)
          return this.setState({ hasSucceeded: true }, () => {
            // scroll to success message
            const el = document.getElementById(`success`)
            el && window.scrollTo(0, el.offsetTop - 90)
          })
        }
        throw new Error({ generalError: this.props.generalErrorLabel })
      })
      .catch(err => {
        this.increaseAttempts()
        this.submit(true)
      })
      .then(() => this.setState({ isSubmitting: false }))
  }

  increaseAttempts() {
    this.setState({ attempts: this.state.attempts + 1 })
  }

  reset() {
    this.setState({
      ...initialState,
      values: initialState.values,
      errors: initialState.errors,
    })
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
            />
            {errors.email && (
              <div
                sx={{
                  position: `absolute`,
                  color: `failure`,
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
            paddingBottom: `1.4rem`,
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
              onInput={this.handleChange}
              maxRows={10}
              readOnly={this.state.isSubmitting}
              required
              sx={{
                minHeight: `8rem`,
                width: `100%`,
              }}
            />
            {errors.message && (
              <div
                sx={{
                  position: `absolute`,
                  color: `failure`,
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
            <a
              href={privacyLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                border: `none`,
              }}
            >
              {privacyLabel}
            </a>
            {errors.consent && (
              <div
                sx={{
                  position: `absolute`,
                  color: `failure`,
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
          label="Submit"
          disabled={isSubmitting}
          sx={{
            ...styles.button,
            backgroundColor: `purpleDark`,
            color: `darkWhite`,
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
