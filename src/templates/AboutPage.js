import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import slugify from 'slugify'
import MainLayout from '@/components/MainLayout'
import TitledCopy from '@/components/TitledCopy'
import Newsticker from '@/components/Newsticker'
import { mediaQuery } from '@/components/MediaQuery'
import Media from 'react-media'
import { colors, media } from '@/theme'

const AboutPage = props => {
  const { page, NewsTicker, Labels } = props.data

  const PeopleGallery = () => (
    <div
      css={{
        width: `23%`,
        margin: `2rem 0`,
        '& .gatsby-image-outer-wrapper': {
          display: `flex`,
        },
        [media.lessThan(`medium`)]: {
          display: `none`,
        },
      }}
    >
      {page.frontmatter.peopleGallery.map((x, i) => (
        <Img key={i} fixed={x.image.fixed} css={{ maxWidth: `100%` }} />
      ))}
    </div>
  )

  return (
    <MainLayout {...props}>
      <TitledCopy
        centered
        title={page.frontmatter.intro.title}
        paragraphs={page.frontmatter.intro.text}
        spoiler={mediaQuery(`(max-width: 779px)`)}
        spoilerLabel={Labels.frontmatter.readMore}
        css={{
          marginBottom: `3rem`,
          [media.greaterThan(`small`)]: {
            marginBottom: `6rem`,
          },
          '& > button': {
            background: `none`,
            border: `none`,
            color: colors.link,
          },
          [media.lessThan(`medium`)]: {
            '& > h2': { fontSize: `2rem` },
            '& > div, & > button': { fontSize: `.85rem` },
          },
        }}
      />

      <div
        css={{
          display: `flex`,
          justifyContent: `space-between`,
          marginBottom: `3rem`,
        }}
      >
        <div css={{ [media.greaterThan(`medium`)]: { width: `70%` } }}>
          <div css={{ '& > div': { marginBottom: `4rem` } }}>
            {page.frontmatter.bios.map(bio => (
              <div
                key={bio.id}
                id={slugify(bio.name)}
                css={{
                  display: `flex`,
                  [media.lessThan(`medium`)]: {
                    flexDirection: `column`,
                    alignItems: `center`,
                    // textAlign: `center`,
                  },
                  [media.greaterThan(`medium`)]: {
                    justifyContent: `space-between`,
                  },
                }}
              >
                <Img
                  fixed={bio.img.image.fixed}
                  alt={bio.name}
                  title={bio.name}
                  css={{
                    borderRadius: `50%`,
                    [media.greaterThan(`medium`)]: {
                      marginRight: `2rem`,
                    },
                  }}
                />
                <div>
                  <h4
                    id={slugify(bio.name)}
                    css={{
                      fontSize: `1.7rem`,
                      marginBottom: `1rem`,
                      [media.greaterThan(`medium`)]: {
                        fontSize: `2rem`,
                      },
                    }}
                  >
                    {bio.name}
                  </h4>
                  <div css={{ marginBottom: `1rem` }}>
                    {bio.position}
                    <br />
                    {bio.field}
                  </div>
                  <p
                    css={{
                      textAlign: `left`,
                      [media.lessThan(`medium`)]: {
                        fontSize: `.85rem`,
                      },
                      [media.greaterThan(`medium`)]: {
                        textAlign: `justify`,
                      },
                    }}
                    dangerouslySetInnerHTML={{ __html: bio.bio }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2
              css={{
                fontSize: `2.3rem`,
                marginBottom: `3.5rem`,
                textAlign: `center`,
              }}
            >
              {page.frontmatter.specialThanks.title}
            </h2>

            <div
              css={{
                display: `flex`,
                justifyContent: `space-between`,
                flexWrap: `wrap`,
                '& > div:not(:last-child)': {
                  marginBottom: `3rem`,
                },
              }}
            >
              {page.frontmatter.specialThanks.bios.map(bio => (
                <div
                  key={bio.id}
                  id={slugify(bio.name)}
                  css={{ textAlign: `center` }}
                >
                  <Img
                    fixed={bio.img.image.fixed}
                    alt={bio.name}
                    title={bio.name}
                    css={{
                      borderRadius: `50%`,
                    }}
                  />
                  <div>
                    <h4 id={slugify(bio.name)} css={{ fontSize: `1.7rem` }}>
                      {bio.name}
                    </h4>
                    <p
                      css={{ fontSize: `.85rem` }}
                      dangerouslySetInnerHTML={{ __html: bio.bio }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Media query="(min-width: 779px)" render={PeopleGallery} />
      </div>

      <Newsticker
        items={props.data.news.edges.map(x => x.node)}
        title={NewsTicker.frontmatter.title}
        linkLabel={NewsTicker.frontmatter.linkLabel}
        link={NewsTicker.frontmatter.link}
        readmoreLabel={NewsTicker.frontmatter.readmoreLabel}
        layout={page.frontmatter.NewsTicker.layout}
      />
    </MainLayout>
  )
}
AboutPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.object,
    Cryptos: PropTypes.object,
    news: PropTypes.object,
    NewsTicker: PropTypes.object,
  }),
}
export default AboutPage

export const query = graphql`
  query($lang: String!, $slug: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...NewsTicker
    ...newstickerLandscape
    ...legal
    ...Accounts

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
        summary
        cover {
          publicURL
        }
        intro {
          title
          text
        }
        NewsTicker {
          layout
        }
        bios {
          id
          name
          position
          field
          bio
          img {
            image: childImageSharp {
              fixed(width: 150, height: 150, quality: 75) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
        specialThanks {
          title
          bios {
            id
            name
            bio
            img {
              image: childImageSharp {
                fixed(width: 150, height: 150, quality: 75) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
        peopleGallery {
          image: childImageSharp {
            fixed(width: 258, height: 258, quality: 75) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }

    Labels: siteMetaMarkdown(frontmatter: { lang: { eq: $lang } }) {
      frontmatter {
        readMore
      }
    }
  }
`
