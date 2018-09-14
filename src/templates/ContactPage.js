import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import MainLayout from '@/components/MainLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { colors, media } from '@/theme'
import TitledCopy from '@/components/TitledCopy'
import { Newsletter } from '@/components/NewsletterWidget'
import ContactForm from '@/components/ContactForm'

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
        css={{
          overflow: `hidden`,
          padding: `.2rem`,
          display: `flex`,
          justifyContent: `space-between`,
          [media.lessThan(`xsmall`)]: {
            flexDirection: `column`,
          },
          [media.greaterThan(`xsmall`)]: {
            '& > div': {
              width: `40%`,
            },
          },
          [media.greaterThan(`medium`)]: {
            width: `57%`,
            margin: `3rem 2rem 0 6rem`,
          },
        }}
      >
        <div
          css={{
            marginBottom: `3rem`,
          }}
        >
          <TitledCopy
            full
            title={page.frontmatter.title}
            // paragraphs={page.frontmatter.form.descr}
            css={{
              marginBottom: `1.5rem`,
              '& h2': {
                marginBottom: `1rem`,
              },
              '& div': {
                fontSize: `.9rem`,
              },
              [media.lessThan(`xsmall`)]: {
                textAlign: `center`,
              },
            }}
          />

          <div
            css={{
              display: `flex`,
              justifyContent: `space-between`,
              [media.lessThan(`small`)]: {
                marginBottom: `2rem`,
              },
              '& > div': {
                // position: `relative`,
                // zIndex: 3,
                marginBottom: `1.5rem`,
                '& > a': {
                  color: `#2d2a34`,
                },
              },
            }}
          >
            {props.data.Accounts.frontmatter.accounts
              .filter(x => x.meta !== `true`)
              .map(x => (
                <div
                  key={x.service}
                  css={{
                    '& svg': x.service !== `instagram` && {
                      color: colors.brands[x.service],
                    },
                    '& svg *': x.service === `instagram` && {
                      fill: `url(#InstagramGradient)`,
                    },
                    '&:hover svg': {
                      color: colors.black,
                    },
                  }}
                >
                  <a
                    href={x.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={x.description}
                  >
                    <FontAwesomeIcon icon={[`fab`, x.icon]} size="lg" />
                  </a>
                </div>
              ))}
            <div
              css={{
                '& svg': {
                  color: colors.rss,
                },
                '&:hover svg': {
                  color: colors.black,
                },
              }}
            >
              <a
                href={`/${props.pageContext.lang}/blog/rss.xml`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={[`fas`, `rss-square`]} size="lg" />
              </a>
            </div>
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
          css={{
            display: `flex`,
          }}
        >
          <div>
            <TitledCopy
              full
              title={page.frontmatter.newsletter.title}
              paragraphs={page.frontmatter.newsletter.descr}
              css={{
                marginBottom: `1.3rem`,
                '& h2': {
                  marginBottom: `1rem`,
                },
                '& div': {
                  fontSize: `.9rem`,
                },
                [media.lessThan(`xsmall`)]: {
                  textAlign: `center`,
                },
              }}
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
      fields {
        url
        translations {
          fields {
            url
          }
          frontmatter {
            title
            lang
            slug
          }
        }
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
              fluid(
                maxWidth: 800
                quality: 75 #duotone: { #  highlight: "#ffffff", #  shadow: "#ff0016" #}
              ) {
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
// import MainLayout from '@/components/Layouts/MainLayout'

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
