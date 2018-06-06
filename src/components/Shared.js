import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { colors, Box, fontFamilies, H2, fullPageWidth, media } from '@/theme'
import Lazy from '@/components/Lazy'
// import DonationForm from '@/components/DonationForm'
import { mediaQuery } from '@/components/MediaQuery'
// import PatreonButton from '@/assets/become_a_patron_button.png'

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

  handleSelect = ({ symbol }) => {
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
              onClick={() => this.handleSelect(x)}
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
          resolutions={artwork.image.resolutions}
          sizes={artwork.image.sizes}
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
        <H2
          align="center"
          mt="1rem"
          mb={readMoreLink && `.4rem`}
          fontSize="2rem"
        >
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
          [media.greaterThan(`medium`)]: {
            width: `85%`,
          },
        }}
      >
        <Box
          flex
          column
          aICenter
          css={{
            // [media.between(`xsmall`, `medium`)]: {
            //   margin: `0 0 3rem`,
            // },
            '&:hover > form': {
              transform: `scale(1.02)`,
            },
            '& > form': {
              marginBottom: 0,
              '& [type="image"]': {
                width: `150px`,
              },
              // [media.lessThan(`xsmall`)]: {
              //   transform: `scale(0.7)`,
              // },
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
                value="AR3R6U8M5SDKS"
              />
              <input
                type="image"
                src="https://assets.gaiama.org/PayPal_yellow_button.png"
                border="0"
                name="submit"
                alt="PayPal - The safer, easier way to pay online!"
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
                value="W8AKGPB4K9TB6"
              />
              <input
                type="image"
                src="https://assets.gaiama.org/PayPal_yellow_button.png"
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
        </Box>

        {/* <Box
          flex
          column
          aICenter
          css={{
            // [media.lessThan(`medium`)]: {
            //   margin: `1rem 0 3rem`,
            // },
            '&:hover > a': {
              transform: `scale(1.02)`,
            },
          }}
        >
          <a
            href="https://patreon.com/HappyGaiAma"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img width="150px" src={PatreonButton} alt="Patreon" />
            Donate
          </a>
        </Box> */}

        <Box
          flex
          column
          aICenter
          css={{
            [media.lessThan(`medium`)]: {
              margin: `1rem 0 0`,
            },
          }}
        >
          <CoinPicker coins={cryptos} />
        </Box>

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
}
SupportWidget.defaultProps = {
  artworkStyles: {},
  artworkWrapperStyles: {},
}
export { SupportWidget }
export const SupportWidgetFragment = graphql`
  fragment SupportWidget on RootQueryType {
    SupportWidget: supportWidgetAml(frontmatter: { lang: { eq: $lang } }) {
      frontmatter {
        title
        readMoreLink
        readMoreLabel
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
            >
              <Img
                alt="GaiAma on Instagram"
                sizes={x.node.image.image.sizes}
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
  fragment instagram on RootQueryType {
    instagram: instagramFeedAml(frontmatter: { lang: { eq: $lang } }) {
      frontmatter {
        lang
        instagramUser
        followLink
        bg {
          image: childImageSharp {
            sizes(maxWidth: 1440, quality: 75) {
              ...GatsbyImageSharpSizes
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
              sizes(maxWidth: 240, maxHeight: 240, quality: 75) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
      }
    }
  }
`
