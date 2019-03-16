import React from 'react'
import PropTypes from 'prop-types'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import Link from '@/components/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-regular-svg-icons'
import { colors, media } from '@/theme'

const Footer = ({
  menu,
  menuTitle,
  socialTitle,
  supportTitle,
  legal,
  bgImage,
  accounts,
  info,
}) => (
  <footer
    css={{
      background: `linear-gradient(
          0deg,
          ${colors.primary85},
          ${colors.primary85}
        ),
        url(${bgImage.fluid.src}) no-repeat bottom`,
      backgroundSize: `cover`,
      display: `flex`,
      flexDirection: `column`,
      color: colors.white,
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
        color: colors.white,
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
            css={`
              border: none;
            `}
          >
            {link.title}
          </Link>
        </div>
      ))}
      <div css={{ marginTop: `2rem` }}>
        <span>
          Copyright &copy; 2017-
          {new Date().getFullYear()}
        </span>
        <br />
        GaiAma.org
      </div>
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
              css={`
                border: none;
                :hover {
                  background-color: transparent;
                }
              `}
            >
              <FontAwesomeIcon icon={[`fab`, x.icon]} />
              {x.name}
            </a>
          </li>
        ))}
        <li
          css={{
            '&:hover svg': {
              color: colors.brands.steemit,
            },
          }}
        >
          <a
            href="https://steemit.com/@gaiama"
            target="_blank"
            rel="noopener noreferrer"
            title="steemit"
            css={`
              border: none;
              :hover {
                background-color: transparent;
              }
            `}
          >
            <FontAwesomeIcon icon={faComments} />
            Steemit
          </a>
        </li>
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
        css={`
          a {
            border: none;
          }
          a:hover {
            background-color: transparent;
          }
          a + a {
            margin-left: 0.7rem;
          }
        `}
      >
        <MDXRenderer>{info}</MDXRenderer>
      </div>
      <div>
        {legal.length &&
          legal.map(({ node }) => (
            <Link
              to={node.fields.url}
              key={node.fields.url}
              css={`
                margin-right: 0.5rem;
                border: none;
              `}
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
  legal: PropTypes.array,
  bgImage: PropTypes.object,
  accounts: PropTypes.object,
  info: PropTypes.object,
}

export default Footer
