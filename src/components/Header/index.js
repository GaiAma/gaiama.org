/** @jsx jsx */
import { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx, useColorMode } from 'theme-ui'
import { Link } from '@components/Link'
import Img from 'gatsby-image/withIEPolyfill'
import Headroom from 'react-headroom'
import { visible } from '@src/theme'
import style from './styles'
import { setCookie } from '@src/utils/cookie'

const OnlyDesktop = props => (
  <span sx={props.visible && visible.minMd} {...props} />
)
OnlyDesktop.propTypes = {
  visible: PropTypes.bool,
}
const OnlyMobile = props => <span sx={visible.maxMd} {...props} />
const HeaderWrapper = props => <header sx={style.header} {...props} />
const HeaderTop = props => <div sx={style.headerTop} {...props} />
const TopInner = props => <div sx={style.topInner} {...props} />
const Brand = props => <div sx={style.headerBrand} {...props} />
const HeaderLink = props => (
  <Link variant="plain" sx={style.headerLink} {...props} />
)
const MetaLink = props => (
  <HeaderLink sx={style.headerMeta_headerLink} {...props} />
)
const Meta = props => <nav sx={style.headerMeta} {...props} />
const MetaItem = props => <div sx={style.headerMetaItem} {...props} />
const NavInner = props => <div sx={style.headerNavInner} {...props} />
const Banner = props => <div sx={style.headerBanner} {...props} />
const Logo = props => <Img sx={style.headerLogo} {...props} />
const StickyHeader = props => (
  <Headroom
    sx={{
      maxWidth: `1440px`,
      margin: `0 auto`,
      zIndex: 2,
    }}
    {...props}
  />
)
const MainNav = ({ bg, isSticky, ...props }) => (
  <nav sx={style.headerNav({ bg, isSticky })} {...props} />
)
MainNav.propTypes = {
  bg: PropTypes.string,
  isSticky: PropTypes.bool,
}
const NavScroller = props => <div sx={style.headerNavScroller} {...props} />
const NavItem = props => <div sx={style.headerNavItem} {...props} />
const MainLink = props => (
  <HeaderLink sx={style.headerNav_headerLink} {...props} />
)

const Header = ({ homepage, meta, menu, logo, bgImage }) => {
  const [isSticky, setIsSticky] = useState(false)
  const [colorMode] = useColorMode()

  return (
    <HeaderWrapper>
      <Img
        fluid={bgImage.fluid}
        sx={{ filter: colorMode === `dark` && `brightness(0.6)` }}
      />
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
            {meta.map(link => (
              <MetaItem className={link.class} key={link.id}>
                <MetaLink
                  to={link.to}
                  activeClassName="active"
                  onClick={() => setCookie(`nf_lang`, link.id)}
                >
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

      <Banner
        sx={{
          filter: colorMode === `dark` && `brightness(0.6)`,
          mb: isSticky && [`42px`, `67px`],
        }}
      >
        <Link to={homepage.fields.url}>
          <Logo fluid={logo.fluid} alt="GaiAma Logo" />
        </Link>
      </Banner>

      <StickyHeader
        id="main-nav"
        pinStart={450}
        onPin={() => setIsSticky(true)}
        onUnpin={() => setIsSticky(false)}
        onUnfix={() => setIsSticky(false)}
      >
        <MainNav
          aria-label="primary"
          bg={bgImage.fluid.src}
          isSticky={isSticky}
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

Header.propTypes = {
  homepage: PropTypes.object,
  meta: PropTypes.array,
  menu: PropTypes.array,
  isSticky: PropTypes.bool,
  logo: PropTypes.object,
  bgImage: PropTypes.object,
}

export default Header
