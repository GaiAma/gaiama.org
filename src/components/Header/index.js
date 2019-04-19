import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Link from '@components/Link'
import Img from 'gatsby-image/withIEPolyfill'
import Headroom from 'react-headroom'
import { visible } from '@src/theme'
import style from './styles'

const OnlyDesktop = styled.span(props => props.visible && visible.minMd)
const OnlyMobile = styled.span(visible.maxMd)
const HeaderWrapper = styled.header(style.header)
const HeaderTop = styled.div(style.headerTop)
const TopInner = styled.div(style.topInner)
const Brand = styled.div(style.headerBrand)
const HeaderLink = styled(Link)(style.headerLink)
const MetaLink = styled(HeaderLink)(style.headerMeta_headerLink)
const Meta = styled.nav(style.headerMeta)
const MetaItem = styled.div(style.headerMetaItem)
const NavInner = styled.div(style.headerNavInner)
const Banner = styled.div(style.headerBanner)
const Logo = styled(Img)(style.headerLogo)
const StickyHeader = styled(Headroom)({
  maxWidth: `1440px`,
  margin: `0 auto`,
  zIndex: 2,
})
const MainNav = styled.nav(props => style.headerNav(props))
const NavScroller = styled.div(style.headerNavScroller)
const NavItem = styled.div(style.headerNavItem)
const MainLink = styled(HeaderLink)(style.headerNav_headerLink)

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
      <HeaderWrapper>
        <Img fluid={bgImage.fluid} />
        <HeaderTop>
          <TopInner>
            <Brand>
              <HeaderLink to={homepage.fields.url}>
                <h2>
                  {homepage.frontmatter.header.title}
                  {homepage.frontmatter.header.subtitle &&
                    ` - ${homepage.frontmatter.header.subtitle}`}
                </h2>
              </HeaderLink>
            </Brand>

            {/* TODO: remember lang in local FORAGE? to show correct in 404 */}
            <Meta>
              {meta.map((link, index) => (
                <MetaItem className={link.class} key={index}>
                  <MetaLink to={link.to} activeClassName="active">
                    <OnlyDesktop visible={link.titleShort}>
                      {link.title}
                    </OnlyDesktop>
                    {link.titleShort && (
                      <OnlyMobile>{link.titleShort}</OnlyMobile>
                    )}
                  </MetaLink>
                </MetaItem>
              ))}
            </Meta>
          </TopInner>
        </HeaderTop>

        <Banner>
          <Link to={homepage.fields.url}>
            <Logo fluid={logo.fluid} alt="GaiAma Logo" />
          </Link>
        </Banner>

        <StickyHeader
          id="main-nav"
          pinStart={450}
          onPin={() => this.setSticky(true)}
          onUnpin={() => this.setSticky(false)}
          onUnfix={() => this.setSticky(false)}
        >
          <MainNav
            aria-label="primary"
            bg={bgImage.fluid.src}
            isSticky={this.state.isSticky}
          >
            <NavScroller>
              <NavInner>
                {menu.map((link, index) => (
                  <NavItem key={index}>
                    <MainLink to={link.to} activeClassName="active">
                      <OnlyDesktop visible={link.titleShort}>
                        {link.title}
                      </OnlyDesktop>
                      {link.titleShort && (
                        <OnlyMobile>{link.titleShort}</OnlyMobile>
                      )}
                    </MainLink>
                  </NavItem>
                ))}
              </NavInner>
            </NavScroller>
          </MainNav>
        </StickyHeader>
      </HeaderWrapper>
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
