import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import Link from '@/components/Link'
import Img from 'gatsby-image'
import Headroom from 'react-headroom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { visible } from '@/theme'
import style from './styles'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSticky: false,
    }
  }

  setSticky = sticky => this.setState({ isSticky: sticky })

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isSticky !== this.state.isSticky
  }

  render() {
    const { homepage, meta, menu, logo, bgImage } = this.props
    return (
      <header
        css={{
          ...style.header(),
          '& > .gatsby-image-outer-wrapper': {
            position: `absolute !important`,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            '& > .gatsby-image-wrapper': {
              position: `initial !important`,
            },
          },
        }}
      >
        <Img sizes={bgImage.sizes} />
        <div css={style.headerTop}>
          <div css={style.topInner}>
            <div css={style.headerBrand}>
              <Link to={homepage.slug} {...css(style.headerLink)} exact>
                <h2>
                  {homepage.header.title}
                  {homepage.header.subtitle && ` - ${homepage.header.subtitle}`}
                </h2>
              </Link>
            </div>

            <nav css={style.headerMeta}>
              {meta.map((link, index) => (
                <div
                  className={link.class}
                  css={style.headerMetaItem}
                  key={index}
                >
                  <Link
                    to={link.to}
                    activeClassName="active"
                    exact
                    {...css(style.headerLink, style.headerMeta_headerLink)}
                  >
                    <span css={visible.minMd}>{link.title}</span>
                    {(link.titleShort || link.icon) && (
                      <span
                        css={{
                          ...visible.maxMd,
                          '& .svg-inline--fa': {
                            verticalAlign: `-.2em`,
                          },
                        }}
                      >
                        {link.icon ? (
                          <FontAwesomeIcon icon={[`far`, link.icon]} />
                        ) : (
                          link.titleShort
                        )}
                      </span>
                    )}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>

        <div
          css={{
            ...style.headerBanner,
            '& .gatsby-image-wrapper': {
              zIndex: 2,
            },
            // '& img': { margin: 0 },
          }}
        >
          {/* <Img sizes={logo.sizes} alt="GaiAma Logo" css={style.headerLogo} /> */}
          <img
            src={logo.sizes.src}
            alt="GaiAma Logo"
            css={{ ...style.headerLogo, margin: `0 auto` }}
          />
        </div>

        <Headroom
          id="main-nav"
          pinStart={450}
          onPin={() => this.setSticky(true)}
          onUnpin={() => this.setSticky(false)}
          onUnfix={() => this.setSticky(false)}
          style={{
            maxWidth: `1440px`,
            margin: `0 auto`,
            zIndex: 2,
          }}
        >
          <nav
            aria-label="primary"
            css={style.headerNav({
              bg: bgImage.sizes.src,
              isSticky: this.state.isSticky,
            })}
          >
            <div css={style.headerNavScroller}>
              <div css={style.headerNavInner}>
                {menu.map((link, index) => (
                  <div key={index} css={style.headerNavItem}>
                    <Link
                      to={link.to}
                      activeClassName="active"
                      exact
                      {...css({
                        ...style.headerLink,
                        ...style.headerNav_headerLink,
                      })}
                    >
                      <span css={link.titleShort && visible.minMd}>
                        {link.title}
                      </span>
                      {link.titleShort && (
                        <span css={visible.maxMd}>{link.titleShort}</span>
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </Headroom>
      </header>
    )
  }
}

Header.propTypes = {
  homepage: PropTypes.object,
  meta: PropTypes.array,
  menu: PropTypes.array,
  isSticky: PropTypes.bool,
  logo: PropTypes.object,
  bgImage: PropTypes.object,
}

export default Header
