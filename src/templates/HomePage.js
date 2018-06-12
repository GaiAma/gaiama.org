import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { css } from 'glamor'
import slugify from 'slugify'
import { Box, colors, fullPageWidth, maxWidthContent, media } from '@/theme'
import MainLayout from '@/components/MainLayout'
import { InstagramFeed, SupportWidget } from '@/components/Shared'
import TitledCopy from '@/components/TitledCopy'

const HomePage = props => (
  <MainLayout {...props}>
    <Box
      css={{
        textAlign: `center`,
      }}
    >
      <h1
        css={{
          marginTop: 0,
          fontSize: `2rem`,
          [media.greaterThan(`small`)]: {
            fontSize: `2.7rem`,
          },
        }}
      >
        {props.data.page.frontmatter.intro.title}
      </h1>

      <div>
        {props.data.page.frontmatter.intro.content.map(
          (x, i) =>
            x.value ? (
              <p key={i}>{x.value}</p>
            ) : x.img && x.img.image ? (
              <Img
                key={i}
                css={{
                  float: `left`,
                  marginRight: `1rem`,
                  marginBottom: `.5rem`,
                  border: `1px solid #979797`,
                  boxShadow: `1px 1px 6px rgba(0,0,0,0.50)`,
                }}
                resolutions={x.img.image.resolutions}
              />
            ) : (
              <p
                key={i}
                css={{
                  margin: 0,
                  [media.lessThan(`small`)]: {
                    fontSize: `0.9rem`,
                  },
                }}
              >
                {x}
              </p>
            )
        )}
      </div>

      <div
        css={{
          display: `flex`,
          justifyContent: `center`,
          margin: `2rem 0 3rem`,
          [media.greaterThan(`small`)]: {
            margin: `2rem 0 4rem`,
          },
        }}
      >
        <div
          css={{
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            '& > div': {
              boxShadow: `1px 1px 2px 1px #999`,
            },
            '& > div:nth-child(2)': {
              margin: `0 1rem`,
            },
            '& .gatsby-image-wrapper': {
              width: [`200px`, `30vw`],
            },
            [media.greaterThan(`small`)]: {
              '& .gatsby-image-wrapper': {
                width: `280px`,
                transition: `width .3s ease-in-out`,
              },
              '& > div:not(:nth-child(2)) .gatsby-image-wrapper': {
                width: `200px`,
              },
              '&:hover .gatsby-image-wrapper': {
                width: `200px`,
              },
              '& > div:hover .gatsby-image-wrapper': {
                width: `280px`,
              },
            },
          }}
        >
          {props.data.page.frontmatter.intro.images.map(({ image }) => (
            <Img sizes={image.sizes} key={image.sizes.src} />
          ))}
        </div>
      </div>
    </Box>

    <KeyPrinciples
      title={props.data.page.frontmatter.keyPrinciples.title}
      content={props.data.page.frontmatter.keyPrinciples.content}
    />

    <SupportWidget
      title={props.data.SupportWidget.frontmatter.title}
      description={props.data.SupportWidget.frontmatter.description}
      readMoreLink={props.data.SupportWidget.frontmatter.readMoreLink}
      readMoreLabel={props.data.SupportWidget.frontmatter.readMoreLabel}
      paypalButton={
        props.data.SiteMeta.frontmatter.assets.paypalButton.publicURL
      }
      bankButton={props.data.SupportWidget.frontmatter.bankButton}
      bankButtonAlt={props.data.SupportWidget.frontmatter.bankButtonAlt}
      bankInfo={props.data.SupportWidget.frontmatter.bankInfo}
      bankDetails={props.data.SupportWidget.frontmatter.bankDetails}
      // artwork={props.data.page.frontmatter.assets.supportus}
      lang={props.pathContext.lang}
      css={{
        margin: `3rem 0`,
      }}
      artworkWrapperStyles={{
        position: `absolute`,
        bottom: `-2px`,
        left: `-1px`,
      }}
    />

    <InstagramFeed
      user={props.data.instagram.frontmatter.instagramUser}
      followLink={props.data.instagram.frontmatter.followLink}
      bg={props.data.instagram.frontmatter.bg.image.sizes.src}
      images={props.data.instagramImages.edges}
    />

    <TitledCopyStyled
      title={props.data.page.frontmatter.closing.title}
      paragraphs={props.data.page.frontmatter.closing.paragraphs}
      css={{
        '& div': {
          [media.lessThan(`small`)]: {
            fontSize: `0.9rem`,
          },
        },
      }}
    />
  </MainLayout>
)
HomePage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.object,
    SupportWidget: PropTypes.object,
    SiteMeta: PropTypes.object,
    instagram: PropTypes.shape({
      frontmatter: PropTypes.shape({
        instagramUser: PropTypes.string,
        followLink: PropTypes.string,
        bg: PropTypes.object,
      }),
    }),
    instagramImages: PropTypes.object,
  }),
  pathContext: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }),
}
export default HomePage

export const query = graphql`
  query HomePageQuery($lang: String!, $slug: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...legal
    ...Accounts
    ...instagram
    ...SupportWidget

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
        cover {
          publicURL
        }
        intro {
          title
          content
          images {
            image: childImageSharp {
              sizes(quality: 75) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
        keyPrinciples {
          title
          content {
            title
            text
            image {
              alt
              src {
                publicURL
              }
            }
            images {
              one {
                image: childImageSharp {
                  sizes(maxWidth: 320, quality: 75) {
                    ...GatsbyImageSharpSizes
                  }
                }
              }
              two {
                image: childImageSharp {
                  sizes(maxWidth: 320, quality: 75) {
                    ...GatsbyImageSharpSizes
                  }
                }
              }
              three {
                image: childImageSharp {
                  sizes(maxWidth: 320, quality: 75) {
                    ...GatsbyImageSharpSizes
                  }
                }
              }
              four {
                image: childImageSharp {
                  sizes(maxWidth: 320, quality: 75) {
                    ...GatsbyImageSharpSizes
                  }
                }
              }
            }
          }
        }
        closing {
          title
          paragraphs
        }
        assets {
          supportus {
            image: childImageSharp {
              resolutions(width: 121, quality: 75) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
          keyBg {
            image: childImageSharp {
              resolutions(width: 238, quality: 75) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
        }
      }
    }
  }
`

export const IntroContainer = ({ children }) => (
  <div
    css={{
      display: `flex`,
      flexDirection: `column`,

      [media.lessThan(`small`)]: {
        '& > :last-child': {
          marginTop: `3rem`,
        },
      },

      [media.greaterThan(`small`)]: {
        flexDirection: `row`,
        justifyContent: `space-between`,

        '& > :first-child': {
          width: `60%`,
        },
        '& > :last-child': {
          width: `33%`,
        },
      },
    }}
  >
    {children}
  </div>
)

const KeyPrinciples = ({ title, content, ...props }) => (
  <div
    css={{
      width: `90%`,
      margin: `2rem auto 0`,
      '& > div + div': {
        marginTop: `3rem`,
      },
    }}
    {...props}
  >
    {content.map((x, i) => (
      <div
        key={i}
        css={{
          ...fullPageWidth,
          backgroundColor: i % 2 === 0 && colors.lightBlue,
          padding: i % 2 === 0 && `2rem 0`,
        }}
      >
        <div
          css={{
            ...maxWidthContent,
            maxWidth: `1050px`,
          }}
        >
          {i === 0 && (
            <div
              css={{
                textAlign: `center`,
              }}
            >
              <h2
                css={{
                  letterSpacing: `.3rem`,
                  display: `inline-block`,
                  marginBottom: `2.8rem`,
                  borderBottom: `1px solid #000`,
                  padding: `0 1.5rem .6rem 0`,
                  lineHeight: `0.8`,
                  position: `relative`,
                  fontSize: `2.2rem`,
                  [media.greaterThan(`small`)]: {
                    fontSize: `2.5rem`,
                  },
                  '&:after': {
                    content: `>>`,
                    position: `absolute`,
                    right: `-0.2rem`,
                    bottom: `-0.6rem`,
                    fontSize: `1.6rem`,
                    letterSpacing: `normal`,
                  },
                }}
              >
                {title}
              </h2>
            </div>
          )}
          <Box
            flex
            css={{
              margin: `0`,
              [media.lessThan(`xsmall`)]: {
                flexDirection: i % 2 === 0 ? `column-reverse` : `column`,
              },
            }}
          >
            {i % 2 === 0 && (
              <div
                css={{
                  display: `flex`,
                  flexWrap: `wrap`,
                  flex: `0 0 245px`,
                  justifyContent: `center`,
                  height: `245px`,
                  [media.greaterThan(`xsmall`)]: {
                    height: `320px`,
                    flexBasis: `320px`,
                    marginRight: `3rem`,
                  },
                  '& img': {
                    margin: 0,
                  },
                }}
              >
                {Object.keys(x.images).map(key => (
                  <Img
                    key={key}
                    sizes={x.images[key].image.sizes}
                    outerWrapperClassName={css({
                      width: `120px`,
                      [media.greaterThan(`xsmall`)]: {
                        width: `153px`,
                      },
                      margin: `.2rem`,
                    })}
                  />
                ))}
              </div>
            )}
            <div>
              <div css={{ display: `flex` }}>
                <h2
                  id={slugify(x.title)}
                  css={{
                    margin: `.5rem 0 .7rem`,
                    fontSize: `2rem`,
                  }}
                >
                  {x.title}
                </h2>
                <img
                  src={x.image.src.publicURL}
                  alt={x.image.alt}
                  css={{
                    height: `48px`,
                    width: `48px`,
                    margin: 0,
                    marginLeft: `1rem`,
                  }}
                />
              </div>
              <p
                css={{
                  fontSize: `.85rem`,
                  [media.greaterThan(`medium`)]: {
                    fontSize: `1rem`,
                  },
                  textAlign: `justify`,
                }}
                dangerouslySetInnerHTML={{ __html: x.text }}
              />
            </div>
            {i % 2 === 1 && (
              <div
                css={{
                  display: `flex`,
                  flexWrap: `wrap`,
                  flex: `0 0 245px`,
                  justifyContent: `center`,
                  height: `245px`,
                  [media.greaterThan(`xsmall`)]: {
                    height: `320px`,
                    flexBasis: `320px`,
                    marginLeft: `3rem`,
                  },
                  '& img': {
                    margin: 0,
                  },
                }}
              >
                {Object.keys(x.images).map(key => (
                  <Img
                    key={key}
                    sizes={x.images[key].image.sizes}
                    outerWrapperClassName={css({
                      width: `120px`,
                      [media.greaterThan(`xsmall`)]: {
                        width: `153px`,
                      },
                      margin: `.2rem`,
                    })}
                  />
                ))}
              </div>
            )}
          </Box>
        </div>
      </div>
    ))}
  </div>
)
KeyPrinciples.propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
}
export { KeyPrinciples }

export const TitledCopyStyled = props => (
  <TitledCopy centered css={{ margin: `4rem auto` }} {...props} />
)
