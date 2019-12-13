/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'
import Helmet from 'react-helmet'
import styled from '@emotion/styled'
// import slugify from 'slugify'
// import { Box, colors, fullPageWidth, maxWidthContent, media } from '@src/theme'
import MainLayout from '@components/MainLayout'
// import { InstagramWidget } from '@components/InstagramWidget'
// import { SupportWidget } from '@components/Shared'
// import TitledCopy from '@components/TitledCopy'
// import { VideoPlayer } from '@gaiama/react-video-player'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { MDXProvider } from '@mdx-js/react'
import { Box, Heading, Text, Grid /*, Flex*/ } from '@theme-ui/components'
import space from '@styled-system/space'
import { createShouldForwardProp } from '@styled-system/should-forward-prop'
import Link from '@components/Link'
import { VideoPlayer } from '@components/VideoPlayer'

// const Flex = props => (
//   <div
//     sx={{
//       display: `flex`,
//       flexWrap: `wrap`,
//       div: {
//         // width: 100 / props.children.length + `%`,
//       },
//     }}
//     {...props}
//   />
// )
const Flex = styled(`div`, {
  shouldForwardProp: createShouldForwardProp([...space.propNames]),
})(space, {
  display: `flex`,
  flexWrap: `wrap`,
})
const Column = ({
  // title,
  // titleLevel: Level = `h2`,
  // content,
  width = `100%`,
  children,
  ...props
}) => (
  <div sx={{ width: [`100%`, width] }} {...props}>
    {/* {!!title && <Level>{title}</Level>}
    {!!content && <p>{content}</p>} */}
    {!!children && children}
  </div>
)
Column.propTypes = {
  width: PropTypes.string,
}

const components = {
  Flex,
  Column,
  Heading,
  Text,
  Box,
}

const ImageBlock = ({ image, stacked, ...props }) => (
  <Box sx={{ width: [`100%`, !stacked && `33%`] }} {...props}>
    <Img {...image} />
  </Box>
)
ImageBlock.propTypes = {
  image: PropTypes.object,
  stacked: PropTypes.bool,
}

const ContentBlocks = ({ mdx, stacked = false }) => {
  const {
    title,
    style,
    background,
    image,
    videoPosition,
    videoPoster,
    blockVideo,
  } = mdx.frontmatter
  const blocks = mdx.frontmatter.blocks || []
  const actions = mdx.frontmatter.actions || []
  const { file, position: imagePosition } = image || {}

  if (blocks.length) {
    return (
      <Box mt="3rem" bg={background && `background2`} p="3rem">
        <Box mx="auto" sx={{ maxWidth: `50rem` }}>
          {!!title && <h2 sx={{ textAlign: `center` }}>{title}</h2>}
          <Grid columns={[1, null, blocks.length]} gap={4}>
            {blocks.map(block => (
              <Box key={block.relativePath}>
                <ContentBlocks {...block} stacked={true} />
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        // mt: !stacked && `2rem`,
        backgroundColor: background && `background2`,
        // width: `90%`,
        mt: !stacked && `3rem`,
        p: !stacked && background && `3rem`,
      }}
    >
      <Box
        sx={{
          maxWidth: `50rem`,
          mx: `auto`,
          display: !stacked && `flex`,
          flexWrap: `wrap`,
          flexDirection: [`column-reverse`, `row`],
          ...(style === `center` ? { h2: { textAlign: `center` } } : {}),
        }}
      >
        {[`left`, `top`].includes(imagePosition) && (
          <ImageBlock
            stacked={stacked}
            image={file.image}
            mt={!!stacked && 0}
            mx={imagePosition === `top` && `auto`}
            mr="auto"
          />
        )}

        {[`left`, `top`].includes(videoPosition) && (
          <VideoPlayer
            video={blockVideo}
            poster={videoPoster.publicURL}
            mt={!!stacked && 0}
            mx={videoPosition === `top` && `auto`}
            mr={videoPosition === `right` && `auto`}
            wrapperStyles={{ maxWidth: `35rem` }}
          />
        )}

        <Box
          sx={{
            width: [`90%`, !!file && !stacked ? `60%` : `100%`],
            mx: [`auto`, 0],
            mt: !!stacked && `1rem`,
          }}
        >
          {!!title && <h2 sx={{ mt: [`2rem`, 0] }}>{title}</h2>}

          <MDXRenderer>{mdx.body}</MDXRenderer>

          {!!actions.length && (
            <Box sx={{ '> * + *': { ml: `1rem` } }}>
              {actions.map(x => (
                <Link key={x.link} cta={x.type === `cta`} to={x.link}>
                  {x.text}
                </Link>
              ))}
            </Box>
          )}
        </Box>

        {[`right`, `bottom`].includes(imagePosition) && (
          <ImageBlock stacked={stacked} image={file.image} ml="auto" />
        )}

        {[`right`, `bottom`].includes(videoPosition) && (
          <VideoPlayer
            video={blockVideo}
            poster={videoPoster.publicURL}
            ml={videoPosition === `right` && `auto`}
            mx={videoPosition === `bottom` && `auto`}
            wrapperStyles={{ maxWidth: `35rem` }}
          />
        )}
      </Box>
    </Box>
  )
}
ContentBlocks.propTypes = {
  stacked: PropTypes.boolean,
  mdx: PropTypes.shape({
    body: PropTypes.string,
    frontmatter: PropTypes.shapre({
      title: PropTypes.string,
      background: PropTypes.boolean,
      style: PropTypes.string,
      image: PropTypes.object,
      blocks: PropTypes.array,
      videoPosition: PropTypes.string,
      blockVideo: PropTypes.object,
    }),
  }),
}

const HomePage = props => {
  const { homepage, page } = props.data

  return (
    <MainLayout
      {...props}
      // wrapperStyles={{ maxWidth: `50rem`, '> div + div': { mt: `3rem` } }}
      wrapperStyles={{
        width: `100%`,
        maxWidth: `100%`,
        pt: 0,
        '> div + div': { mt: `5rem` },
      }}
    >
      <Helmet>
        <title>{homepage.frontmatter.header.subtitle}</title>
      </Helmet>

      <MDXProvider components={components}>
        {!!page.frontmatter.blocks.length &&
          page.frontmatter.blocks.map(block => (
            <ContentBlocks key={block.relativePath} {...block} />
          ))}
      </MDXProvider>
    </MainLayout>
  )
}
HomePage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.object,
    homepage: PropTypes.object,
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
  fragment MdxBlocksImage on MdxFrontmatter {
    image {
      position
      file {
        relativePath
        image: childImageSharp {
          fluid(
            maxWidth: 420
            quality: 75
            srcSetBreakpoints: [140, 240, 340, 840]
          ) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
  fragment MdxBlocksFrontmatter on MdxFrontmatter {
    title
    style
    background
    ...MdxBlocksImage
    actions {
      type
      link
      text
    }
    videoPosition
    videoPoster {
      publicURL
    }
    blockVideo {
      type
      file {
        publicURL
      }
    }
  }
  fragment MdxBlocks on MdxFrontmatter {
    blocks {
      relativePath
      mdx: childMdx {
        body
        frontmatter {
          ...MdxBlocksFrontmatter
          blocks {
            relativePath
            mdx: childMdx {
              body
              frontmatter {
                ...MdxBlocksFrontmatter
              }
            }
          }
        }
      }
    }
  }

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

    page: mdx(fields: { url: { eq: $url } }) {
      ...MdxTranslations
      body
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
        ...MdxBlocks
      }
    }
  }
`
