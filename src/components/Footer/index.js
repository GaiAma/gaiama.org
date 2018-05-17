import React from 'react'
import PropTypes from 'prop-types'
import Link from '@/components/Link'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import hex2rgba from 'hex2rgba'
import { colors, media } from '@/theme'

const Footer = ({
  menu,
  menuTitle,
  socialTitle,
  supportTitle,
  metaTitle,
  meta,
  legal,
  bgImage,
}) => (
  <footer
    css={{
      background: `linear-gradient(
          0deg,
          ${hex2rgba(colors.primary, 0.85)},
          ${hex2rgba(colors.primary, 0.85)}
        ),
        url(${bgImage.sizes.src}) no-repeat bottom`,
      backgroundSize: `cover`,
      display: `flex`,
      flexDirection: `column`,
      color: `#fff`,
      fontSize: `.9rem`,
      fontWeight: `100`,
      padding: `4rem 0 2rem`,
      [media.lessThan(`medium`)]: {
        textAlign: `center`,
        alignItems: `center`,
        '& > *:not(:last-child)': { marginBottom: `3rem` },
        '& > div': {
          width: `100%`,
        },
      },
      [media.greaterThan(`medium`)]: {
        flexDirection: `row`,
        justifyContent: `space-around`,
      },
      '& a': {
        color: `#fff`,
      },
    }}
  >
    <nav>
      <div
        css={{
          marginBottom: `1rem`,
        }}
      >
        {menuTitle}
      </div>
      {menu.map((link, i) => (
        <div
          key={i}
          css={{
            margin: `.5rem 0`,
            [media.greaterThan(`medium`)]: {
              margin: `.2rem 0`,
            },
          }}
        >
          <Link to={link.to} activeClassName="disabled" exact>
            {link.title}
          </Link>
        </div>
      ))}
    </nav>

    <div>
      <div css={{ marginBottom: `1rem` }}>{socialTitle}</div>
      <ul
        className="fa-ul"
        css={{
          marginLeft: `0`,
          '& svg': { marginRight: `.4rem` },
        }}
      >
        <li
          css={{
            '&:hover svg': {
              color: colors.brands.facebook,
            },
          }}
        >
          <FontAwesomeIcon icon={[`fab`, `facebook-square`]} />Facebook
        </li>
        <li
          css={{
            '&:hover svg *': {
              fill: `url(#InstagramGradient)`,
            },
          }}
        >
          <FontAwesomeIcon icon={[`fab`, `instagram`]} />Instagram
        </li>
        <li
          css={{
            '&:hover svg': {
              color: colors.brands.youtube,
            },
          }}
        >
          <FontAwesomeIcon icon={[`fab`, `youtube`]} />Youmeo
        </li>
        <li
          css={{
            '&:hover svg': {
              color: colors.brands.patreon,
            },
          }}
        >
          <FontAwesomeIcon icon={[`fab`, `patreon`]} />Patreon
        </li>
        {/* <li>Flattr</li> */}
      </ul>
    </div>

    {/* <div>
      <div
        css={{
          marginBottom: `1rem`,
        }}
      >
        {supportTitle}
      </div>
    </div> */}

    <div>
      <div
        css={{
          marginBottom: `1rem`,
        }}
      >
        {metaTitle}
      </div>
      {meta.map((x, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: x }} />
      ))}
      <div>
        <Link to={legal.frontmatter.slug}>{legal.frontmatter.title}</Link>
      </div>
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
  legal: PropTypes.object,
  bgImage: PropTypes.object,
}

export default Footer
