import React, { Component } from 'react'
import PropTypes from 'prop-types'
import g from 'glamorous'
// import { Formik, Field, Form } from 'formik'
import isEmail from 'validator/lib/isEmail'
import { colors, fontFamilies } from '@/theme'
import { Button } from '@/components/layout/Button'
import localStore from '@/utils/local-store'
import axios from 'axios'

const StyledInput = g.input({
  width: `100%`,
  border: `1px solid #ccc`,
  background: `#fff`,
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
            // eslint-disable-next-line
            const el = document.getElementById(`success`)
            // eslint-disable-next-line
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
          css={{
            background: `#fff`,
            border: `1px solid green`,
            color: `green`,
            padding: `.5rem .5rem .4rem`,
            '& em': {
              textDecoration: `underline`,
              fontStyle: `normal`,
            },
          }}
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
          css={{
            position: `relative`,
            paddingBottom: `1.4rem`,
            '& input': {
              border: errors.email && `1px solid red`,
            },
          }}
        >
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
              readOnly={this.isSubmitting}
              required
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
              disabled={this.isSubmitting}
            />
            <span css={{ fontSize: `.9rem`, marginLeft: `.5rem` }}>
              {consentLabel}
            </span>
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

// const NewsletterForm = ({
//   emailLabel,
//   emailPlaceholder,
//   consent,
//   submitLabel,
// }) => (
//   <Formik
//     initialValues={{ email: `` }}
//     validate={values => {
//       const errors = {}
//       if (!values.email) {
//         errors.email = `Required`
//       } else if (
//         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
//       ) {
//         errors.email = `Invalid email address`
//       }
//       if (!values.consent) {
//         errors.consent = `Required`
//       }
//       return errors
//     }}
//     onSubmit={(values, actions) => {
//       if (typeof window !== `undefined`) {
//         // const fetchConf = {
//         //   method: `post`,
//         //   headers: {
//         //     // 'Accept': `application/json, text/plain, */*`,
//         //     Accept: `application/json`,
//         //     'Content-Type': `application/json`,
//         //   },
//         //   mode: `cors`,
//         //   cache: `default`,
//         //   body: JSON.stringify(values),
//         // }
//         // // eslint-disable-next-line no-undef
//         // window
//         //   .fetch(`ENDPOINT`, fetchConf)
//         //   .then(res => {
//         //     actions.setSubmitting(false)
//         //     if (res.status === 200) {
//         //       // success
//         //     }
//         //   })
//         //   .then(() => actions.setSubmitting(false))
//         //   .catch(() => actions.setErrors({ status: 500 }))
//         firebase
//           .auth()
//           .sendSignInLinkToEmail(values.email, {
//             url: `http://localhost:8000/contact/`,
//             handleCodeInApp: true,
//           })
//           .then(() => {
//             // The link was successfully sent. Inform the user.
//             // Save the email locally so you don't need to ask the user for it again
//             // if they open the link on the same device.
//             // eslint-disable-next-line no-undef
//             localStore.setItem(`NewsletterForm`, values)
//           })
//           .catch(error => {
//             // Some error occurred, you can inspect the code: error.code
//           })
//       }
//     }}
//     render={({ errors, touched, isSubmitting }) => (
//       <Form>
//         <div>
//           <label>
//             <div css={{ fontFamily: fontFamilies.accent, fontSize: `1.5rem` }}>
//               {emailLabel}
//             </div>
//             <Field type="email" name="email" placeholder={emailPlaceholder} />
//             {errors.email && touched.email && <div>{errors.email}</div>}
//           </label>
//         </div>

//         <div>
//           <label>
//             <Field type="checkbox" name="consent" />
//             <span css={{ fontSize: `.9rem`, marginLeft: `1rem` }}>
//               {consent}
//             </span>
//           </label>
//           {errors.consent && touched.consent && <div>{errors.consent}</div>}
//         </div>
//         <Button
//           label="Submit"
//           disabled={isSubmitting}
//           css={{
//             ...styles.button,
//             background: `#2d2a34`,
//             color: colors.darkWhite,
//           }}
//         >
//           {submitLabel}
//         </Button>
//       </Form>
//     )}
//   />
// )

// NewsletterForm.propTypes = {
//   emailLabel: PropTypes.string,
//   emailPlaceholder: PropTypes.string,
//   submitLabel: PropTypes.string,
//   consent: PropTypes.string,
// }

// export default NewsletterForm

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
