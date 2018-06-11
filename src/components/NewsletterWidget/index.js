import React, { Component } from 'react'
import PropTypes from 'prop-types'
import g from 'glamorous'
// import { Formik, Field, Form } from 'formik'
import isEmail from 'validator/lib/isEmail'
import { colors, fontFamilies } from '@/theme'
import { Button } from '@/components/layout/Button'
import localStore from '@/utils/local-store'
import { axios } from '@/api'

const StyledInput = g.input({
  width: `100%`,
  border: `1px solid #ccc`,
  background: `#fff`,
  lineHeight: 1.5,
  padding: `0 .5rem`,
})

export class Newsletter extends Component {
  static propTypes = {
    emailLabel: PropTypes.string,
    emailPlaceholder: PropTypes.string,
    // languageLabel: PropTypes.string,
    // languages: PropTypes.array,
    emailErrorLabel: PropTypes.string,
    generalErrorLabel: PropTypes.string,
    consentLabel: PropTypes.string,
    submitLabel: PropTypes.string,
    lang: PropTypes.string,
    endpoint: PropTypes.string,
  }
  static defaultProps = {
    emailLabel: ``,
    emailPlaceholder: ``,
    // languageLabel: ``,
    // languages: null,
    consentLabel: ``,
    submitLabel: ``,
    lang: `en`,
  }
  constructor(props) {
    super(props)
    const state = {
      values: {
        email: ``,
        // language: props.lang,
        consent: false,
      },
      errors: {
        email: false,
        // language: false,
        consent: false,
      },
      generalError: ``,
      successMsg: ``,
      isSubmitting: false,
    }
    if (!typeof window !== `undefined`) {
      state.values = {
        ...state.values,
        ...localStore.getItem(`NewsletterForm`),
      }
    }
    this.state = state
  }

  hasErrors = () => Object.values(this.state.errors).filter(x => x).length

  handleChange = event => {
    const target = event.target
    const value = target.type === `checkbox` ? target.checked : target.value
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
    this.setState({ isSubmitting: true, generalError: ``, errors: {} })
    const { email, consent } = this.state.values
    const errors = {}
    console.log(event.target.checkValidity())

    if (!isEmail(email)) {
      errors.email = this.props.emailErrorLabel
    }

    if (!consent) {
      errors.consent = true
    }

    if (errors.email || errors.consent) {
      return this.setState({ errors, isSubmitting: false })
    }

    return axios
      .patch(this.props.endpoint, {
        email: email.trim(),
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

  render() {
    const {
      emailLabel,
      emailPlaceholder,
      // languageLabel,
      // languages,
      consentLabel,
      submitLabel,
      endpoint,
    } = this.props
    const { values, errors, isSubmitting, successMsg } = this.state

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

        {/* <div
          css={{
            position: `relative`,
            paddingBottom: `1.4rem`,
            '& label + label': {
              marginLeft: `2rem`,
            },
          }}
        >
          {languageLabel && (
            <div css={{ fontFamily: fontFamilies.accent, fontSize: `1.5rem` }}>
              {languageLabel}
            </div>
          )}
          {languages &&
            languages.map(({ node: { frontmatter: lang } }) => (
              <label key={lang.id}>
                <input
                  name="language"
                  type="radio"
                  checked={lang.id === values.language}
                  onChange={this.handleChange}
                  value={lang.id}
                />
                <span css={{ fontSize: `.9rem`, marginLeft: `.5rem` }}>
                  {lang.title}
                </span>
              </label>
            ))}
          {errors.language && (
            <div
              css={{ position: `absolute`, color: `red`, fontSize: `.9rem` }}
            >
              {errors.language}
            </div>
          )}
        </div> */}

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
            {/* {errors.consent && (
              <div
                css={{ position: `absolute`, color: `red`, fontSize: `.9rem` }}
              >
                {errors.consent}
              </div>
            )} */}
          </label>
        </div>

        <Button
          label="Submit"
          disabled={isSubmitting}
          css={{
            ...styles.button,
            background: `#2d2a34`,
            color: colors.darkWhite,
          }}
        >
          {submitLabel}
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
