import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'
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
  accounts,
}) => (
  <footer
    css={{
      background: `linear-gradient(
          0deg,
          ${hex2rgba(colors.primary, 0.85)},
          ${hex2rgba(colors.primary, 0.85)}
        ),
        url(${bgImage.fluid.src}) no-repeat bottom`,
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
            '& .active': {
              textDecoration: `underline`,
            },
            '& .active-lang': {
              fontWeight: 400,
            },
          }}
        >
          <Link
            to={link.to}
            activeClassName={link.lc ? `active-lang` : `active`}
          >
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
        {accounts.frontmatter.accounts.map(x => (
          <li
            key={x.service}
            css={{
              '&:hover svg': x.service !== `instagram` && {
                color: colors.brands[x.service],
              },
              '&:hover svg *': x.service === `instagram` && {
                fill: `url(#InstagramGradient)`,
              },
            }}
          >
            <a
              href={x.url}
              target="_blank"
              rel="noopener noreferrer"
              title={x.description}
            >
              <FontAwesomeIcon icon={[`fab`, x.icon]} />
              {x.name}
            </a>
          </li>
        ))}
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
        {legal.length &&
          legal.map(({ node }) => (
            <Link
              to={node.frontmatter.slug}
              key={node.frontmatter.slug}
              {...css({ marginRight: `.5rem` })}
            >
              {node.frontmatter.title}
            </Link>
          ))}
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
  legal: PropTypes.array,
  bgImage: PropTypes.object,
  accounts: PropTypes.object,
}

export default Footer
