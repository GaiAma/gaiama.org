import React from 'react'
import PropTypes from 'prop-types'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { css } from '@emotion/core'
import Link from '@components/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-regular-svg-icons'
import { colors, media } from '@src/theme'

const Footer = ({
  menu,
  menuTitle,
  socialTitle,
  supportTitle,
  legal,
  bgImage,
  accounts,
  info,
  sponsors,
}) => (
  <footer
    css={css`
      background: linear-gradient(
          0deg,
          ${colors.primary85},
          ${colors.primary85}
        ),
        url(${bgImage.fluid.src}) no-repeat bottom;
      background-size: cover;
      color: ${colors.white};
      font-size: 0.9rem;
      font-weight: 100;
      padding: 4rem 0 2rem;
      & a {
        color: ${colors.white};
      }
    `}
  >
    <div
      css={css`
        display: flex;
        flex-direction: column;
        ${media.lessThan(`medium`)} {
          text-align: center;
          align-items: center;
          > *:not(:last-child) {
            margin-bottom: 3rem;
          }
          > * {
            width: 100%;
          }
        }
        ${media.greaterThan(`medium`)} {
          flex-direction: row;
          justify-content: space-around;
          > * {
            width: 33.33%;
          }
        }
      `}
    >
      <nav
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <div>
          <div
            css={css`
              margin-bottom: 1rem;
            `}
          >
            {menuTitle}
          </div>
          {menu.map((link, i) => (
            <div
              key={i}
              css={css`
                margin: 0.5rem 0;
                ${media.greaterThan(`medium`)} {
                  margin: 0.2rem 0;
                }
                & .active {
                  text-decoration: underline;
                }
                & .active-lang {
                  font-weight: 400;
                }
              `}
            >
              <Link
                to={link.to}
                activeClassName={link.lc ? `active-lang` : `active`}
                css={css`
                  border: none;
                `}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </div>
      </nav>

      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <div>
          <div
            css={css`
              margin-bottom: 1rem;
            `}
          >
            {socialTitle}
          </div>
          <ul
            className="fa-ul"
            css={css`
              margin-left: 0;
              & svg {
                margin-right: 0.4rem;
              }
            `}
          >
            {accounts.frontmatter.accounts.map(x => (
              <li
                key={x.service}
                css={css`
                  &:hover svg {
                    color: ${x.service !== `instagram` &&
                      colors.brands[x.service]};
                  }
                  &:hover svg * {
                    fill: ${x.service === `instagram` &&
                      `url(#InstagramGradient)`};
                  }
                `}
              >
                <a
                  href={x.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={x.description}
                  css={css`
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
              css={css`
                &:hover svg {
                  color: ${colors.brands.steemit};
                }
              `}
            >
              <a
                href="https://steemit.com/@gaiama"
                target="_blank"
                rel="noopener noreferrer"
                title="steemit"
                css={css`
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
      </div>

      {/* <div>
        <div
          css={css`
            margin-bottom: 1rem;
          `}
        >
          {supportTitle}
        </div>
      </div> */}

      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <div>
          <div
            css={css`
              a {
                border: none;
              }
              a:hover {
                background-color: transparent;
              }
            `}
          >
            <MDXRenderer>{info}</MDXRenderer>
          </div>

          {sponsors.length && (
            <div
              css={css`
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
                  to={node.fields.url}
                  key={node.fields.url}
                  css={css`
                    margin-right: 0.5rem;
                    border: none;
                  `}
                >
                  {node.frontmatter.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>

    <div
      css={css`
        margin-top: 0.5rem;
        text-align: center;
        ${media.greaterThan(`xlarge`)} {
          margin: 0;
        }
      `}
    >
      <span>Copyright ©</span>
      <span
        css={css`
          padding: 0 0.5rem;
        `}
      >
        2017-
        {new Date().getFullYear()}
      </span>
      <span>GaiAma.org</span>
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
  sponsors: PropTypes.array,
}

export default Footer
