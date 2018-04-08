import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import Link from 'gatsby-link'
// import Img from 'gatsby-image'
import Headroom from 'react-headroom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { visible } from '@/theme'
import style from './styles'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSticky: false,
    }
  }

  setSticky = sticky =>
    this.setState({ isSticky: sticky })

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.isSticky !== this.state.isSticky
  }

  render () {
    const { title, subtitle, meta, menu, logo, bgImage } = this.props
    return (
      <header css={style.header({ bg: bgImage.sizes.src })}>
        <div css={style.headerTop}>
          <div css={style.topInner}>
            <div css={style.headerBrand}>
              <Link to="/" {...css(style.headerLink)} exact>
                <h2>
                  {title}
                  {subtitle && ` - ${subtitle}`}
                </h2>
              </Link>
            </div>
      
            <nav css={style.headerMeta}>
              {meta.map((link, index) =>
                <div className={link.class} css={style.headerMetaItem} key={index}>
                  <Link
                    to={link.to}
                    activeClassName="active"
                    exact
                    {...css(style.headerLink, style.headerMeta_headerLink)}
                  >
                    <span css={visible.minMd}>{link.title}</span>
                    {link.short && <span css={visible.maxMd}>
                      {link.short.icon
                        ? <FontAwesomeIcon icon={[`far`, link.short.icon]} />
                        : link.short}
                    </span>}
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>

        <div css={style.headerBanner}>
          <img
            src={logo.resolutions.src}
            alt="GaiAma Logo"
            css={style.headerLogo}
          />
        </div>

        <Headroom
          id="site-navigation"
          pinStart={450}
          onPin={() => this.setSticky(true)}
          onUnpin={() => this.setSticky(false)}
          onUnfix={() => this.setSticky(false)}
          style={{ zIndex: 5 }}
        >
          <nav
            aria-label="primary"
            css={style.headerNav({ bg: bgImage.sizes.src, isSticky: this.state.isSticky })}
          >
            <div css={style.headerNavScroller}>
              <div css={style.headerNavInner}>
                {menu.map((link, index) =>
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
                      {link.title}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </Headroom>
      </header>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  meta: PropTypes.array,
  menu: PropTypes.array,
  isSticky: PropTypes.bool,
  logo: PropTypes.object,
  bgImage: PropTypes.object,
}

export default Header
