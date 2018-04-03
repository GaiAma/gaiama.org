import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import hex2rgba from 'hex2rgba'
import {
  breakPoints,
  colors,
} from '@/theme'

const Footer = ({
  menu,
  menuTitle,
  socialTitle,
  supportTitle,
  metaTitle,
  meta,
  bgImage,
}) => (
  <footer css={{
    background: `linear-gradient(
                  0deg,
                  ${hex2rgba(colors.primary, 0.85)},
                  ${hex2rgba(colors.primary, 0.85)}
                ),
                url(${bgImage.resolutions.src}) no-repeat bottom`,
    backgroundSize: `cover`,
    display: `flex`,
    flexDirection: `column`,
    color: `#fff`,
    fontSize: `.9rem`,
    fontWeight: `100`,
    padding: `4rem 0 2rem`,
    [breakPoints.maxMd]: {
      alignItems: `center`,
      '& > *:not(:last-child)': { marginBottom: `3rem` },
    },
    [breakPoints.minMd]: {
      flexDirection: `row`,
      justifyContent: `space-around`,
    },
    '& a': {
      color: `#fff`,
    },
  }}>
    <nav>
      <div
        css={{
          marginBottom: `1rem`,
        }}
      >
        {menuTitle}
      </div>
      {menu.map((link, i) =>
        <div key={i}>
          <Link
            to={link.to}
            activeClassName="disabled"
            exact
          >
            {link.title}
          </Link>
        </div>
      )}
    </nav>

    <div>
      <div
        css={{
          marginBottom: `1rem`,
        }}
      >
        {socialTitle}
      </div>
      <ul
        className="fa-ul"
        css={{ marginLeft: `1.5rem` }}
      >
        <li css={{
          '&:hover svg': {
            color: colors.brands.facebook,
          },
        }}>
          <FontAwesomeIcon icon={[`fab`, `facebook-square`]} listItem />Facebook
        </li>
        <li css={{
          '&:hover svg *': {
            fill: `url(#InstagramGradient)`,
          },
        }}>
          <FontAwesomeIcon icon={[`fab`, `instagram`]} listItem />Instagram
        </li>
        <li css={{
          '&:hover svg': {
            color: colors.brands.youtube,
          },
        }}>
          <FontAwesomeIcon icon={[`fab`, `youtube`]} listItem />Youmeo
        </li>
        <li css={{
          '&:hover svg': {
            color: colors.brands.patreon,
          },
        }}>
          <FontAwesomeIcon icon={[`fab`, `patreon`]} listItem />Patreon
        </li>
        <li>
          Flattr
        </li>
      </ul>
    </div>

    <div>
      <div
        css={{
          marginBottom: `1rem`,
        }}
      >
        {supportTitle}
      </div>
    </div>

    <div>
      <div
        css={{
          marginBottom: `1rem`,
        }}
      >
        {metaTitle}
      </div>
      {meta.map((x, i) => (
        <p
          key={i}
          dangerouslySetInnerHTML={{ __html: x }}
        />
      ))}
    </div>      
  </footer>
)

Footer.propTypes = {
  menu: PropTypes.array,
  menuTitle: PropTypes.string,
  socialTitle: PropTypes.string,
  supportTitle: PropTypes.string,
  metaTitle: PropTypes.string,
  meta: PropTypes.array,
  bgImage: PropTypes.object,
}

export default Footer
