/* global document, window */
import React, { Component } from 'react'
import {
  StripeProvider,
  Elements,
  CardElement,
  IbanElement,
} from 'react-stripe-elements'
import { css } from '@emotion/core'
import { colors } from '@src/theme'
import localStore from '@src/utils/local-store'

class DonationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stripe: null,
      paymentApiAvailable: null,
      form: {
        name: ``,
        lastname: ``,
        email: ``,
        address: ``,
        zip: ``,
        city: ``,
        country: ``,
      },
    }
    if (!typeof window !== `undefined`) {
      this.state.form = {
        ...this.state.form,
        ...localStore.getItem(`DonationForm`),
      }
    }
  }

  componentDidMount() {
    const script = document.createElement(`script`)
    script.onload = () => {
      const stripe = window.Stripe(process.env.STRIPE_PUBLIC_KEY)

      const paymentRequest = stripe.paymentRequest({
        country: `US`,
        currency: `usd`,
        total: {
          label: `Demo total`,
          amount: 1000,
        },
      })

      paymentRequest.on(`token`, ({ complete, token, ...data }) => {
        console.log(`Received Stripe token: `, token)
        console.log(`Received customer information: `, data)
        complete(`success`)
      })

      paymentRequest.canMakePayment().then(result => {
        this.setState({ paymentApiAvailable: !!result })
      })

      this.setState({ stripe })
    }
    script.src = `https://js.stripe.com/v3/`
    document.head.appendChild(script)
  }

  handleChange = event => {
    const target = event.target
    const value = target.type === `checkbox` ? target.checked : target.value
    const name = target.name

    this.setState(
      {
        form: {
          ...this.state.form,
          [name]: value,
        },
      },
      () => localStore.setItem(`DonationForm`, this.state.form)
    )
  }

  render() {
    const { stripe, form } = this.state
    return (
      <StripeProvider stripe={stripe}>
        <form method="post">
          <label>
            <span>Name</span>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={this.handleChange}
            />
          </label>

          <label>
            <span>Nachname</span>
            <input
              name="lastname"
              type="text"
              value={form.lastname}
              onChange={this.handleChange}
            />
          </label>

          <label>
            <span>E-Mail</span>
            <input
              name="email"
              type="text"
              value={form.email}
              onChange={this.handleChange}
            />
          </label>

          <label>
            <span>Adresse</span>
            <input
              name="address"
              type="text"
              value={form.address}
              onChange={this.handleChange}
            />
          </label>

          <label>
            <span>PLZ</span>
            <input
              name="zip"
              type="text"
              value={form.zip}
              onChange={this.handleChange}
            />
          </label>

          <label>
            <span>Stadt</span>
            <input
              name="city"
              type="text"
              value={form.city}
              onChange={this.handleChange}
            />
          </label>

          <label>
            <span>Land</span>
            <input
              name="country"
              type="text"
              value={form.country}
              onChange={this.handleChange}
            />
          </label>

          <Elements locale="at">
            <div
              css={css`
                border: 1px solid ${colors.gray5};
                border-radius: 2px;
              `}
            >
              <label
                css={css`
                  display: flex;
                  align-items: center;
                  padding: 0.3rem 1rem;
                `}
              >
                {/* <span>IBAN</span> */}
                <IbanElement
                  supportedCountries={[`SEPA`]}
                  style={{
                    style: {
                      base: {
                        flex: 1,
                        color: colors.purple,
                        letterSpacing: `0.025em`,
                        fontFamily: `monospace`,
                        '::placeholder': {
                          color: colors.grayBlue,
                        },
                      },
                      invalid: {
                        color: colors.wine,
                      },
                    },
                  }}
                  css={css`
                    flex: 1;
                  `}
                />
              </label>
            </div>
          </Elements>
          <Elements locale="en">
            <div
              css={css`
                border: 1px solid ${colors.gray5};
                border-radius: 2px;
              `}
            >
              <label
                css={css`
                  display: flex;
                  alignitems: center;
                  padding: 0.3rem 1rem;
                `}
              >
                {/* <span>Kreditkarte</span> */}
                <CardElement
                  style={{
                    style: {
                      base: {
                        flex: 1,
                        color: colors.purple,
                        letterSpacing: `0.025em`,
                        fontFamily: `monospace`,
                        '::placeholder': {
                          color: colors.grayBlue,
                        },
                      },
                      invalid: {
                        color: colors.wine,
                      },
                    },
                  }}
                  css={css`
                    flex: 1;
                  `}
                />
              </label>
            </div>
          </Elements>
        </form>
      </StripeProvider>
    )
  }
}

export default DonationForm
