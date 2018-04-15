import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MainLayout from '@/components/MainLayout'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
// import { isEmail } from 'validator'
import { breakPoints, colors, fontFamilies, media } from '@/theme'
import TitledCopy from '@/components/TitledCopy'
import { Email, Textarea } from '@/components/Form'
import { Button } from '@/components/layout/Button'

class ContactPage extends Component {
  static propTypes = {
    data: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      email: ``,
      emailError: false,
      message: ``,
    }
  }

  handleChange = e => {
    e.persist()
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        // if (e.target.name === `email`) {
        //   this.setState({ emailError: isEmail(e.target.value) })
        // }
      }
    )
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  render() {
    const { page } = this.props.data
    return (
      <MainLayout
        {...this.props}
        wrapperStyles={{
          [media.greaterThan(`large`)]: {
            background: `url(${
              page.frontmatter.assets.bg.image.sizes.src
            }) no-repeat right 1rem`,
          },
          maxWidth: `initial`,
          minHeight: `680px`,
          paddingTop: `2rem`,
          paddingRight: 0,
          paddingBottom: 0,
          [breakPoints.minMdLandscape]: {
            width: `100%`,
          },
        }}
      >
        <div
          css={{
            overflow: `hidden`,
            display: `flex`,
            justifyContent: `space-between`,
            [media.lessThan(`small`)]: {
              flexDirection: `column`,
            },
            [media.greaterThan(`small`)]: {
              '& > div': {
                width: `40%`,
              },
            },
            [media.greaterThan(`large`)]: {
              width: `57%`,
              margin: `3rem 2rem 0 6rem`,
            },
          }}
        >
          <div>
            <TitledCopy
              full
              title={page.frontmatter.title}
              paragraphs={page.frontmatter.form.descr}
              css={{
                marginBottom: `1.5rem`,
                '& h2': {
                  marginBottom: `1rem`,
                },
                '& div': {
                  fontSize: `.9rem`,
                },
                [media.lessThan(`small`)]: {
                  textAlign: `center`,
                },
              }}
            />

            <form
              action={process.env.GAIAMA_ENDPOINT_CONTACT}
              method="post"
              // onSubmit={this.handleSubmit}
              css={{
                maxWidth: `99%`,
                [media.lessThan(`small`)]: {
                  marginBottom: `3rem`,
                },
                [media.greaterThan(`medium`)]: {
                  width: `300px`,
                },
              }}
            >
              <Email
                name="email"
                label={page.frontmatter.form.emailLabel}
                value={this.state.email}
                onInput={this.handleChange}
              />
              {this.state.emailError && <span>Wrong email!</span>}
              <Textarea
                name="message"
                label={page.frontmatter.form.messageLabel}
                // placeholder={page.frontmatter.cookieNote}
                value={this.state.message}
                onInput={this.handleChange}
              />
              <Button
                onClick={e => console.log(`submit`)}
                css={{
                  ...styles.button,
                  background: `#2d2a34`,
                  color: colors.darkWhite,
                }}
              >
                {page.frontmatter.form.submitLabel}
              </Button>
            </form>
          </div>

          <div>
            <TitledCopy
              full
              title={page.frontmatter.newsletter.title}
              paragraphs={page.frontmatter.newsletter.descr}
              css={{
                marginBottom: `2.7rem`,
                '& h2': {
                  marginBottom: `1rem`,
                },
                '& div': {
                  fontSize: `.9rem`,
                },
                [media.lessThan(`small`)]: {
                  textAlign: `center`,
                },
              }}
            />
            <form
              action={process.env.GAIAMA_ENDPOINT_NEWSLETTER}
              method="post"
              onSubmit={this.handleSubmit}
              css={{
                // marginTop: `2.8rem`,
                maxWidth: `99%`,
                [media.greaterThan(`medium`)]: {
                  width: `300px`,
                },
              }}
            >
              <Email
                name="email"
                label={page.frontmatter.form.emailLabel}
                value={this.state.email}
                onInput={this.handleChange}
              />
              {this.state.emailError && <span>Wrong email!</span>}
              <Button
                label="Submit"
                onClick={e => console.log(`submit`)}
                css={{
                  ...styles.button,
                  background: `#2d2a34`,
                  color: colors.darkWhite,
                }}
              >
                {page.frontmatter.form.submitLabel}
              </Button>
            </form>

            <div
              css={{
                display: `flex`,
                justifyContent: `space-around`,
                '& > div': {
                  position: `relative`,
                  zIndex: 3,
                  margin: `1.5rem 0`,
                  '& > a': {
                    color: `#2d2a34`,
                  },
                },
              }}
            >
              <div
                css={{
                  '& svg': {
                    color: colors.brands.facebook,
                  },
                }}
              >
                <a href="https://" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon
                    icon={[`fab`, `facebook-square`]}
                    size="lg"
                  />
                </a>
              </div>
              <div
                css={{
                  '& svg *': {
                    fill: `url(#InstagramGradient)`,
                  },
                }}
              >
                <a href="https://" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={[`fab`, `instagram`]} size="lg" />
                </a>
              </div>
              <div
                css={{
                  '& svg': {
                    color: colors.brands.youtube,
                  },
                }}
              >
                <a href="https://" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={[`fab`, `youtube`]} size="lg" />
                </a>
              </div>
              <div
                css={{
                  '& svg': {
                    color: colors.brands.patreon,
                  },
                }}
              >
                <a href="https://" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={[`fab`, `patreon`]} size="lg" />
                </a>
              </div>
              <div
                css={{
                  '& svg': {
                    color: colors.rss,
                  },
                }}
              >
                <a href="/rss" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={[`fas`, `rss-square`]} size="lg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }
}

export default ContactPage

const styles = {
  button: {
    fontFamily: fontFamilies.accent,
    fontSize: `1.5rem`,
    width: `100%`,
    border: `1px solid #ccc`,
    background: `#fff`,
    transition: `background-color .2s linear`,
    '&:hover': {
      background: colors.primaryLite,
      color: colors.darkWhite,
    },
  },
}

export const query = graphql`
  query ContactPageQuery($lang: String!, $slug: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu

    page: javascriptFrontmatter(frontmatter: { slug: { eq: $slug } }) {
      fields {
        translations {
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
        cookieNote
        form {
          descr
          emailLabel
          messageLabel
          submitLabel
        }
        newsletter {
          title
          descr
        }
        assets {
          bg {
            image: childImageSharp {
              sizes(maxWidth: 800, quality: 75) {
                ...GatsbyImageSharpSizes_noBase64
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
//   query ContactPageQuery(
//     $lang: String!
//     $slug: String!
//   ) {
//     ...homepage
//     ...menu
//     ...pageJs
//   }
// `
