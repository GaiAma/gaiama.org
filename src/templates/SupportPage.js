import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { css } from 'glamor'
import MainLayout from '@/components/MainLayout'
import { SupportWidget } from '@/components/Shared'
import CheckMark from '@/assets/check.png'
import TitledCopy from '@/components/TitledCopy'
import {
  breakPoints,
  colors,
  fontFamilies,
} from '@/theme'

const SupportPage = props => {
  const { frontmatter } = props.data.page
  return (
    <MainLayout {...props}>
      <TitledCopy
        centered
        title={frontmatter.intro.title_}
      />
      
      <div css={{
        display: `flex`,
        justifyContent: `space-evenly`,
      }}>
        {[`arrow_left`, `arrow_right`].map(x => 
          <Img
            sizes={props.data.page.frontmatter.assets[x].image.sizes}
            key={x}
            outerWrapperClassName={css({
              flex: `none`,
              marginBottom: `1rem`,
            })}
            css={{ width: `112px` }}
          />
        )}
      </div>

      <div css={{
        display: `flex`,
        justifyContent: `space-between`,
        '& > div': {
          width: `50%`,
        },
      }}>
        <div css={{
          borderRight: `1px solid #ccc`,
          borderImageSource: `linear-gradient(to bottom, #cccccc21, #ccc, #cccccc21)`,
          borderImageSlice: `1`,
          paddingRight: `3rem`,
        }}>
          <p dangerouslySetInnerHTML={{ __html: frontmatter.intro.neighbor }} />
        </div>

        <div css={{ paddingLeft: `3rem` }}>
          <div>
            <p>{frontmatter.intro.support}</p>
            <div css={{
              display: `flex`,
              justifyContent: `space-between`,
              fontFamily: fontFamilies.accent,
              margin: `2rem 0`,
              flexWrap: `wrap`,
              '& > div': {
                width: `33%`,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`,
                fontSize: `2rem`,
                marginBottom: `2rem`,
              },
            }}>
              <div>Paypal</div>
              <div>Patreon</div>
              <div>Crypto</div>
            </div>
          </div>
        </div>
      </div>

      <div css={{
        position: `relative`,
        left: `50%`,
        transform: `translateX(-50vw)`,
        width: `100vw`,
        marginBottom: `3rem`,
      }}>
        <div css={{
          display: `flex`,
          justifyContent: `flex-end`,
          marginBottom: `.5rem`,
        }}>
          {<Img
            sizes={props.data.page.frontmatter.assets.parrots.image.sizes}
            css={{
              transform: `translateY(5rem)`,
              marginTop: `-8rem`,
              width: `450px`,
              '& img': {
                margin: `0`,
              },
            }}
          />}
        </div>

        <div css={{
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
            },
          },
        }}>
          <div css={{
            '&:hover svg': {
              color: colors.brands.facebook,
            },
          }}>
            <a href="https://" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={[`fab`, `facebook-square`]} size="3x" />
            </a>
          </div>
          <div css={{
            '&:hover svg *': {
              fill: `url(#InstagramGradient)`,
            },
          }}>
            <a href="https://" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={[`fab`, `instagram`]} size="3x" />
            </a>
          </div>
          <div css={{
            '&:hover svg': {
              color: colors.brands.youtube,
            },
          }}>
            <a href="https://" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={[`fab`, `youtube`]} size="3x" />
            </a>
          </div>
          <div css={{
            '&:hover svg': {
              color: colors.brands.patreon,
            },
          }}>
            <a href="https://" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={[`fab`, `patreon`]} size="3x" />
            </a>
          </div>
          <div css={{
            '&:hover svg': {
              color: `#73989a`,
            },
          }}>
            <a href={props.data.page.frontmatter.contactLink} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={[`fas`, `newspaper`]} size="3x" />
            </a>
          </div>
          <div css={{
            '&:hover svg': {
              color: colors.rss,
            },
          }}>
            <a href="https://" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={[`fas`, `rss-square`]} size="3x" />
            </a>
          </div>
        </div>
      </div>

      <TitledCopy
        centered
        title={frontmatter.getIdea.title}
        css={{
          '& > h2': { marginBottom: `.7rem` },
          '& > div': { fontSize: `1rem` },
        }}
      >
        {frontmatter.getIdea.subtitle}
      </TitledCopy>

      <div css={{
        margin: `3rem 0 6rem`,
        [breakPoints.minLg]: {
          display: `flex`,
          justifyContent: `space-between`,
        },
        '& > div': {
          position: `relative`,
          textAlign: `center`,
          color: colors.darkWhite,
          fontSize: `.98rem`,
          display: `flex`,
          alignItems: `center`,
          '& > div': {
            transition: `transform .5s`,
            [breakPoints.minLg]: {
              width: `202px`,
              height: `202px`,
            },
          },
          '&:hover > div': {
            transform: `scale(1.06)`,
          },
        },
      }}>
        {frontmatter.getIdea.insights.map((x, i) => (
          <div key={i}>
            <div
              css={{
                position: `relative`,
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
            >
              <Img
                resolutions={x.img.image.resolutions}
                css={{
                  width: `202px !important`,
                  height: `202px !important`,
                  verticalAlign: `bottom`,
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
            >
              {x.descr}
            </p>
          </div>
        ))}
      </div>

      <div css={{
        background: colors.lightBlue,
        position: `relative`,
        left: `50%`,
        transform: `translateX(-50vw)`,
        width: `100vw`,
      }}>
        <div css={{
          [breakPoints.minLg]: {
            display: `flex`,
            justifyContent: `center`,
          },
          '& > div': {
            margin: `3rem 0`,
            [breakPoints.minLg]: {
              width: `47%`,
              '&:first-child': {
                borderRight: `1px solid #ccc`,
                borderImageSource: `linear-gradient(to bottom, #cccccc21, #ccc, #cccccc21)`,
                borderImageSlice: `1`,
                paddingRight: `3rem`,
              },
              '&:last-child': {
                paddingLeft: `3rem`,
              },
            },
          },
        }}>
          {[`left`, `right`].map(x => (
            <div
              key={x}
              css={{
              }}
            >
              <h3 css={{
                textAlign: `center`,
                fontSize: `1.8rem`,
              }}>
                {frontmatter.checklists[x].title}
              </h3>
        
              <ul css={{
                listStyle: `none`,
                marginLeft: `3rem`,
                '& > li': {
                  position: `relative`,
                  fontSize: `.9rem`,
                },
                '& > li:not(:last-child)': {
                  marginBottom: `1.3rem`,
                },
                '& > li:last-child': {
                  marginBottom: 0,
                },
                '& > li:before': {
                  content: `url(${CheckMark})`,
                  position: `absolute`,
                  left: `-3rem`,
                  top: `0.4rem`,
                },
              }}>
                {frontmatter.checklists[x].items.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <TitledCopy
        centered
        css={{ margin: `5rem auto 0` }}
        title={frontmatter.outro.title}
        paragraphs={frontmatter.outro.text}
      />

      <SupportWidget
        title={props.data.SupportWidget.frontmatter.title}
        artwork={props.data.page.frontmatter.assets.mushrooms}
        css={{ margin: `0 0 5rem` }}
        artworkStyles={{
          width: `350px`,
        }}
      />
    </MainLayout>
  )
}
SupportPage.propTypes = {
  data: PropTypes.object,
}
export default SupportPage

export const query = graphql`
  query SupportPageQuery(
    $lang: String!
    $slug: String!
  ) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...SupportWidget
    #...Cryptos
    
    page: javascriptFrontmatter (
      frontmatter: {
        slug: { eq: $slug }
      }
    ) {
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
        contactLink
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
          mushrooms {
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
                resolutions(width: 300, height: 300, quality: 75) {
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
