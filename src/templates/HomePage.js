import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'
import Helmet from 'react-helmet'
import styled from '@emotion/styled'
import slugify from 'slugify'
import { Box, colors, fullPageWidth, maxWidthContent, media } from '@src/theme'
import MainLayout from '@components/MainLayout'
import { InstagramWidget } from '@components/InstagramWidget'
import { SupportWidget } from '@components/Shared'
import TitledCopy from '@components/TitledCopy'
import { VideoPlayer } from '@gaiama/react-video-player'

const IntroWrapper = styled(Box)`
  text-align: center;
`

const StyledVideoPlayer = styled(VideoPlayer)`
  margin-top: 2rem;
`

const PageTitle = styled.h1`
  margin-top: 0;
`

const IntroCopy = styled.p`
  margin: 0;
  ${media.lessThan(`small`)} {
    font-size: 0.9rem;
  }
`

// const IntroImagesOuter = styled.div`
//   display: flex;
//   justify-content: center;
//   margin: 2rem 0 3rem;
//   ${media.greaterThan(`small`)} {
//     margin: 2rem 0 4rem;
//   }
// `
// const IntroImages = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   & > div {
//     box-shadow: 1px 1px 2px 1px ${colors.gray7};
//   }
//   & > div:nth-of-type(2) {
//     margin: 0 1rem;
//   }
//   & .gatsby-image-wrapper {
//     width: 200px;
//     width: 30vw;
//   }
//   ${media.greaterThan(`small`)} {
//     & .gatsby-image-wrapper {
//       width: 280px;
//       /* transition: width 0.3s ease-in-out; */
//     }
//     & > .gatsby-image-wrapper:not(:nth-of-type(2)) {
//       width: 200px;
//     }
//     /* &:hover .gatsby-image-wrapper {
//       width: 200px;
//     }
//     & > .gatsby-image-wrapper:hover {
//       width: 280px;
//     } */
//   }
// `

const StyledSupportWidget = styled(SupportWidget)`
  margin: 3rem 0;
`

const KeyPrinciplesContainer = styled.div`
  width: 90%;
  margin: 2rem auto 0;
  & > div + div {
    margin-top: 3rem;
  }
`

const KeyPrincipleRow = styled.div`
  ${fullPageWidth};
  background-color: ${({ index }) => index % 2 === 0 && colors.lightBlue};
  padding: ${({ index }) => index % 2 === 0 && `2rem 0`};
`

const KeyPrincipleHeader = styled.div`
  text-align: center;
`

const KeyPrincipleTitle = styled.h2`
  letter-spacing: 0.3rem;
  display: inline-block;
  margin-bottom: 2.8rem;
  border-bottom: 1px solid ${colors.black};
  padding: 0 1.5rem 0.6rem 0;
  line-height: 0.8;
  position: relative;
  font-size: 2.2rem;
  ${media.greaterThan(`small`)} {
    font-size: 2.5rem;
  }
  &:after {
    content: '>>';
    position: absolute;
    right: -0.2rem;
    bottom: -0.6rem;
    font-size: 1.6rem;
    letter-spacing: normal;
  }
`

const KeyPrincipleRowInner = styled.div`
  ${maxWidthContent};
  max-width: 1050px;
`

const KeyPrincipleRowContent = styled.div`
  display: flex;
  margin: 0;
  ${media.lessThan(`small`)} {
    flex-direction: ${({ index }) =>
      index % 2 === 0 ? `column-reverse` : `column`};
  }
`
const KeyPrincipleRowImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 0 0 245px;
  justify-content: center;
  height: 245px;
  ${media.lessThan(`small`)} {
    margin-top: 1rem;
  }
  ${media.greaterThan(`small`)} {
    height: 320px;
    flex-basis: 320px;
    margin-right: ${({ position }) => position === `left` && `3rem`};
    margin-left: ${({ position }) => position === `right` && `3rem`};
  }
  & img {
    margin: 0;
  }
`

const KeyPrincipleRowImage = styled(Img)`
  width: 120px;
  ${media.greaterThan(`xsmall`)} {
    width: 152px;
  }
  margin: 0.2rem;
`

const KeyPrincipleRowHeader = styled.div`
  display: flex;
`

const KeyPrincipleRowTitle = styled.h2`
  margin: 0.5rem 0 0.7rem;
  font-size: 2rem;
`

const KeyPrincipleRowIcon = styled.img`
  height: 48px;
  width: 48px;
  margin: 0;
  margin-left: 1rem;
`

const KeyPrincipleRowCopy = styled.div`
  font-size: 0.85rem;
  ${media.greaterThan(`medium`)} {
    font-size: 1rem;
  }
  text-align: justify;
`

const StyledTitledCopy = styled(TitledCopy)`
  margin: 4rem auto;
  & div {
    ${media.lessThan(`small`)} {
      font-size: 0.9rem;
    },
  }
`

const HomePage = props => (
  <MainLayout {...props}>
    <Helmet>
      <title>{props.data.homepage.frontmatter.header.subtitle}</title>
    </Helmet>

    <IntroWrapper>
      <PageTitle>{props.data.page.frontmatter.intro.title}</PageTitle>

      <div>
        {props.data.page.frontmatter.intro.content.map((x, i) => (
          <IntroCopy key={i}>{x}</IntroCopy>
        ))}
      </div>

      {/* <IntroImagesOuter>
        <IntroImages>
          {props.data.page.frontmatter.intro.images.map(({ image }) => (
            <Img fluid={image.fluid} key={image.fluid.src} />
          ))}
        </IntroImages>
      </IntroImagesOuter> */}

      {props.data.page.frontmatter.video?.url && (
        <StyledVideoPlayer
          video={props.data.page.frontmatter.video.url}
          thumbnail={props.data.page.frontmatter.video?.thumbnail.image}
          label={props.data.SiteMeta.frontmatter.videoPlayerCookieButton}
        />
      )}
    </IntroWrapper>

    <KeyPrinciples
      title={props.data.page.frontmatter.keyPrinciples.title}
      content={props.data.page.frontmatter.keyPrinciples.content}
    />

    <StyledSupportWidget
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
      lang={props.pageContext.lang}
      // artwork={props.data.page.frontmatter.assets.supportus}
      // artworkWrapperStyles={{
      //   position: `absolute`,
      //   bottom: `-2px`,
      //   left: `-1px`,
      // }}
    />

    <InstagramWidget
      user={props.data.instagram.frontmatter.instagramUser}
      followLink={props.data.instagram.frontmatter.followLink}
      bg={props.data.instagram.frontmatter.bg.image.fluid}
      images={props.data.instagramImages.edges}
    />

    <StyledTitledCopy
      centered
      title={props.data.page.frontmatter.closing.title}
      paragraphs={props.data.page.frontmatter.closing.paragraphs}
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
  pageContext: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }),
}
export default HomePage

export const query = graphql`
  query($lang: String!, $url: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...legal
    ...Accounts
    ...instagram
    ...SupportWidget

    page: javascriptFrontmatter(fields: { url: { eq: $url } }) {
      ...PageTranslations
      fields {
        url
      }
      frontmatter {
        title
        lang
        slug
        summary
        cover {
          publicURL
        }
        video {
          url
          thumbnail {
            image: childImageSharp {
              fluid(maxWidth: 760, quality: 75, cropFocus: ENTROPY) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        intro {
          title
          content
          images {
            image: childImageSharp {
              fluid(quality: 75) {
                ...GatsbyImageSharpFluid
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
                  fluid(maxWidth: 320, quality: 75) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              two {
                image: childImageSharp {
                  fluid(maxWidth: 320, quality: 75) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              three {
                image: childImageSharp {
                  fluid(maxWidth: 320, quality: 75) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              four {
                image: childImageSharp {
                  fluid(maxWidth: 320, quality: 75) {
                    ...GatsbyImageSharpFluid
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
              fixed(width: 121, quality: 75) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          keyBg {
            image: childImageSharp {
              fixed(width: 238, quality: 75) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`

const KeyPrinciples = ({ title, content, ...props }) => (
  <KeyPrinciplesContainer {...props}>
    {content.map((x, i) => (
      <KeyPrincipleRow key={i} index={i}>
        <KeyPrincipleRowInner>
          {i === 0 && (
            <KeyPrincipleHeader>
              <KeyPrincipleTitle>{title}</KeyPrincipleTitle>
            </KeyPrincipleHeader>
          )}
          <KeyPrincipleRowContent index={i}>
            {i % 2 === 0 && (
              <KeyPrincipleRowImages position="left">
                {Object.keys(x.images).map(key => (
                  <KeyPrincipleRowImage
                    key={key}
                    fluid={x.images[key].image.fluid}
                  />
                ))}
              </KeyPrincipleRowImages>
            )}
            <div>
              <KeyPrincipleRowHeader>
                <KeyPrincipleRowTitle id={slugify(x.title)}>
                  {x.title}
                </KeyPrincipleRowTitle>
                <KeyPrincipleRowIcon
                  src={x.image.src.publicURL}
                  alt={x.image.alt}
                />
              </KeyPrincipleRowHeader>
              <KeyPrincipleRowCopy
                dangerouslySetInnerHTML={{ __html: x.text }}
              />
            </div>
            {i % 2 === 1 && (
              <KeyPrincipleRowImages position="right">
                {Object.keys(x.images).map(key => (
                  <KeyPrincipleRowImage
                    key={key}
                    fluid={x.images[key].image.fluid}
                  />
                ))}
              </KeyPrincipleRowImages>
            )}
          </KeyPrincipleRowContent>
        </KeyPrincipleRowInner>
      </KeyPrincipleRow>
    ))}
  </KeyPrinciplesContainer>
)
KeyPrinciples.propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
}
export { KeyPrinciples }
