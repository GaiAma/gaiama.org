import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import MainLayout from '@components/MainLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faRssSquare } from '@fortawesome/free-solid-svg-icons/faRssSquare'
import { colors, media } from '@src/theme'
import TitledCopy from '@components/TitledCopy'
import { Newsletter } from '@components/NewsletterWidget'
import ContactForm from '@components/ContactForm'

const StyledA = styled.a`
  border: none;
  :hover {
    background-color: transparent;
  }
`

const ContactPage = props => {
  const { page } = props.data
  return (
    <MainLayout
      {...props}
      wrapperStyles={{
        [media.greaterThan(`small`)]: {
          background: `url(${
            page.frontmatter.assets.bg.image.fluid.src
          }) no-repeat right 1rem`,
        },
        maxWidth: `100%`,
        minHeight: `680px`,
        paddingTop: `2rem`,
        paddingRight: 0,
        paddingBottom: 0,
        [media.greaterThan(`medium`)]: {
          width: `100%`,
        },
      }}
    >
      {/* <p>
        Mit dem Absenden Ihrer Anfrage erklären Sie sich mit der Verarbeitung
        Ihrer angegebenen Daten zum Zweck der Bearbeitung Ihrer Anfrage
        einverstanden ([LINK]Datenschutzerklärung und Widerrufshinweise[/LINK])
      </p> */}
      <div
        css={css`
          overflow: hidden;
          padding: 0.2rem;
          display: flex;
          justify-content: space-between;
          ${media.lessThan(`xsmall`)} {
            flex-direction: column;
          }
          ${media.greaterThan(`xsmall`)} {
            & > div {
              width: 40%;
            }
          }
          ${media.greaterThan(`medium`)} {
            width: 57%;
            margin: 3rem 2rem 0 6rem;
          }
        `}
      >
        <div
          css={css`
            margin-bottom: 3rem;
          `}
        >
          <TitledCopy
            rank="1"
            full
            title={page.frontmatter.title}
            // paragraphs={page.frontmatter.form.descr}
            css={css`
              margin-bottom: 1.5rem;
              & h2 {
                margin-bottom: 1rem;
              }
              & div {
                font-size: 0.9rem;
              }
              ${media.lessThan(`xsmall`)} {
                text-align: center;
              }
            `}
          />

          <div
            css={css`
              display: flex;
              justify-content: space-between;
              ${media.lessThan(`small`)} {
                margin-bottom: 2rem;
              }
              & > div {
                margin-bottom: 1.5rem;
                & > a {
                  color: ${colors.purpleDark};
                }
              }
            `}
          >
            {props.data.Accounts.frontmatter.accounts
              .filter(x => x.meta !== `true`)
              .map(x => (
                <div
                  key={x.service}
                  css={css`
                    & svg {
                      color: ${x.service !== `instagram` &&
                        colors.brands[x.service]};
                    }
                    & svg * {
                      fill: ${x.service === `instagram` &&
                        `url(#InstagramGradient)`};
                    }
                    &:hover svg {
                      color: ${colors.black};
                    }
                  `}
                >
                  <StyledA
                    href={x.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={x.description}
                  >
                    <FontAwesomeIcon icon={[`fab`, x.icon]} size="lg" />
                  </StyledA>
                </div>
              ))}
            {/* <div
              css={css`
                & svg {
                  color: ${colors.rss};
                }
                &:hover svg {
                  color: ${colors.black};
                }
              `}
            >
              <StyledA
                href={`/${props.pageContext.lang}/blog/rss.xml`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faRssSquare} size="lg" />
              </StyledA>
            </div> */}
          </div>

          <ContactForm
            emailLabel={page.frontmatter.form.emailLabel}
            emailPlaceholder={page.frontmatter.form.emailPlaceholder}
            messageLabel={page.frontmatter.form.messageLabel}
            privacyLink={page.frontmatter.privacyLink}
            privacyLabel={page.frontmatter.privacyLabel}
            consentLabel={page.frontmatter.form.consentLabel}
            success={page.frontmatter.form.success}
            submitLabel={page.frontmatter.form.submitLabel}
            lang={props.pageContext.lang}
            emailErrorLabel={page.frontmatter.errors.emailErrorLabel}
            requiredLabel={page.frontmatter.errors.requiredLabel}
            generalErrorLabel={page.frontmatter.errors.generalErrorLabel}
            endpoint="https://gaiama-contact.now.sh"
          />
        </div>

        <div
          css={css`
            display: flex;
          `}
        >
          <div>
            <TitledCopy
              full
              title={page.frontmatter.newsletter.title}
              paragraphs={page.frontmatter.newsletter.descr}
              css={css`
                margin-bottom: 1.3rem;
                & h2 {
                  margin-bottom: 1rem;
                }
                & div {
                  font-size: 0.9rem;
                }
                ${media.lessThan(`xsmall`)} {
                  text-align: center;
                }
              `}
            />
            <Newsletter
              emailLabel={page.frontmatter.form.emailLabel}
              emailPlaceholder={page.frontmatter.form.emailPlaceholder}
              privacyLink={page.frontmatter.privacyLink}
              privacyLabel={page.frontmatter.privacyLabel}
              consentLabel={page.frontmatter.newsletter.consentLabel}
              success={page.frontmatter.newsletter.success}
              submitLabel={page.frontmatter.form.submitLabel}
              lang={props.pageContext.lang}
              emailErrorLabel={page.frontmatter.errors.emailErrorLabel}
              generalErrorLabel={page.frontmatter.errors.generalErrorLabel}
              endpoint="https://gaiama-newsletter.now.sh"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
ContactPage.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object,
}

export default ContactPage

export const query = graphql`
  query($lang: String!, $slug: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...legal
    ...Accounts

    page: javascriptFrontmatter(frontmatter: { slug: { eq: $slug } }) {
      ...PageTranslations
      fields {
        url
      }
      frontmatter {
        title
        lang
        slug
        summary
        cookieNote
        privacyLink
        privacyLabel
        form {
          descr
          emailLabel
          messageLabel
          submitLabel
          consentLabel
          success
        }
        newsletter {
          title
          descr
          consentLabel
          success
        }
        errors {
          emailErrorLabel
          requiredLabel
          generalErrorLabel
        }
        assets {
          bg {
            image: childImageSharp {
              fluid(maxWidth: 800, quality: 75) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  }
`

// import React from 'react'
// import rehypeReact from 'rehype-react'
// import MainLayout from '@components/Layouts/MainLayout'

// const renderAst = new rehypeReact({
//   createElement: React.createElement
// }).Compiler

// export default props => {
//   return (
//     <MainLayout pageProps={props}>
//       <h1>{props.data.page.frontmatter.title}</h1>

//       <div>
//         {/* {renderAst(props.data.page.htmlAst)} */}
//       </div>
//     </MainLayout>
//   )
// }

// export const query = graphql`
//   query(
//     $lang: String!
//     $slug: String!
//   ) {
//     ...homepage
//     ...menu
//     ...pageJs
//   }
// `
