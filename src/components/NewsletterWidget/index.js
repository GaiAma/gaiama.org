/* global document, window */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner'
import isEmail from 'validator/lib/isEmail'
import { colors, fontFamilies } from '@src/theme'
import { Button } from '@components/layout/Button'
import localStore from '@src/utils/local-store'
import axios from 'axios'

const StyledInput = styled.input({
  width: `100%`,
  border: `1px solid ${colors.gray3}`,
  background: colors.white,
  lineHeight: 1.5,
  padding: `0 .5rem`,
})

const initialState = {
  values: {
    email: ``,
    consent: false,
  },
  errors: {
    email: false,
    consent: false,
  },
  generalError: ``,
  hasSucceeded: false,
  isSubmitting: false,
  attempts: 0,
}

export class Newsletter extends Component {
  static propTypes = {
    emailLabel: PropTypes.string,
    emailPlaceholder: PropTypes.string,
    emailErrorLabel: PropTypes.string,
    generalErrorLabel: PropTypes.string,
    consentLabel: PropTypes.string,
    privacyLabel: PropTypes.string,
    privacyLink: PropTypes.string,
    submitLabel: PropTypes.string,
    success: PropTypes.string,
    lang: PropTypes.string,
    endpoint: PropTypes.string,
  }
  static defaultProps = {
    emailLabel: ``,
    emailPlaceholder: ``,
    consentLabel: ``,
    submitLabel: ``,
    lang: `en`,
  }
  constructor(props) {
    super(props)
    const state = initialState
    if (!typeof window !== `undefined`) {
      state.values = {
        ...state.values,
        ...localStore.getItem(`NewsletterForm`),
      }
    }
    this.state = state
  }

  reset() {
    this.setState({
      ...initialState,
      values: initialState.values,
      errors: initialState.errors,
    })
  }

  increaseAttempts() {
    this.setState({ attempts: this.state.attempts + 1 })
  }

  hasErrors = () => Object.values(this.state.errors).filter(x => x).length

  handleChange = event => {
    const target = event.target
    const value =
      target.type === `checkbox`
        ? target.checked
        : target.value.replace(/\s/g, ``)
    const name = target.name

    this.setState(
      {
        values: {
          ...this.state.values,
          [name]: value,
        },
      },
      () => localStore.setItem(`NewsletterForm`, this.state.values)
    )
  }

  handleSubmit = event => {
    if (typeof window === `undefined`) {
      return this.setState({ generalError: this.props.generalErrorLabel })
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
    const { email, consent } = this.state.values
    const errors = {}

    if (!isEmail(email)) {
      errors.email = this.props.emailErrorLabel
    }

    if (!consent) {
      errors.consent = true
    }

    if (errors.email || errors.consent) {
      return this.setState({ errors, isSubmitting: false })
    }

    this.increaseAttempts()

    return axios
      .patch(this.props.endpoint, {
        email,
        lang: this.props.lang,
      })
      .then(({ data }) => {
        if (data && data.msg === `OK`) {
          this.reset()
          localStore.removeItem(`NewsletterForm`)
          return this.setState({ hasSucceeded: true }, () => {
            // scroll to success message
            const el = document.getElementById(`success`)
            el && window.scrollTo(0, el.offsetTop - 90)
          })
        }
        throw new Error()
      })
      .catch(err => {
        this.increaseAttempts()
        this.submit(true)
      })
      .then(() => this.setState({ isSubmitting: false }))
  }

  render() {
    const {
      emailLabel,
      emailPlaceholder,
      consentLabel,
      privacyLabel,
      privacyLink,
      submitLabel,
      endpoint,
    } = this.props
    const {
      values,
      errors,
      isSubmitting,
      hasSucceeded,
      generalError,
    } = this.state

    if (hasSucceeded) {
      return (
        <p
          id="success"
          css={css`
            background: ${colors.white};
            border: 1px solid green;
            color: ${colors.success};
            padding: 0.5rem 0.5rem 0.4rem;
            & em {
              text-decoration: underline;
              font-style: normal;
            }
          `}
          dangerouslySetInnerHTML={{ __html: this.props.success }}
        />
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
          css={css`
            position: relative;
            padding-bottom: 1.4rem;
            & input {
              border: ${errors.email && `1px solid red`};
            }
          `}
        >
          <label>
            <div
              css={css`
                font-family: ${fontFamilies.accent};
                font-size: 1.5rem;
              `}
            >
              {emailLabel}
            </div>
            <StyledInput
              name="email"
              type="email"
              onChange={this.handleChange}
              value={values.email}
              placeholder={emailPlaceholder}
              readOnly={this.isSubmitting}
              required
            />
            {errors.email && (
              <div
                css={css`
                  position: absolute;
                  color: ${colors.failure};
                  font-size: 0.9rem;
                `}
              >
                {errors.email}
              </div>
            )}
          </label>
        </div>

        <div
          css={css`
            position: relative;
            padding-bottom: 1.4rem;
            color: ${errors.consent && colors.failure};
          `}
        >
          <label>
            <input
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={this.handleChange}
              value={values.consent}
              disabled={this.isSubmitting}
            />
            <span
              css={css`
                font-size: 0.9rem;
                margin: 0 0.5rem;
              `}
            >
              {consentLabel}
            </span>
            <a
              href={privacyLink}
              target="_blank"
              rel="noopener noreferrer"
              css={css`
                border: none;
              `}
            >
              {privacyLabel}
            </a>
          </label>
        </div>

        {generalError && (
          <div
            css={css`
              border: 1px solid red;
              padding: 0.5rem 0.5rem 0.4rem;
              margin-bottom: 0.5rem;
              color: ${colors.failure};
              font-size: 0.9rem;
            `}
          >
            {generalError}
          </div>
        )}

        <Button
          label="Submit"
          disabled={isSubmitting}
          css={css`
            ${styles.button};
            background: ${colors.primaryLite};
            color: ${colors.white};
            &:hover {
              background: ${colors.purpleDark};
              color: ${colors.darkWhite};
            }
          `}
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
