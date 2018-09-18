import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from '@/components/Link'
import Img from 'gatsby-image'
import Headroom from 'react-headroom'
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
      <header css={style.header()}>
        <Img fluid={bgImage.fluid} />
        <div css={style.headerTop}>
          <div css={style.topInner}>
            <div css={style.headerBrand}>
              <Link to={homepage.fields.url} css={style.headerLink}>
                <h2>
                  {homepage.frontmatter.header.title}
                  {homepage.frontmatter.header.subtitle &&
                    ` - ${homepage.frontmatter.header.subtitle}`}
                </h2>
              </Link>
            </div>

            {/* TODO: remember lang in local FORAGE? to show correct in 404 */}
            <nav css={style.headerMeta}>
              {meta.map((link, index) => (
                <div
                  className={link.class}
                  css={style.headerMetaItem}
                  key={index}
                >
                  <Link
                    to={link.to}
                    css={(style.headerLink, style.headerMeta_headerLink)}
                    activeClassName="active"
                  >
                    <span css={link.titleShort && visible.minMd}>
                      {link.title}
                    </span>
                    {link.titleShort && (
                      <span
                        css={{
                          ...visible.maxMd,
                          '& .svg-inline--fa': {
                            verticalAlign: `-.2em`,
                          },
                        }}
                      >
                        {link.titleShort}
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
          {/* <Img fluid={logo.fluid} alt="GaiAma Logo" css={style.headerLogo} /> */}
          <Link to={homepage.fields.url}>
            <img
              src={logo.fluid.src}
              alt="GaiAma Logo"
              css={{ ...style.headerLogo, margin: `0 auto` }}
            />
          </Link>
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
              bg: bgImage.fluid.src,
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
                      css={{
                        ...style.headerLink,
                        ...style.headerNav_headerLink,
                      }}
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
