import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
// import slugify from 'slugify'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { css } from 'glamor'
import { colors, breakPoints, Box, Button, fontFamilies, H2, H3 } from '@/theme'
import Lazy from '@/components/Lazy'
import NewsletterWidget from '@/components/NewsletterWidget'
import PatreonButton from '@/assets/become_a_patron_button.png'

export const cryptos = [
  { name: `Bitcoin`, symbol: `btc`, address: `11hwodfSrpaSEApEfh1QSryS1Teg3ApTV` },
  { name: `Bitcoin Cash`, symbol: `bch`, address: `1EcXLKgLzq8LkQkvxFLtprLh8SzjuupizB` },
  { name: `Ethereum`, symbol: `eth`, address: `0xFaE65E5CFdD4e2CF515C2a89a650Acd092EBDA37` },
  { name: `Litecoin`, symbol: `ltc`, address: `LhJ9MFS8ffjxVFwmAemJvz2bDGMwHhCXUe` },
  { name: `Dash`, symbol: `dash`, address: `XdkJiEL6UJStW1Hz5WWE4g41c5QsMwweio` },
  // { name: 'Ripple', symbol: 'xrp', icon: XRP },
  // { name: 'Monero', symbol: 'xmr', icon: XMR },
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
              <img
                src={x.icon}
                alt={x.name}
              />
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
  ...props
}) => (
  <div
    css={{
      position: `relative`,
      left: `50%`,
      transform: `translateX(-50vw)`,
      width: `100vw`,

      '& img': {
        margin: `0`,
      },
    }}
    {...props}
  >
    {artwork &&
      <div css={{
        display: `flex`,
        alignItems: `flex-end`,
        marginBottom: `.5rem`,
        ...artworkWrapperStyles,
      }}>
        <Img
          resolutions={artwork.image.resolutions}
          sizes={artwork.image.sizes}
          css={{
            transform: `translateY(5rem)`,
            marginTop: `-5rem`,
            ...artworkStyles,
          }}
        />
      </div>
    }

    <Box oh css={{
      background: !transparent && colors.lightBlue,
    }}>
      {title && <H2
        align="center"
        mt="1rem"
        fontSize="2rem"
      >
        {title}
      </H2>}

      {description &&
        <p
          css={{
            textAlign: `center`,
            marginBottom: `1rem`,
          }}
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      }

      <div css={{
        margin: `2.5rem auto`,
        display: `flex`,
        justifyContent: `space-around`,
        width: `98%`,
        maxWidth: `1280px`,
        [breakPoints.minMdLandscape]: {
          width: `85%`,
        },
      }}>
        <Box flex column aICenter
          css={{
            '&:hover > form': {
              transform: `scale(1.02)`,
            },
          }}
        >
          <form css={{ marginBottom: `0` }} action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value="AR3R6U8M5SDKS" />
            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
            <img alt="" border="0" src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif" width="1" height="1" />
          </form>
        </Box>
    
        <Box flex column aICenter
          css={{
            '&:hover > a': {
              transform: `scale(1.02)`,
            },
          }}
        >
          <a href="https://patreon.com/HappyGaiAma" target="_blank" rel="noopener noreferrer">
            <img width="150px" src={PatreonButton} alt="Patreon"/>
          </a>
        </Box>
    
        <Box flex column aICenter>
          <CoinPicker
            coins={
              cryptos
              // .map(x => ({
              //   ...x,
              //   icon: require(`cryptocurrency-icons/svg/color/${x.qrFilename}.svg`),
              //   qr: require(`~/public/qr/${x.qrFilename}.svg`)
              // }))
            }
          />
        </Box>
    
        {readMoreLink && (
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
        )}
      </div>
    </Box>
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
}
SupportWidget.defaultProps = {
  artworkStyles: {},
  artworkWrapperStyles: {},
}
export { SupportWidget }
export const SupportWidgetFragment = graphql`
  fragment SupportWidget on RootQueryType {
    SupportWidget: supportWidgetAml (
      frontmatter: { lang: { eq: $lang } }
    ) {
      frontmatter {
        title
        readMoreLink
        readMoreLabel
      }
    }
  }`

const SideBar = ({
  newsletterPlaceholder,
  newsletterButtonLabel,
  newsletterBgColor,
  artwork,
  artworkCss,
  cryptos,
  contactLink,
  readMoreLink,
  readMoreLabel,
  displaySide,
  below,
  ...props
}) => (
  <div {...props}>
    <NewsletterWidget
      placeholder={newsletterPlaceholder}
      buttonLabel={newsletterButtonLabel}
      bgColor={newsletterBgColor}
      css={{
        position: `relative`,
        zIndex: 1,
        margin: `0 auto`,
      }}
    />
    <img
      src={artwork}
      alt="Artwork"
      className={css(
        artworkCss || {},
        {
          display: `none`,
          [breakPoints.minLgLandscape]: {
            display: `block`,
            position: `absolute`,
            left: displaySide === `left` ? 0 : `initial`,
            right: displaySide === `right` ? 0 : `initial`,
            transform: `translateY(-2rem)`,
          },
          [breakPoints.minXxl]: { display: `none` },
        }
      )}
    />
    <Box oh glass css={{
      marginTop: `3rem`,
      [breakPoints.minLgLandscape]: {
        marginTop: `6rem`,
        paddingTop: `3.2rem`,
      },
    }}>
      <H2 align="center" mb="2rem">
        Donate to help
      </H2>

      <Box flex column aICenter mb="2rem">
        <H3>Via PayPal</H3>

        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="AR3R6U8M5SDKS" />
          <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
          <img alt="" border="0" src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif" width="1" height="1" />
        </form>
      </Box>

      <Box flex column aICenter mb="2rem">
        <h3>Donate monthly</h3>
        <a href="https://patreon.com/HappyGaiAma" target="_blank" rel="noopener noreferrer">
          <img src={PatreonButton} alt="Patreon"/>
        </a>
      </Box>

      <Box flex column aICenter mb="2rem">
        <H3>The nerdy donation</H3>
        <CoinPicker
          coins={
            cryptos
            // .map(x => ({
            //   ...x,
            //   icon: require(`cryptocurrency-icons/svg/color/${x.qrFilename}.svg`),
            //   qr: require(`~/public/qr/${x.qrFilename}.svg`)
            // }))
          }
        />
      </Box>

      <Box flex column aICenter mb="2rem">
        <H3>Ask for other options</H3>
        <Link to={contactLink}>
          <Button>Contact us</Button>
        </Link>
      </Box>

      <Box flex column aICenter>
        <H3 fontSize="1.6rem">
          <Link to={readMoreLink}>
            {readMoreLabel}
          </Link>
        </H3>
      </Box>
    </Box>
    { below && below }
  </div>
)
SideBar.propTypes = {
  newsletterPlaceholder: PropTypes.string,
  newsletterButtonLabel: PropTypes.string,
  newsletterBgColor: PropTypes.string,
  artwork: PropTypes.string,
  artworkCss: PropTypes.object,
  artworkTransform: PropTypes.string,
  cryptos: PropTypes.array,
  contactLink: PropTypes.string,
  readMoreLink: PropTypes.string,
  readMoreLabel: PropTypes.string,
  displaySide: PropTypes.string,
  below: PropTypes.element,
}
SideBar.defaultProps = {
  displaySide: `left`,
}
export { SideBar }
export const SideBarFragment = graphql`
  fragment SideBar on RootQueryType {
    SideBar: javascriptFrontmatter(
      fileAbsolutePath: { regex: "/components\/SideBar/" }
      frontmatter: { lang: { eq: $lang } }
    ) {
      frontmatter {
        newsletterPlaceholder
        newsletterButtonLabel
        contactLink
        readMoreLink
        readMoreLabel
      }
    }
  }`

const InstagramFeed = ({
  user,
  followLink,
  bg,
  imgs,
}) => (
  <div>
    <Lazy image={bg} css={{
      display: `flex`,
      flexWrap: `wrap`,
      justifyContent: `center`,
      backgroundSize: `cover`,
      position: `relative`,
      width: `100vw`,
      left: `50%`,
      transform: `translateX(-50vw)`,
      padding: `2rem 0`,
      zIndex: -1,

      [breakPoints.minMd]: {
        justifyContent: `space-around`,
      },
    }}>
      {imgs.map(x => (
        <a
          key={x.node.id}
          href={`https://www.instagram.com/p/${x.node.code}/?taken-by=${x.node.username}`}
          target="_blank"
          css={{
            transition: `all .3s ease`,
            ':hover': { transform: `scale(1.02)` },
          }}
        >
          <Img
            alt="GaiAma on Instagram"
            resolutions={x.node.image.image.resolutions}
            css={{ border: `1px solid #000` }}
          />
        </a>
      ))}
    </Lazy>
    <div css={{
      marginTop: `.5rem`,
      [breakPoints.minSm]: {
        textAlign: `right`,
      },
    }}>
      <a
        href={`https://instagram.com/${user}`}
        target="_blank"
        css={{
          display: `inline-block`,
          fontFamily: fontFamilies.accent,
          lineHeight: `.8`,
          letterSpacing: `.3rem`,
          fontSize: `1rem`,
          [breakPoints.minSm]: {
            fontSize: `1rem`,
          },
        }}
      >
        <span css={{
          letterSpacing: `-.1rem`,
          marginRight: `1rem`,
        }}>—————————&gt;&gt;</span>&nbsp;
        {followLink}
      </a>
    </div>
  </div>
)
InstagramFeed.propTypes = {
  user: PropTypes.string,
  followLink: PropTypes.string,
  bg: PropTypes.string,
  imgs: PropTypes.array,
}
export { InstagramFeed }

export const instaQuery = graphql`
  fragment instagram on RootQueryType {
    instagram: instagramFeedAml (
      frontmatter: { lang: { eq: $lang } }
    ) {
      frontmatter {
        lang
        instagramUser
        followLink
        bg {
          image: childImageSharp {
            resolutions(width: 240) {
              ...GatsbyImageSharpResolutions
            }
          }
        }
      }
    }

    instagramImages: allInstagramJson (limit: 4) {
      edges {
        node {
          id
          code
          username
          image {
            image: childImageSharp {
              resolutions(width: 240, height: 240, quality: 60) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
        }
      }
    }
  }
`

// const CenteredCopyWithTitle = ({
//   title,
//   paragraphs,
//   ...props,
// }) => (
//   <div
//     css={{
//       margin: `4rem auto`,
//       textAlign: `center`,
//       [breakPoints.minMd]: {
//         width: `81%`,
//       },
//     }}
//     {...props}
//   >
//     <h2
//       id={slugify(title)}
//       css={{ fontSize: `2.7rem` }}
//     >
//       {title}
//     </h2>
//     <div css={{ fontSize: `1.1rem` }}>
//       {paragraphs.map((x, i) => <div key={i}>{x}</div>)}
//     </div>
//   </div>
// )
// CenteredCopyWithTitle