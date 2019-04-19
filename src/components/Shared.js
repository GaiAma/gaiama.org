/* global dataLayer */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons/faCaretUp'
import { colors, Box, fullPageWidth, media } from '@src/theme'
// import DonationForm from '@components/DonationForm'
// import { PureButton } from '@components/layout/Button'
// import PatreonButton from '@src/assets/become_a_patron_button.png'

export const H2 = styled.h2`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0.8rem;
  font-size: 2rem;
`

export const cryptos = [
  {
    name: `Bitcoin`,
    symbol: `btc`,
    address: `11hwodfSrpaSEApEfh1QSryS1Teg3ApTV`,
  },
  {
    name: `Bitcoin Cash`,
    symbol: `bch`,
    address: `1EcXLKgLzq8LkQkvxFLtprLh8SzjuupizB`,
  },
  {
    name: `Ethereum`,
    symbol: `eth`,
    address: `0xFaE65E5CFdD4e2CF515C2a89a650Acd092EBDA37`,
  },
  {
    name: `Litecoin`,
    symbol: `ltc`,
    address: `LhJ9MFS8ffjxVFwmAemJvz2bDGMwHhCXUe`,
  },
  {
    name: `Dash`,
    symbol: `dash`,
    address: `XdkJiEL6UJStW1Hz5WWE4g41c5QsMwweio`,
  },
].map(x => ({
  ...x,
  icon: require(`cryptocurrency-icons/svg/color/${x.symbol}.svg`),
  qr: require(`@root/public/qr/${x.symbol}.svg`),
}))

class CoinPicker extends Component {
  static propTypes = {
    coins: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = {
      selected: {},
    }
  }

  handleSelect = ({ symbol }) => () => {
    this.state.selected.symbol !== symbol &&
      this.setState(
        {
          selected: this.props.coins.find(x => x.symbol === symbol),
        },
        () => dataLayer.push({ event: `donation_method`, method: symbol })
      )

    this.state.selected.symbol === symbol && this.setState({ selected: {} })
  }

  handleKeyDown = ({ key }) => {
    if (key == `Enter`) {
      console.log(`enter press here!`)
    }
  }

  render() {
    const { selected } = this.state
    return (
      <Box
        flex
        column
        aICenter
        fwrap
        css={css`
          max-width: 100%;
        `}
      >
        <Box flex fwrap>
          {this.props.coins.map(x => (
            <Box
              key={x.address}
              flex
              column
              aICenter
              onClick={this.handleSelect(x)}
              onKeyPress={this.handleKeyDown}
              css={css`
                margin: 0.1rem;
                &:hover > img {
                  transform: scale(1.05);
                }
              `}
            >
              <img src={x.icon} alt={x.name} />
              {selected.symbol === x.symbol && (
                <FontAwesomeIcon icon={faCaretDown} size="lg" />
              )}
            </Box>
          ))}
        </Box>
        {selected.symbol && (
          <Box
            flex
            column
            aICenter
            css={css`
              margin-top: 0.5rem;
              max-width: 100%;
            `}
          >
            <strong
              css={css`
                font-weight: 700;
              `}
            >
              {selected.name}
            </strong>
            <a
              href={`bitcoin:${selected.address}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src={selected.qr}
                alt={selected.name}
                css={css`
                  width: 150px;
                `}
              />
            </a>
            <Box
              css={css`
                overflow-wrap: break-word;
                word-break: break-all;
                font-size: 0.75rem;
              `}
            >
              <a
                href={`bitcoin:${selected.address}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {selected.address}
              </a>
            </Box>
          </Box>
        )}
      </Box>
    )
  }
}

class BankDetails extends Component {
  static propTypes = {
    bankButton: PropTypes.object.isRequired,
    bankButtonAlt: PropTypes.string.isRequired,
    bankInfo: PropTypes.string.isRequired,
    bankDetails: PropTypes.string.isRequired,
  }
  state = {
    isOpen: false,
  }
  toggleInfos = () => {
    if (!this.state.isOpen) {
      dataLayer.push({
        event: `donation_method`,
        method: `bank_details_button`,
      })
    }
    this.setState({ isOpen: !this.state.isOpen })
  }
  render() {
    const { bankButton, bankButtonAlt, bankInfo, bankDetails } = this.props
    return (
      <div>
        <div
          css={css`
            text-align: center;
          `}
        >
          <button
            onClick={this.toggleInfos}
            css={css`
              border: none;
              background: none;
              padding: 0;
              position: relative;
              &:hover {
                transform: scale(1.02);
              }
            `}
          >
            <img src={bankButton.publicURL} alt={bankButtonAlt} />
            <FontAwesomeIcon
              icon={this.state.isOpen ? faCaretUp : faCaretDown}
              css={css`
                position: absolute;
                top: 0.67rem;
                right: 0.4rem;
              `}
            />
          </button>
        </div>

        {this.state.isOpen && (
          <div
            css={css`
              background: ${colors.lightBlue};
              position: absolute;
              margin-top: 0.4rem;
              left: 0;
              right: 0;
              padding: 1rem;
            `}
          >
            <div
              css={css`
                margin-left: 50%;
                transform: translateX(-50%);
              `}
            >
              <p dangerouslySetInnerHTML={{ __html: bankInfo }} />
              <p dangerouslySetInnerHTML={{ __html: bankDetails }} />
            </div>
          </div>
        )}
      </div>
    )
  }
}

const SupportWidgetContainer = styled.div({
  position: `relative`,
  zIndex: 1,
  ...fullPageWidth,
  '& img': {
    margin: `0`,
  },
})

const SupportWidgetIntro = styled.div`
  width: 95%;
  margin: 0 auto;
`

const SupportWidgetArtwork = styled.div({
  display: `flex`,
  alignItems: `flex-end`,
  marginBottom: `.5rem`,
  '& .gatsby-image-wrapper': {
    zIndex: 1,
  },
})

const SupportWidgetInner = styled.div({
  margin: `2.5rem auto`,
  display: `flex`,
  justifyContent: `space-around`,
  flexWrap: `wrap`,
  width: `98%`,
  maxWidth: `1280px`,
  [media.lessThan(`xsmall`)]: {
    flexDirection: `column`,
  },
  [media.greaterThan(`medium`)]: {
    width: `50%`,
  },
})

const SupportWidgetFormWrapper = styled.div({
  textAlign: `center`,
  marginBottom: `1rem`,
  [media.greaterThan(`xsmall`)]: {
    marginBottom: 0,
  },
  '&:hover > form': {
    transform: `scale(1.02)`,
  },
  '& > form': {
    marginBottom: 0,
    '& [type="image"]': {
      width: `150px`,
    },
  },
})

const SupportWidget = ({
  title,
  description,
  readMoreLink,
  readMoreLabel,
  artwork,
  artworkStyles,
  artworkWrapperStyles,
  transparent,
  lang,
  paypalButton,
  bankButton,
  bankButtonAlt,
  bankInfo,
  bankDetails,
  ...props
}) => (
  <SupportWidgetContainer {...props}>
    {artwork && (
      <SupportWidgetArtwork
        css={css`
          ${artworkWrapperStyles}
        `}
      >
        <Img
          fixed={artwork.image.fixed}
          fluid={artwork.image.fluid}
          css={css`
            transform: translateY(5rem);
            margin-top: -5rem;
            max-width: 100vw;
            ${artworkStyles};
          `}
        />
      </SupportWidgetArtwork>
    )}

    <Box
      oh
      css={css`
        background: ${!transparent && colors.lightBlue};
        ${media.lessThan(`medium`)} {
          padding-top: 3rem;
        }
      `}
    >
      <SupportWidgetIntro>
        {title && <H2>{title}</H2>}

        {description && (
          <p
            css={css`
              text-align: center;
              margin-bottom: 1rem;
              a {
                border-bottom: 1px solid #999;
              }
            `}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        )}

        {readMoreLink && (
          <p
            css={css`
              text-align: center;
              font-size: 0.9rem;
            `}
          >
            <Link to={readMoreLink}>{readMoreLabel}</Link>
          </p>
        )}
      </SupportWidgetIntro>

      <SupportWidgetInner>
        <SupportWidgetFormWrapper>
          <form
            action="https://www.paypal.com/cgi-bin/webscr"
            method="post"
            target="_top"
            onSubmit={() =>
              dataLayer.push({ event: `donation_method`, method: `paypal` })
            }
          >
            <input type="hidden" name="cmd" value="_s-xclick" />
            {lang === `en` ? (
              <>
                <input
                  type="hidden"
                  name="hosted_button_id"
                  value="TU5GAQZHYT8NC"
                />
                <input
                  type="image"
                  src={paypalButton}
                  border="0"
                  name="submit"
                  alt="Jetzt einfach, schnell und sicher online bezahlen – mit PayPal."
                />
              </>
            ) : (
              <>
                <input
                  type="hidden"
                  name="hosted_button_id"
                  value="8VVPYXKG7E7CE"
                />
                <input
                  type="image"
                  src={paypalButton}
                  border="0"
                  name="submit"
                  alt="Jetzt einfach, schnell und sicher online bezahlen – mit PayPal."
                />
              </>
            )}
            <img
              alt=""
              border="0"
              src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif"
              width="1"
              height="1"
            />
          </form>
        </SupportWidgetFormWrapper>

        <BankDetails
          bankButton={bankButton}
          bankButtonAlt={bankButtonAlt}
          bankInfo={bankInfo}
          bankDetails={bankDetails}
        />

        <div
          css={css`
            ${media.lessThan(`xsmall`)} {
              margin: 1rem 0 0;
            }
          `}
        >
          <CoinPicker coins={cryptos} />
        </div>

        {/* {readMoreLink && (
          <Box flex column aICenter>
            <Link
              to={readMoreLink}
              css={{
                fontFamily: fontFamilies.accent,
                fontSize: `1.5rem`,
                width: `8rem`,
                background: colors.white,
                boxShadow: `0px 1px 1px rgba(153, 153, 153, 0.45)`,
                transition: `background-color .2s linear`,
                textAlign: `center`,
                '&:hover': {
                  background: colors.primaryLite,
                  color: colors.darkWhite,
                },
              }}
            >
              {readMoreLabel}
            </Link>
          </Box>
        )} */}
      </SupportWidgetInner>
    </Box>
    {/* <DonationForm /> */}
  </SupportWidgetContainer>
)
SupportWidget.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  readMoreLink: PropTypes.string,
  readMoreLabel: PropTypes.string,
  artwork: PropTypes.object,
  artworkStyles: PropTypes.object,
  artworkWrapperStyles: PropTypes.object,
  transparent: PropTypes.bool,
  lang: PropTypes.string,
  paypalButton: PropTypes.string,
  bankButton: PropTypes.object,
  bankButtonAlt: PropTypes.string,
  bankInfo: PropTypes.string,
  bankDetails: PropTypes.string,
}
SupportWidget.defaultProps = {
  artworkStyles: {},
  artworkWrapperStyles: {},
}
export { SupportWidget }
export const SupportWidgetFragment = graphql`
  fragment SupportWidget on Query {
    SupportWidget: supportWidgetAml(frontmatter: { lang: { eq: $lang } }) {
      frontmatter {
        title
        description
        readMoreLink
        readMoreLabel
        bankButtonAlt
        bankInfo
        bankDetails
        bankButton {
          publicURL
        }
      }
    }
  }
`
