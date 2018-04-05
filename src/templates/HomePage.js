import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import slugify from 'slugify'
import { breakPoints, Box, colors } from '@/theme'
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
          fontSize: `2.7rem`,
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
              <p key={i} css={{ margin: 0 }}>
                {x}
              </p>
            )
        )}
      </div>

      <div
        css={{
          display: `flex`,
          justifyContent: `center`,
          margin: `2rem 0 4rem`,
        }}
      >
        <div
          css={{
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            height: `210px`,
            '& > div': {
              boxShadow: `1px 1px 2px 1px #999`,
            },
            '& > div:nth-child(2)': {
              margin: `0 1rem`,
            },
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
          }}
        >
          {props.data.page.frontmatter.intro.images.map(({ image }) => (
            <Img sizes={image.sizes} key={image.sizes.src} />
          ))}
        </div>
      </div>
    </Box>

    <div
      css={{
        backgroundImage: `url(${
          props.data.page.frontmatter.assets.keyBg.image.resolutions.src
        })`,
        backgroundPosition: `right 0`,
        backgroundColor: colors.lightBlue,
        backgroundRepeat: `no-repeat`,
        // backgroundSize: `contain`,
        overflow: `hidden`,
        width: `100vw`,
        margin: `0 auto`,
        position: `relative`,
        left: `50%`,
        transform: `translateX(-50vw)`,
      }}
    >
      <div
        css={{
          position: `relative`,
          width: `200vw`,
          left: `50%`,
          transform: `translateX(-100vw)`,
        }}
      >
        <div
          css={{
            width: `100vw`,
            margin: `0 auto`,
          }}
        >
          <div
            css={{
              textAlign: `center`,
            }}
          >
            <h2
              css={{
                fontSize: `2.5rem`,
                letterSpacing: `.3rem`,
                display: `inline-block`,
                marginTop: `2rem`,
                borderBottom: `1px solid #000`,
                padding: `0 1.5rem .6rem 0`,
                lineHeight: `0.8`,
                position: `relative`,
                '&:after': {
                  content: `>>`,
                  position: `absolute`,
                  right: `-0.2rem`,
                  bottom: `-0.6rem`,
                  fontSize: `1.6rem`,
                  letterSpacing: `initial`,
                },
              }}
            >
              {props.data.page.frontmatter.keyPrinciples.title}
            </h2>
          </div>

          <KeyPrinciples
            content={props.data.page.frontmatter.keyPrinciples.content}
            css={{
              [breakPoints.minSm]: {
                width: `65%`,
              },
              [breakPoints.minMd]: {
                width: `70%`,
              },
              [breakPoints.minLgLandscape]: {
                width: `59%`,
              },
            }}
          />
        </div>
      </div>
    </div>

    <SupportWidget
      transparent
      title={props.data.SupportWidget.frontmatter.title}
      readMoreLink={props.data.SupportWidget.frontmatter.readMoreLink}
      readMoreLabel={props.data.SupportWidget.frontmatter.readMoreLabel}
      artwork={props.data.page.frontmatter.assets.supportus}
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
      bg={props.data.instagram.frontmatter.bg.image.resolutions.src}
      imgs={props.data.instagramImages.edges}
    />

    <TitledCopyStyled
      title={props.data.page.frontmatter.closing.title}
      paragraphs={props.data.page.frontmatter.closing.paragraphs}
    />
  </MainLayout>
)
HomePage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.object,
    SupportWidget: PropTypes.object,
    Cryptos: PropTypes.object,
    instagram: PropTypes.shape({
      frontmatter: PropTypes.shape({
        instagramUser: PropTypes.string,
        followLink: PropTypes.string,
        bg: PropTypes.object,
      }),
    }),
    instagramImages: PropTypes.object,
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
    ...SideBar
    ...instagram
    ...SupportWidget
    #...Cryptos

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
        intro {
          title
          content
          images {
            image: childImageSharp {
              sizes {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
        keyPrinciples {
          title
          bg {
            publicURL
          }
          content {
            image {
              alt
              src {
                publicURL
                childImageSharp {
                  resolutions {
                    ...GatsbyImageSharpResolutions
                  }
                }
              }
            }
            title
            text
          }
        }
        closing {
          title
          paragraphs
        }
        assets {
          supportus {
            image: childImageSharp {
              resolutions (quality: 75) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
          keyBg {
            image: childImageSharp {
              resolutions (quality: 75) {
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

      [breakPoints.maxMd]: {
        '& > :last-child': {
          marginTop: `3rem`,
        },
      },

      [breakPoints.minMd]: {
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

// const InterruptingHeadline = ({
//   bg,
//   headline,
// }) => (
//   <Lazy
//     image={bg}
//     css={{
//       backgroundSize: `cover`,
//       position: `relative`,
//       width: `100vw`,
//       left: `50%`,
//       transform: `translateX(-50vw)`,
//       boxShadow: `inset 0 1px 8px #000`,
//       textAlign: `center`,
//       margin: `2rem 0`,
//     }}
//   >
//     <h2
//       css={{
//         display: `inline-block`,
//         padding: `0 1.5rem .6rem 0`,
//         margin: `1.6rem 0`,
//         fontSize: `2.5rem`,
//         lineHeight: `0.8`,
//         letterSpacing: `.3rem`,
//         borderBottom: `1px solid #000`,
//         position: `relative`,
//         '&:after': {
//           content: `>>`,
//           position: `absolute`,
//           right: `-0.2rem`,
//           bottom: `-0.6rem`,
//           fontSize: `1.6rem`,
//           letterSpacing: `initial`,
//         },
//       }}
//     >
//       {headline}
//     </h2>
//   </Lazy>
// )
// InterruptingHeadline.propTypes = {
//   bg: PropTypes.string,
//   headline: PropTypes.string,
// }
// export { InterruptingHeadline }

const KeyPrinciples = ({
  content,
  ...props
}) => (
  <div
    css={{
      display: `flex`,
      justifyContent: `space-between`,
      flexWrap: `wrap`,
      width: `90%`,
      margin: `2rem auto 0`,
      '& > div': {
        width: `56%`,
      },
      '& > div:nth-child(2n+2)': {
        width: `38%`,
      },
    }}
    {...props}
  >
    {content.map((x, i) => (
      <Box flex key={i} css={{ margin: `0 0 0` }}>
        <div>
          <div
            css={{
              display: `flex`,
            }}
          >
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
              css={{ height: `48px`, margin: 0, marginLeft: `1rem` }}
            />
          </div>
          <p
            css={{ fontSize: `.85rem`, textAlign: `justify` }}
            dangerouslySetInnerHTML={{ __html: x.text }}
          />
        </div>
      </Box>
    ))}
  </div>
)
KeyPrinciples.propTypes = {
  content: PropTypes.array,
}
export { KeyPrinciples }

// export const MainContent = ({
//   newsletterHeadline,
//   newsletterPlaceholder,
//   newsletterButtonLabel,
//   artwork,
//   artworkCss,
//   cryptos,
//   contactLink,
//   readMoreLink,
//   readMoreLabel,
//   keyPrinciples,
// }) => (
//   <Box
//     css={{
//       display: 'flex',
//       flexDirection: 'column-reverse',
//       margin: '0 0 1rem',

//       [breakPoints.minSm]: {
//         marginTop: '6rem',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//       },
//     }}
//   >
//     <SideBar
//       newsletterHeadline={newsletterHeadline}
//       newsletterPlaceholder={newsletterPlaceholder}
//       newsletterButtonLabel={newsletterButtonLabel}
//       artwork={artwork}
//       artworkCss={artworkCss}
//       cryptos={cryptos}
//       contactLink={contactLink}
//       readMoreLink={readMoreLink}
//       readMoreLabel={readMoreLabel}
//       css={{
//         [breakPoints.maxSm]: {
//           marginTop: '2rem',
//         },
//         [breakPoints.minSm]: {
//           width: '30%',
//         },
//         [breakPoints.minMd]: {
//           width: '25%',
//         },
//       }}
//     />

//     <KeyPrinciples
//       content={keyPrinciples}
//       // css={{
//       //   [breakPoints.minSm]: {
//       //     width: '65%'
//       //   },
//       //   [breakPoints.minMd]: {
//       //     width: '70%'
//       //   },
//       //   [breakPoints.minLgLandscape]: {
//       //     width: '59%'
//       //   }
//       // }}
//     />
//   </Box>
// )

export const TitledCopyStyled = props => (
  <TitledCopy centered css={{ margin: `4rem auto` }} {...props} />
)
