/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { Link } from '@components/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { media } from '@src/theme'

const Footer = ({
  menu,
  menuTitle,
  socialTitle,
  // supportTitle,
  legal,
  bgImage,
  accounts,
  info,
  sponsors,
}) => (
  <footer
    sx={{
      background: theme => `linear-gradient(
          0deg,
          ${theme.colors.primary85},
          ${theme.colors.primary85}
        ),
        url(${bgImage.fluid.src}) no-repeat bottom`,
      backgroundSize: `cover`,
      color: `white`,
      fontSize: `0.9rem`,
      fontWeight: 100,
      padding: `4rem 0 2rem`,
      '& a': {
        color: `white`,
      },
    }}
  >
    <div
      sx={{
        display: `flex`,
        flexDirection: `column`,
        [media.lessThan(`medium`)]: {
          textAlign: `center`,
          alignItems: `center`,
          '> *:not(:last-child)': {
            marginBottom: `3rem`,
          },
          '> *': {
            width: `100%`,
          },
        },
        [media.greaterThan(`medium`)]: {
          flexDirection: `row`,
          justifyContent: `space-around`,
          '> *': {
            width: `33.33%`,
          },
        },
      }}
    >
      <nav
        sx={{
          display: `flex`,
          justifyContent: `center`,
        }}
      >
        <div>
          <div
            sx={{
              marginBottom: `1rem`,
            }}
          >
            {menuTitle}
          </div>
          {menu.map((link, i) => (
            <div
              key={i}
              sx={{
                margin: `0.5rem 0`,
                [media.greaterThan(`medium`)]: {
                  margin: `0.2rem 0`,
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
                variant="plain"
              >
                {link.title}
              </Link>
            </div>
          ))}
        </div>
      </nav>

      <div
        sx={{
          display: `flex`,
          justifyContent: `center`,
        }}
      >
        <div>
          <div sx={{ mb: `1rem` }}>{socialTitle}</div>
          <ul
            className="fa-ul"
            sx={{
              ml: 0,
              '& svg': {
                mr: `0.4rem`,
              },
            }}
          >
            {accounts.frontmatter.accounts.map(x => (
              <li
                key={x.service}
                sx={{
                  '&:hover svg': {
                    color: x.service !== `instagram` && x.service,
                  },
                  '&:hover svg *': {
                    fill:
                      x.service === `instagram` && `url(#InstagramGradient)`,
                  },
                }}
              >
                <Link to={x.url} variant="plain" title={x.description}>
                  <FontAwesomeIcon icon={[x.icon.prefix, x.icon.name]} />
                  {x.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        sx={{
          display: `flex`,
          justifyContent: `center`,
        }}
      >
        <div>
          <div
            sx={{
              a: {
                border: `none`,
              },
              'a:hover': {
                backgroundColor: `transparent`,
              },
            }}
          >
            <MDXRenderer>{info}</MDXRenderer>
          </div>

          {sponsors.length && (
            <div
              sx={{
                a: {
                  border: `none`,
                },
                'a:hover': {
                  backgroundColor: `transparent`,
                },
                'a + a': {
                  ml: `0.7rem`,
                },
              }}
            >
              {sponsors.map(s => (
                <a
                  key={s.id}
                  title={s.title}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={s.src.publicURL}
                    alt={s.alt}
                    width="30"
                    height="30"
                  />
                </a>
              ))}
            </div>
          )}

          <div>
            {legal.length &&
              legal.map(({ node }) => (
                <Link
                  key={node.fields.url}
                  to={node.fields.url}
                  variant="plain"
                  mr="0.5rem"
                >
                  {node.frontmatter.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>

    <div
      sx={{
        mt: `0.5rem`,
        textAlign: `center`,
        [media.greaterThan(`xlarge`)]: {
          margin: 0,
        },
      }}
    >
      <span>Copyright ©</span>
      <span sx={{ p: `0 0.5rem` }}>
        2017 - ∞{/* {new Date().getFullYear()} */}
      </span>
      <span>GaiAma.org</span>
    </div>
  </footer>
)

Footer.propTypes = {
  menu: PropTypes.array,
  menuTitle: PropTypes.string,
  socialTitle: PropTypes.string,
  // supportTitle: PropTypes.string,
  legal: PropTypes.array,
  bgImage: PropTypes.object,
  accounts: PropTypes.object,
  info: PropTypes.object,
  sponsors: PropTypes.array,
}

export default Footer
