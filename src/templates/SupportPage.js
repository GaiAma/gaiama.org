import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { css } from 'glamor'
import MainLayout from '@/components/MainLayout'
import { SupportWidget } from '@/components/Shared'
import CheckMark from '@/assets/check.png'
import TitledCopy from '@/components/TitledCopy'
import { colors, fullPageWidth, media, fontFamilies, visible } from '../theme'

const SupportPage = props => {
  const { frontmatter } = props.data.page
  const initialStyle = css(visible.maxMd, {
    fontFamily: fontFamilies.accent,
    fontSize: `2.9rem`,
    lineHeight: 1,
    float: `left`,
    marginRight: `1rem`,
  })
  const [neighbor, support] = [
    frontmatter.intro.neighbor,
    frontmatter.intro.support,
  ].map((x, i) => `<span class="${initialStyle}">${i + 1}.</span>${x}`)
  return (
    <MainLayout {...props}>
      <TitledCopy
        centered
        title={frontmatter.intro.title_}
        css={{
          [media.lessThan(`medium`)]: {
            '& > h2': { fontSize: `2rem` },
            '& > div, & > button': { fontSize: `.85rem` },
          },
        }}
      />

      <div
        css={{
          display: `flex`,
          justifyContent: `space-around`,
          [media.lessThan(`medium`)]: {
            display: `none`,
          },
        }}
      >
        {[`arrow_left`, `arrow_right`].map(x => (
          <Img
            sizes={props.data.page.frontmatter.assets[x].image.sizes}
            key={x}
            outerWrapperClassName={css({
              flex: `none`,
              marginBottom: `1rem`,
            })}
            css={{ width: `112px` }}
          />
        ))}
      </div>

      <div
        css={{
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
          css={{
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
              right: `0`,
              bottom: `0`,
              // background: `linear-gradient(to right, #cccccc21, #abaaaa, #cccccc21) no-repeat`,
              background: `linear-gradient(to right, rgba(204,204,204,0.13), #abaaaa, #cccccc21) no-repeat`,
              [media.lessThan(`medium`)]: {
                left: `0`,
              },
              [media.greaterThan(`medium`)]: {
                height: `100%`,
                width: `1px`,
                top: `0`,
                // background: `linear-gradient(to bottom, #cccccc21, #abaaaa, #cccccc21) no-repeat`,
                background: `linear-gradient(to bottom, rgba(204,204,204,0.13), #abaaaa, rgba(204,204,204,0.13)) no-repeat`,
              },
            },
          }}
        >
          <p dangerouslySetInnerHTML={{ __html: neighbor }} />
        </div>

        <div
          css={{
            [media.greaterThan(`medium`)]: {
              paddingLeft: `3rem`,
            },
          }}
        >
          <div>
            <p dangerouslySetInnerHTML={{ __html: support }} />
          </div>
        </div>
      </div>

      <div
        css={{
          position: `relative`,
          marginBottom: `3rem`,
          ...fullPageWidth,
        }}
      >
        <div
          css={{
            display: `flex`,
            justifyContent: `flex-end`,
            marginBottom: `.5rem`,
          }}
        >
          {
            <Img
              sizes={props.data.page.frontmatter.assets.parrots.image.sizes}
              css={{
                transform: `translateY(3rem)`,
                marginTop: `-3rem`,
                width: `300px`,
                [media.greaterThan(`medium`)]: {
                  marginTop: `-6rem`,
                  width: `450px`,
                },
                '& img': {
                  margin: `0`,
                },
              }}
            />
          }
        </div>

        <div
          css={{
            background: colors.lightBlue,
            display: `flex`,
            justifyContent: `space-around`,
            marginBottom: `5rem`,
            '& > div': {
              position: `relative`,
              zIndex: 3,
              margin: `2.5rem 0`,
              '& > a': {
                color: colors.black,
                [media.lessThan(`medium`)]: {
                  fontSize: `.7rem`,
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
                css={{
                  '&:hover svg': x.service !== `instagram` && {
                    color: colors.brands[x.service],
                  },
                  '&:hover svg *': x.service === `instagram` && {
                    fill: `url(#InstagramGradient)`,
                  },
                }}
              >
                <a
                  href={x.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={x.description}
                >
                  <FontAwesomeIcon icon={[`fab`, x.icon]} size="3x" />
                </a>
              </div>
            ))}
          <div
            css={{
              '&:hover svg': {
                color: `#73989a`,
              },
            }}
          >
            <a
              href={`${props.data.page.frontmatter.contactLink}#Newsletter`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={[`fas`, `newspaper`]} size="3x" />
            </a>
          </div>
          <div
            css={{
              '&:hover svg': {
                color: colors.rss,
              },
            }}
          >
            <a
              href={`/${props.pathContext.lang}/blog/rss.xml`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={[`fas`, `rss-square`]} size="3x" />
            </a>
          </div>
        </div>
      </div>

      <TitledCopy
        centered
        title={frontmatter.getIdea.title}
        css={{
          '& > h2': {
            marginBottom: `.7rem`,
            [media.lessThan(`medium`)]: {
              fontSize: `2rem`,
            },
          },
          '& > div': {
            fontSize: `.9rem`,
            [media.greaterThan(`medium`)]: {
              fontSize: `1rem`,
            },
          },
        }}
      >
        {frontmatter.getIdea.subtitle}
      </TitledCopy>

      <div
        css={{
          margin: `3rem 0 6rem`,
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
            color: colors.darkWhite,
            fontSize: `.98rem`,
            display: `flex`,
            alignItems: `center`,
            [media.greaterThan(`small`)]: {
              width: `19%`,
            },
            '& > div': {
              transition: `transform .5s`,
              width: `100%`,
            },
            '&:hover > div': {
              transform: `scale(1.06)`,
            },
          },
        }}
      >
        {frontmatter.getIdea.insights.map((x, i) => (
          <div key={i} css={{ userSelect: `none` }}>
            <div
              css={{
                position: `relative`,
              }}
            >
              <Img
                resolutions={x.img.image.resolutions}
                css={{
                  maxWidth: `100%`,
                  '&:after': {
                    content: `""`,
                    background: `linear-gradient(to right, rgba(4,47,55,0.58), rgba(4,47,55,0.72))`,
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
              css={{
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

      <div
        css={{
          background: colors.lightBlue,
          position: `relative`,
          padding: `2rem 1rem`,
          ...fullPageWidth,
        }}
      >
        <div
          css={{
            [media.greaterThan(`small`)]: {
              display: `flex`,
              justifyContent: `center`,
            },
            '& > div': {
              [media.greaterThan(`small`)]: {
                width: `47%`,
                '&:first-child': {
                  paddingRight: `3rem`,
                  position: `relative`,
                  '&:after': {
                    content: `""`,
                    height: `100%`,
                    width: `1px`,
                    position: `absolute`,
                    display: `block`,
                    top: `0`,
                    right: `0`,
                    // background: `linear-gradient(to bottom, #cccccc21, #abaaaa, #cccccc21) no-repeat`,
                    background: `linear-gradient(to bottom, rgba(204,204,204,0.13), #abaaaa, rgba(204,204,204,0.13)) no-repeat`,
                  },
                },
                '&:last-child': {
                  paddingLeft: `3rem`,
                },
              },
            },
          }}
        >
          {[`left`, `right`].map(x => (
            <div key={x} css={{}}>
              <h3
                css={{
                  textAlign: `center`,
                  fontSize: `1.8rem`,
                }}
              >
                {frontmatter.checklists[x].title}
              </h3>

              <div
                css={{
                  marginLeft: `3rem`,
                  display: `flex`,
                  flexDirection: `column`,
                  alignItems: `space-between`,
                  '& > div': {
                    position: `relative`,
                    fontSize: `.9rem`,
                  },
                  '& > div:not(:last-child)': {
                    marginBottom: `1.3rem`,
                  },
                  '& > div:before': {
                    content: `url(${CheckMark})`,
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
        css={{
          margin: `5rem auto 0`,
          [media.lessThan(`medium`)]: {
            '& div': {
              fontSize: `.9rem`,
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
        lang={props.pathContext.lang}
        css={{ margin: `3rem 0 5rem` }}
        artworkStyles={{
          width: `350px`,
        }}
      />
    </MainLayout>
  )
}
SupportPage.propTypes = {
  data: PropTypes.object,
  pathContext: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }),
}
export default SupportPage

export const query = graphql`
  query SupportPageQuery($lang: String!, $slug: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...legal
    ...Accounts
    ...SupportWidget

    page: javascriptFrontmatter(frontmatter: { slug: { eq: $slug } }) {
      fields {
        translations {
          frontmatter {
            title
            lang
            slug
            cover {
              publicURL
            }
          }
        }
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
              sizes(maxWidth: 125, quality: 75) {
                ...GatsbyImageSharpSizes
              }
            }
          }
          arrow_right {
            image: childImageSharp {
              sizes(maxWidth: 112, quality: 75) {
                ...GatsbyImageSharpSizes
              }
            }
          }
          parrots {
            image: childImageSharp {
              sizes(maxWidth: 450, quality: 75) {
                ...GatsbyImageSharpSizes
              }
            }
          }
          sidebarArtwork {
            image: childImageSharp {
              sizes(maxWidth: 450, quality: 75) {
                ...GatsbyImageSharpSizes
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
                resolutions(width: 202, height: 202, quality: 75) {
                  ...GatsbyImageSharpResolutions
                }
              }
            }
          }
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
  }
`
