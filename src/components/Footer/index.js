import React from 'react'
import PropTypes from 'prop-types'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { css } from '@emotion/core'
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
    css={css`
      background: linear-gradient(
          0deg,
          ${colors.primary85},
          ${colors.primary85}
        ),
        url(${bgImage.fluid.src}) no-repeat bottom;
      background-size: cover;
      display: flex;
      flex-direction: column;
      color: ${colors.white};
      font-size: 0.9rem;
      font-weight: 100;
      padding: 4rem 0 2rem;
      ${media.lessThan(`medium`)} {
        text-align: center;
        align-items: center;
        & > *:not(:last-child) {
          marginbottom: 3rem;
        }
        & > div {
          width: 100%;
        }
      }
      ${media.greaterThan(`medium`)} {
        flex-direction: row;
        justify-content: space-around;
      }
      & a {
        color: ${colors.white};
      }
    `}
  >
    <nav>
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
      <div
        css={css`
          margin-top: 2rem;
        `}
      >
        <span>
          Copyright &copy; 2017-
          {new Date().getFullYear()}
        </span>
        <br />
        GaiAma.org
      </div>
    </nav>

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
                color: ${x.service !== `instagram` && colors.brands[x.service]};
              }
              &:hover svg * {
                fill: ${x.service === `instagram` && `url(#InstagramGradient)`};
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

    {/* <div>
      <div
        css={css`
          margin-bottom: 1rem;
        `}
      >
        {supportTitle}
      </div>
    </div> */}

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
