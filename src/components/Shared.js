import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { colors, Box, fontFamilies, H2, fullPageWidth, media } from '@/theme'
import Lazy from '@/components/Lazy'
// import DonationForm from '@/components/DonationForm'
// import { PureButton } from '@/components/layout/Button'
import { mediaQuery } from '@/components/MediaQuery'
// import PatreonButton from '@/assets/become_a_patron_button.png'

// from https://github.com/hyperdexapp/cryptocurrency-icons
// const SVGS = {
//   btc: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#F7931A"/><path fill="#FFF" fill-rule="nonzero" d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"/></g></svg>`,
//   bch: `<svg height="32" width="32" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" fill="#8dc351" r="16"/><path d="M21.207 10.534c-.776-1.972-2.722-2.15-4.988-1.71l-.807-2.813-1.712.491.786 2.74c-.45.128-.908.27-1.363.41l-.79-2.758-1.711.49.805 2.813c-.368.114-.73.226-1.085.328l-.003-.01-2.362.677.525 1.83s1.258-.388 1.243-.358c.694-.199 1.035.139 1.2.468l.92 3.204c.047-.013.11-.029.184-.04l-.181.052 1.287 4.49c.032.227.004.612-.48.752.027.013-1.246.356-1.246.356l.247 2.143 2.228-.64c.415-.117.825-.227 1.226-.34l.817 2.845 1.71-.49-.807-2.815a65.74 65.74 0 0 0 1.372-.38l.802 2.803 1.713-.491-.814-2.84c2.831-.991 4.638-2.294 4.113-5.07-.422-2.234-1.724-2.912-3.471-2.836.848-.79 1.213-1.858.642-3.3zm-.65 6.77c.61 2.127-3.1 2.929-4.26 3.263l-1.081-3.77c1.16-.333 4.704-1.71 5.34.508zm-2.322-5.09c.554 1.935-2.547 2.58-3.514 2.857l-.98-3.419c.966-.277 3.915-1.455 4.494.563z" fill="#fff" fill-rule="nonzero"/></g></svg>`,
//   eth: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#627EEA"/><g fill="#FFF" fill-rule="nonzero"><path fill-opacity=".602" d="M16.498 4v8.87l7.497 3.35z"/><path d="M16.498 4L9 16.22l7.498-3.35z"/><path fill-opacity=".602" d="M16.498 21.968v6.027L24 17.616z"/><path d="M16.498 27.995v-6.028L9 17.616z"/><path fill-opacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/><path fill-opacity=".602" d="M9 16.22l7.498 4.353v-7.701z"/></g></g></svg>`,
//   ltc: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#BFBBBB"/><polygon fill="#FFF" points="10.427 19.214 9 19.768 9.688 17.009 11.132 16.429 13.213 8 18.342 8 16.823 14.196 18.233 13.625 17.553 16.375 16.126 16.946 15.278 20.429 23 20.429 22.127 24 9.252 24"/></g></svg>`,
//   dash: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#1C75BC"/><path fill="#FFF" d="M26.571 12.971l-2.038 6.381s-1.257 3.181-4.247 3.181H5.866l1.03-3.18h13.066l2.057-6.382H8.971l1.01-3.18h14.343c3.143 0 2.247 3.18 2.247 3.18zm-20.19 1.715h7.733l-.99 2.952H5.37l1.01-2.952z"/></g></svg>`,
// }

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
  qr: require(`~/public/qr/${x.symbol}.svg`),
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
      this.setState({
        selected: this.props.coins.find(x => x.symbol === symbol),
      })

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
        wrap
        css={{
          maxWidth: `100%`,
        }}
      >
        <Box flex wrap>
          {this.props.coins.map(x => (
            <Box
              key={x.address}
              m="0.1rem"
              flex
              column
              aICenter
              onClick={this.handleSelect(x)}
              onKeyPress={this.handleKeyDown}
              css={{
                '&:hover > img': {
                  transform: `scale(1.05)`,
                },
              }}
            >
              <img src={x.icon} alt={x.name} />
              {selected.symbol === x.symbol && (
                <FontAwesomeIcon icon="caret-down" size="lg" />
              )}
            </Box>
          ))}
        </Box>
        {selected.symbol && (
          <Box flex column aICenter mt=".5rem" css={{ maxWidth: `100%` }}>
            <strong css={{ fontWeight: `700` }}>{selected.name}</strong>
            <a
              href={`bitcoin:${selected.address}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src={selected.qr}
                alt={selected.name}
                css={{ width: `150px` }}
              />
            </a>
            <Box
              css={{
                overflowWrap: `break-word`,
                wordBreak: `break-all`,
                fontSize: `.75rem`,
              }}
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
    this.setState({ isOpen: !this.state.isOpen })
  }
  render() {
    const { bankButton, bankButtonAlt, bankInfo, bankDetails } = this.props
    return (
      <div>
        <div css={{ textAlign: `center` }}>
          <button
            onClick={this.toggleInfos}
            css={{
              border: `none`,
              background: `none`,
              padding: 0,
              '&:hover': {
                transform: `scale(1.02)`,
              },
            }}
          >
            <img src={bankButton.publicURL} alt={bankButtonAlt} />
          </button>
        </div>

        {this.state.isOpen && (
          <div
            css={{
              background: colors.lightBlue,
              position: `absolute`,
              marginTop: `.4rem`,
              left: 0,
              right: 0,
              padding: `1rem`,
            }}
          >
            <div
              css={{
                marginLeft: `50%`,
                transform: `translateX(-50%)`,
              }}
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
  <div
    css={{
      position: `relative`,
      zIndex: 1,
      ...fullPageWidth,
      '& img': {
        margin: `0`,
      },
    }}
    {...props}
  >
    {artwork && (
      <div
        css={{
          display: `flex`,
          alignItems: `flex-end`,
          marginBottom: `.5rem`,
          '& .gatsby-image-outer-wrapper': {
            zIndex: 1,
          },
          ...artworkWrapperStyles,
        }}
      >
        <Img
          fixed={artwork.image.fixed}
          fluid={artwork.image.fluid}
          css={{
            transform: `translateY(5rem)`,
            marginTop: `-5rem`,
            maxWidth: `100vw`,
            ...artworkStyles,
          }}
        />
      </div>
    )}

    <Box
      oh
      css={{
        background: !transparent && colors.lightBlue,
        [media.lessThan(`medium`)]: {
          paddingTop: `3rem`,
        },
      }}
    >
      {title && (
        <H2 align="center" mt="1rem" mb=".8rem" fontSize="2rem">
          {title}
        </H2>
      )}

      {description && (
        <p
          css={{
            textAlign: `center`,
            marginBottom: `1rem`,
          }}
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      )}

      {readMoreLink && (
        <p
          css={{
            textAlign: `center`,
            fontSize: `.9rem`,
          }}
        >
          <Link to={readMoreLink}>{readMoreLabel}</Link>
        </p>
      )}

      <div
        css={{
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
        }}
      >
        <div
          css={{
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
          }}
        >
          {lang === `en` ? (
            <form
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
              target="_top"
            >
              <input type="hidden" name="cmd" value="_s-xclick" />
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
              <img
                alt=""
                border="0"
                src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif"
                width="1"
                height="1"
              />
            </form>
          ) : (
            <form
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
              target="_top"
            >
              <input type="hidden" name="cmd" value="_s-xclick" />
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
              <img
                alt=""
                border="0"
                src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif"
                width="1"
                height="1"
              />
            </form>
          )}
        </div>

        <BankDetails
          bankButton={bankButton}
          bankButtonAlt={bankButtonAlt}
          bankInfo={bankInfo}
          bankDetails={bankDetails}
        />

        <div
          css={{
            [media.lessThan(`xsmall`)]: {
              margin: `1rem 0 0`,
            },
          }}
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
                background: `#fff`,
                boxShadow: `0px 1px 1px #99999973`,
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
      </div>
    </Box>
    {/* <DonationForm /> */}
  </div>
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

const InstagramFeed = ({ user, followLink, bg, images }) => {
  const imgs = mediaQuery(`(max-width: 779px)`) ? images.slice(0, 3) : images

  return (
    <div>
      <Lazy
        image={bg}
        css={{
          display: `flex`,
          justifyContent: `space-around`,
          backgroundSize: `cover`,
          position: `relative`,
          padding: `2rem 0`,
          ...fullPageWidth,
        }}
      >
        {imgs.map(x => (
          <div
            key={x.node.id}
            css={{
              width: `240px`,
              transition: `all .3s ease`,
              ':hover': { transform: `scale(1.02)` },
            }}
          >
            <a
              href={`https://www.instagram.com/p/${x.node.code}/?taken-by=${
                x.node.username
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Img
                alt="GaiAma on Instagram"
                fluid={x.node.image.image.fluid}
                css={{ border: `1px solid #000` }}
              />
            </a>
          </div>
        ))}
      </Lazy>
      <div
        css={{
          marginTop: `.5rem`,
          [media.greaterThan(`xsmall`)]: {
            textAlign: `right`,
          },
        }}
      >
        <a
          href={`https://instagram.com/${user}`}
          target="_blank"
          rel="noopener noreferrer"
          css={{
            display: `inline-block`,
            fontFamily: fontFamilies.accent,
            lineHeight: `.8`,
            letterSpacing: `.2rem`,
            fontSize: `1rem`,
            [media.greaterThan(`small`)]: {
              letterSpacing: `.3rem`,
            },
          }}
        >
          <span
            css={{
              letterSpacing: `-.1rem`,
              marginRight: `1rem`,
            }}
          >
            —————————&gt;&gt;
          </span>&nbsp;
          {followLink}
        </a>
      </div>
    </div>
  )
}
InstagramFeed.propTypes = {
  user: PropTypes.string,
  followLink: PropTypes.string,
  bg: PropTypes.string,
  images: PropTypes.array,
}
export { InstagramFeed }

export const instaQuery = graphql`
  fragment instagram on Query {
    instagram: instagramFeedAml(frontmatter: { lang: { eq: $lang } }) {
      frontmatter {
        lang
        instagramUser
        followLink
        bg {
          image: childImageSharp {
            fluid(maxWidth: 1440, quality: 75) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }

    instagramImages: allInstagramJson(limit: 4) {
      edges {
        node {
          id
          code
          username
          image {
            image: childImageSharp {
              fluid(maxWidth: 240, maxHeight: 240, quality: 75) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
