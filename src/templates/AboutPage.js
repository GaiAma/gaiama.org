/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'
import slugify from 'slugify'
import { Box, Heading, Grid } from '@theme-ui/components'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import MainLayout from '@components/MainLayout'
// import Media from 'react-media'

const slug = x => slugify(x, { remove: /[*+~.()'"!:@]/g })

const AboutPage = props => {
  const { page, Partners } = props.data

  // const PeopleGallery = () => (
  //   <div
  //     css={css`
  //       width: 23%;
  //       margin: 2rem 0;
  //       ${media.lessThan(`medium`)} {
  //         display: none;
  //       }
  //     `}
  //   >
  //     {page.frontmatter.peopleGallery.map((x, i) => (
  //       <Img
  //         key={i}
  //         fixed={x.image.fixed}
  //         css={css`
  //           display: flex !important;
  //           max-width: 100%;
  //         `}
  //       />
  //     ))}
  //   </div>
  // )

  return (
    <MainLayout
      {...props}
      wrapperStyles={{
        width: `100%`,
        maxWidth: `100%`,
        pt: 0,
        '> div + div': { mt: `5rem` },
      }}
    >
      <Box
        sx={{
          backgroundColor: `background2`,
          mt: `3rem`,
          p: `3rem`,
        }}
      >
        <Box
          sx={{
            maxWidth: `50rem`,
            mx: `auto`,
          }}
        >
          <Heading
            as="h1"
            id={slug(page.frontmatter.goals.title)}
            sx={{ textAlign: `center` }}
          >
            {page.frontmatter.goals.title}
          </Heading>
          <Grid columns={[1, 2]} gap="6" mt="3rem">
            {page.frontmatter.goals.goals.map(goal => (
              <Box key={goal.title}>
                <Heading id={slug(goal.title)}>{goal.title}</Heading>
                <Box
                  as="ul"
                  mt="2rem"
                  sx={{ listStyle: `none`, ml: `-2.5rem` }}
                >
                  {goal.goals.map(x => (
                    <li key={x.text}>
                      <div
                        sx={{
                          display: `flex`,
                        }}
                      >
                        <div
                          sx={{ width: `2rem`, fontSize: `2rem`, mr: `0.5rem` }}
                        >
                          {x.emoji}
                        </div>
                        <div>{x.text}</div>
                      </div>
                    </li>
                  ))}
                </Box>
                {!!goal.image && (
                  <Img fluid={goal.image.image.fluid} sx={{ mt: `1rem` }} />
                )}
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>

      <div
        sx={{
          maxWidth: `50rem`,
          mx: `auto`,
        }}
      >
        <Grid columns={[1, 2, 4]} gap="36px" sx={{ rowGap: `60px` }}>
          {page.frontmatter.bios.map(bio => (
            <div
              key={bio.id}
              id={slug(bio.name)}
              sx={{
                textAlign: `center`,
              }}
            >
              <div>
                <Img
                  fixed={bio.img.image.fixed}
                  alt={bio.name}
                  title={bio.name}
                />
              </div>
              <div>
                <Heading as="h4" id={slug(bio.name)}>
                  {bio.name}
                </Heading>
                <Box mt="0.5rem">
                  {bio.position}
                  <br />
                  {bio.field}
                </Box>
              </div>
            </div>
          ))}
        </Grid>
      </div>

      {/* <Media query="(min-width: 779px)" render={PeopleGallery} /> */}
      {/* </div> */}

      <Box
        sx={{
          backgroundColor: `background2`,
          mt: `3rem`,
          p: `3rem`,
        }}
      >
        <Box
          sx={{
            maxWidth: `50rem`,
            mx: `auto`,
            '.inline-gallery': {
              textAlign: `center`,
              display: `grid`,
              gridTemplateColumns: [`repeat(1,1fr)`, `repeat(4,1fr)`],
              gridGap: `36px`,
              '> span': {
                width: `100%`,
                alignSelf: `center`,
              },
            },
          }}
        >
          <Heading id={slug(Partners.mdx.frontmatter.title)}>
            {Partners.mdx.frontmatter.title}
          </Heading>
          {/* TODO: where's boxShadow coming from? */}
          <Box mt="2rem" sx={{ img: { boxShadow: `none !important` } }}>
            <MDXRenderer>{Partners.mdx.body}</MDXRenderer>
          </Box>
        </Box>
      </Box>

      {/* <div>
        <ContributorListTitle id="contributors">
          {page.frontmatter.contributors.title}
        </ContributorListTitle>
        <ContributorList>
          {contributors.edges.map(x => (
            <Contributor key={x.node.item.key}>{x.node.item.name}</Contributor>
          ))}
        </ContributorList>
        <ContributorListLink to={page.frontmatter.contributors.link}>
          {page.frontmatter.contributors.linkLabel}
        </ContributorListLink>
      </div> */}
    </MainLayout>
  )
}
AboutPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.object,
    Cryptos: PropTypes.object,
    news: PropTypes.object,
    Partners: PropTypes.object,
    // contributors: PropTypes.array,
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
        # cover {
        #   publicURL
        # }
        goals {
          title
          goals {
            title
            goals {
              emoji
              text
            }
            image {
              image: childImageSharp {
                fluid(
                  maxWidth: 1000
                  quality: 75 # srcSetBreakpoints: [140, 240, 340, 840]
                ) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        intro {
          title
          text
        }
        # contributors {
        #   title
        #   link
        #   linkLabel
        # }
        bios {
          id
          name
          position
          field
          # bio
          img {
            image: childImageSharp {
              fixed(width: 150, height: 150, quality: 75) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
        # peopleGallery {
        #   image: childImageSharp {
        #     fixed(width: 258, height: 258, quality: 75) {
        #       ...GatsbyImageSharpFixed
        #     }
        #   }
        # }
      }
    }

    Partners: file(
      relativePath: { regex: "/^partners/" }
      name: { eq: $lang }
    ) {
      mdx: childMdx {
        frontmatter {
          title
        }
        body
      }
    }

    # Labels: mdx(
    #   frontmatter: { type: { eq: "SiteMeta" }, lang: { eq: $lang } }
    # ) {
    #   frontmatter {
    #     readMore
    #   }
    # }

    # contributors: allGaiamaDonation(
    #   sort: { fields: [item___time_string], order: DESC }
    #   filter: { item: { anonymous: { ne: true } } }
    #   limit: 30
    # ) {
    #   edges {
    #     node {
    #       item {
    #         key
    #         name
    #       }
    #     }
    #   }
    # }
  }
`
