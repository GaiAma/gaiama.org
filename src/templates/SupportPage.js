/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'
import { Link } from '@components/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons/faNewspaper'
// import { faRssSquare } from '@fortawesome/free-solid-svg-icons/faRssSquare'
import MainLayout from '@components/MainLayout'
import { SupportWidget } from '@components/Shared'
import CheckMark from '@src/assets/check.png'
import TitledCopy from '@components/TitledCopy'
import { colors, fullPageWidth, media, visible } from '../theme'

const ContributorListTitle = props => (
  /* eslint-disable-next-line */
  <h2 sx={{ margin: `2rem 0 0` }} {...props} />
)
const ContributorList = props => (
  <div
    sx={{
      marginTop: `1rem`,
      display: `flex`,
      flexWrap: `wrap`,
      justifyContent: `space-between`,
    }}
    {...props}
  />
)
const ContributorListLink = props => (
  <Link
    sx={{
      marginTop: `1rem`,
      display: `inline-block`,
      fontSize: `0.85rem`,
      [media.greaterThan(`small`)]: {
        fontSize: `1rem`,
      },
    }}
    {...props}
  />
)
const Contributor = props => (
  <div
    sx={{
      width: `100%`,
      flexShrink: 0,
      maxWidth: `100%`,
      [media.lessThan(`small`)]: {
        ':nth-of-type(1n + 5)': {
          display: `none`,
        },
      },
      [media.greaterThan(`small`)]: {
        width: `48%`,
      },
      [media.greaterThan(`medium`)]: {
        width: `30%`,
      },
      [media.greaterThan(`xxlarge`)]: {
        width: `24%`,
      },
    }}
    {...props}
  />
)

const StyledA = props => (
  /* eslint-disable-next-line */
  <a
    sx={{
      border: `none`,
      ':hover': {
        backgroundColor: `transparent`,
      },
    }}
    {...props}
  />
)

const SupportPage = props => {
  const {
    page: { frontmatter },
    contributors,
  } = props.data

  const initialStyle = {
    ...visible.maxMd,
    fontFamily: `accent`,
    fontSize: `2.9rem`,
    lineHeight: 1,
    float: `left`,
    marginRight: `1rem`,
  }

  const [neighbor, support] = [
    frontmatter.intro.neighbor,
    frontmatter.intro.support,
  ].map((x, i) => (
    <>
      <span sx={initialStyle}>{i + 1}.</span>
      <span dangerouslySetInnerHTML={{ __html: x }} />
    </>
  ))

  return (
    <MainLayout {...props}>
      <TitledCopy
        rank="1"
        centered
        title={frontmatter.intro.title_}
        sx={{
          [media.lessThan(`medium`)]: {
            '& > h2': {
              fontSize: `2rem`,
            },
            '& > div, & > button': {
              fontSize: `0.85rem`,
            },
          },
        }}
      />

      <div
        sx={{
          display: `flex`,
          justifyContent: `space-around`,
          [media.lessThan(`medium`)]: {
            display: `none`,
          },
        }}
      >
        {[`arrow_left`, `arrow_right`].map(x => (
          <Img
            fluid={props.data.page.frontmatter.assets[x].image.fluid}
            key={x}
            sx={{
              flex: `none`,
              marginBottom: `1rem`,
              width: `112px`,
              '& img': {
                objectFit: `contain !important`,
              },
            }}
          />
        ))}
      </div>

      <div
        sx={{
          display: `flex`,
          [media.lessThan(`medium`)]: {
            flexDirection: `column`,
          },
          [media.greaterThan(`medium`)]: {
            justifyContent: `space-between`,
            '& > div': {
              width: `50%`,
            },
          },
        }}
      >
        <div
          sx={{
            border: `none`,
            position: `relative`,
            [media.lessThan(`medium`)]: {
              marginBottom: `2rem`,
            },
            [media.greaterThan(`medium`)]: {
              paddingRight: `3rem`,
            },
            '&:after': {
              content: `""`,
              height: `1px`,
              width: `100%`,
              position: `absolute`,
              display: `block`,
              right: 0,
              bottom: 0,
              background: `linear-gradient( to right, ${colors.gray4}, ${colors.gray8}, ${colors.gray4}) no-repeat`,
              [media.lessThan(`medium`)]: {
                left: 0,
              },
              [media.greaterThan(`medium`)]: {
                height: `100%`,
                width: `1px`,
                top: 0,
                background: `linear-gradient(to bottom, ${colors.gray4}, ${colors.gray8}, ${colors.gray4})no-repeat`,
              },
            },
          }}
        >
          {neighbor}
        </div>

        <div
          sx={{
            [media.greaterThan(`medium`)]: {
              paddingLeft: `3rem`,
            },
          }}
        >
          <div>{support}</div>
        </div>
      </div>

      <div
        sx={{
          position: `relative`,
          marginBottom: `3rem`,
          ...fullPageWidth,
        }}
      >
        <div
          sx={{
            display: `flex`,
            justifyContent: `flex-end`,
            marginBottom: `0.5rem`,
          }}
        >
          {
            <Img
              fluid={props.data.page.frontmatter.assets.parrots.image.fluid}
              sx={{
                transform: `translateY(3rem)`,
                marginTop: `-3rem`,
                width: `300px`,
                [media.greaterThan(`medium`)]: {
                  width: `450px`,
                },
                '& img': {
                  margin: 0,
                },
              }}
            />
          }
        </div>

        <div
          sx={{
            backgroundColor: `lightBlue`,
            display: `flex`,
            justifyContent: `space-around`,
            marginBottom: `5rem`,
            '& > div': {
              position: `relative`,
              zIndex: `3`,
              margin: `2.5rem 0`,
              '& > a': {
                color: `black`,
                [media.lessThan(`medium`)]: {
                  fontSize: `0.7rem`,
                },
              },
            },
          }}
        >
          {props.data.Accounts.frontmatter.accounts
            .filter(x => x.meta !== `true`)
            .map(x => (
              <div
                key={x.service}
                sx={{
                  '&:hover svg': {
                    color: `${x.service !== `instagram` &&
                      `brands.${x.service}`}`,
                  },
                  '&:hover svg *': {
                    fill: `${x.service === `instagram` &&
                      `url(#InstagramGradient)`}`,
                  },
                }}
              >
                <StyledA
                  href={x.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={x.description}
                >
                  <FontAwesomeIcon icon={[`fab`, x.icon]} size="3x" />
                </StyledA>
              </div>
            ))}
          <div
            sx={{
              '&:hover svg': {
                color: `grayTurqoise`,
              },
            }}
          >
            <StyledA
              href={`${props.data.page.frontmatter.contactLink}#Newsletter`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faNewspaper} size="3x" />
            </StyledA>
          </div>
          {/* <div
            sx={{
              '&:hover svg': {
                color: `rss`,
              }
            }}
          >
            <StyledA
              href={`/${props.pageContext.lang}/blog/rss.xml`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faRssSquare} size="3x" />
            </StyledA>
          </div> */}
        </div>
      </div>

      <TitledCopy
        centered
        title={frontmatter.getIdea.title}
        sx={{
          '& > h2': {
            marginBottom: `0.7rem`,
            [media.lessThan(`medium`)]: {
              fontSize: `2rem`,
            },
          },
          '& > div': {
            fontSize: `0.9rem`,
            [media.greaterThan(`medium`)]: {
              fontSize: `1rem`,
            },
          },
        }}
      >
        {frontmatter.getIdea.subtitle}
      </TitledCopy>

      <div
        sx={{
          margin: `3rem 0 3rem`,
          display: `flex`,
          [media.lessThan(`small`)]: {
            flexDirection: `column`,
            alignItems: `center`,
            '& div + div': {
              marginTop: `1rem`,
            },
          },
          [media.greaterThan(`small`)]: {
            justifyContent: `space-between`,
          },
          '& > div': {
            position: `relative`,
            textAlign: `center`,
            color: `darkWhite`,
            fontSize: `0.98rem`,
            display: `flex`,
            alignItems: `center`,
            [media.greaterThan(`small`)]: {
              width: `19%`,
            },
            '& > div': {
              transition: `transform 0.5s`,
              width: `100%`,
            },
            '&:hover > div': {
              transform: `scale(1.06)`,
            },
          },
        }}
      >
        {frontmatter.getIdea.insights.map((x, i) => (
          <div
            key={i}
            sx={{
              userSelect: `none`,
            }}
          >
            <div
              sx={{
                position: `relative`,
              }}
            >
              <Img
                fixed={x.img.image.fixed}
                sx={{
                  maxWidth: `100%`,
                  '&:after': {
                    content: `""`,
                    background: `linear-gradient(to right, rgba(4, 47, 55, 0.58), rgba(4, 47, 55, 0.72))`,
                    position: `absolute`,
                    display: `block`,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                  },
                }}
              />
            </div>
            <p
              sx={{
                position: `absolute`,
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                margin: `1rem`,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`,
              }}
              dangerouslySetInnerHTML={{ __html: x.descr }}
            />
          </div>
        ))}
      </div>

      <div>
        <ContributorListTitle id="contributors">
          {frontmatter.contributors.title}
        </ContributorListTitle>
        <ContributorList>
          {contributors.edges.map(x => (
            <Contributor key={x.node.item.key}>{x.node.item.name}</Contributor>
          ))}
        </ContributorList>
        <ContributorListLink to={frontmatter.contributors.link}>
          {frontmatter.contributors.linkLabel}
        </ContributorListLink>
      </div>

      <div
        sx={{
          marginTop: `4rem`,
          backgroundColor: `lightBlue`,
          position: `relative`,
          padding: `2rem 1rem`,
          ...fullPageWidth,
        }}
      >
        <div
          sx={{
            [media.greaterThan(`small`)]: {
              display: `flex`,
              justifyContent: `center`,
            },
            '& > div': {
              [media.greaterThan(`small`)]: {
                width: `47%`,
              },
            },
          }}
        >
          {[`left`].map(x => (
            <div key={x}>
              <h3
                sx={{
                  textAlign: `center`,
                  fontSize: `1.8rem`,
                }}
              >
                {frontmatter.checklists[x].title}
              </h3>

              <div
                sx={{
                  marginLeft: `3rem`,
                  display: `flex`,
                  flexDirection: `column`,
                  alignItems: `space-between`,
                  '& > div': {
                    position: `relative`,
                    fontSize: `0.9rem`,
                  },
                  '& > div:not(:last-child)': {
                    marginBottom: `1.3rem`,
                  },
                  '& > div:before': {
                    content: `url(${CheckMark})`, // TODO: dark-theme replace by CSS or SVG
                    position: `absolute`,
                    left: `-3rem`,
                    top: `0.4rem`,
                  },
                  [media.lessThan(`small`)]: {
                    '& > div:last-child': {
                      marginBottom: `1.5rem`,
                    },
                  },
                }}
              >
                {frontmatter.checklists[x].items.map((x, i) => (
                  <div key={i}>{x}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <TitledCopy
        centered
        title={frontmatter.outro.title}
        paragraphs={frontmatter.outro.text}
        sx={{
          margin: `5rem auto 0`,
          [media.lessThan(`medium`)]: {
            '& div': {
              fontSize: `0.9rem`,
              textAlign: `center`,
            },
          },
        }}
      />

      <SupportWidget
        title={props.data.SupportWidget.frontmatter.title}
        description={props.data.SupportWidget.frontmatter.description}
        artwork={props.data.page.frontmatter.assets.sidebarArtwork}
        paypalButton={
          props.data.SiteMeta.frontmatter.assets.paypalButton.publicURL
        }
        bankButton={props.data.SupportWidget.frontmatter.bankButton}
        bankButtonAlt={props.data.SupportWidget.frontmatter.bankButtonAlt}
        bankInfo={props.data.SupportWidget.frontmatter.bankInfo}
        bankDetails={props.data.SupportWidget.frontmatter.bankDetails}
        lang={props.pageContext.lang}
        sx={{
          margin: `3rem 0 5rem`,
        }}
        artworkStyles={{
          width: `350px`,
        }}
      />
    </MainLayout>
  )
}
SupportPage.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }),
}
export default SupportPage

export const query = graphql`
  query($lang: String!, $slug: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...legal
    ...Accounts
    ...SupportWidget

    page: mdx(frontmatter: { slug: { eq: $slug } }) {
      ...MdxTranslations
      fields {
        url
      }
      frontmatter {
        title
        lang
        slug
        contactLink
        summary
        assets {
          arrow_left {
            image: childImageSharp {
              fluid(maxWidth: 125, quality: 75) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          arrow_right {
            image: childImageSharp {
              fluid(maxWidth: 112, quality: 75) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          parrots {
            image: childImageSharp {
              fluid(maxWidth: 450, quality: 75) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          sidebarArtwork {
            image: childImageSharp {
              fluid(maxWidth: 450, quality: 75) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        intro {
          title_
          neighbor
          support
        }
        getIdea {
          title
          subtitle
          insights {
            descr
            img {
              image: childImageSharp {
                fixed(width: 202, height: 202, quality: 75) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
        contributors {
          title
          link
          linkLabel
        }
        checklists {
          left {
            title
            items
          }
          right {
            title
            items
          }
        }
        outro {
          title
          text
        }
      }
    }

    contributors: allGaiamaDonation(
      filter: { item: { anonymous: { ne: true } } }
      sort: { fields: [item___time_string], order: DESC }
      limit: 16
    ) {
      edges {
        node {
          item {
            key
            name
          }
        }
      }
    }
  }
`
