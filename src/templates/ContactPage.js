/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
// import Img from 'gatsby-image/withIEPolyfill'
import { Box, Flex } from '@theme-ui/components'
import MainLayout from '@components/MainLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TitledCopy from '@components/TitledCopy'
import { Newsletter } from '@components/NewsletterWidget'
import ContactForm from '@components/ContactForm'
import { Link } from '@components/Link'

const ContactPage = props => {
  const { page } = props.data
  return (
    <MainLayout
      {...props}
      wrapperStyles={{
        maxWidth: `100%`,
        minHeight: `680px`,
        paddingTop: `2rem`,
        paddingRight: 0,
        paddingBottom: 0,
      }}
    >
      {/* <p>
        Mit dem Absenden Ihrer Anfrage erklären Sie sich mit der Verarbeitung
        Ihrer angegebenen Daten zum Zweck der Bearbeitung Ihrer Anfrage
        einverstanden ([LINK]Datenschutzerklärung und Widerrufshinweise[/LINK])
      </p> */}
      <div
        // columns={[1, null, null, 2]}
        // gap={5}
        sx={{
          // mx: `auto`,
          // maxWidth: `100rem`,
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          mb: `4rem`,
        }}
      >
        <Box mb="3rem" sx={{ width: '100%', maxWidth: '22rem' }}>
          <TitledCopy
            rank="1"
            full
            title={page.frontmatter.title}
            sx={{
              marginBottom: `1.5rem`,
              '& h2': {
                marginBottom: `1rem`,
              },
              '& div': {
                fontSize: `0.9rem`,
              },
            }}
          />

          <Flex mx="-1rem" mb="1rem">
            {props.data.Accounts.frontmatter.accounts.map(x => (
              <Box
                key={x.service}
                mx="1rem"
                sx={{
                  '& svg': {
                    color: x.service !== `instagram` && x.service,
                  },
                  '& svg *': {
                    fill:
                      x.service === `instagram` && `url(#InstagramGradient)`,
                  },
                  '&:hover svg': {
                    color: `black`,
                    '*': {
                      fill: `black`,
                    },
                  },
                }}
              >
                <Link to={x.url} variant="plain" title={x.description}>
                  <FontAwesomeIcon
                    icon={[x.icon.prefix, x.icon.name]}
                    size="2x"
                  />
                </Link>
              </Box>
            ))}
          </Flex>

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
        </Box>

        <div
          sx={{
            display: `flex`,
            form: {
              mt: `2rem`,
            },
            width: '100%',
            maxWidth: '22rem',
          }}
        >
          <div>
            <TitledCopy
              full
              title={page.frontmatter.newsletter.title}
              paragraphs={page.frontmatter.newsletter.descr}
              sx={{
                marginBottom: `1.3rem`,
                '& h2': {
                  marginBottom: `1rem`,
                },
                '& div': {
                  fontSize: `0.9rem`,
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
              endpoint="https://gaiama-newsletter.now.sh/api"
            />
          </div>
        </div>

        {/* <Box>
          <Img fluid={page.frontmatter.assets.team.image.fluid} />
          <Text mt="1rem">{page.frontmatter.greeting}</Text>
        </Box> */}
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

    page: mdx(frontmatter: { slug: { eq: $slug } }) {
      ...MdxTranslations
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
        greeting
        assets {
          team {
            image: childImageSharp {
              fluid(maxWidth: 800, quality: 75) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
