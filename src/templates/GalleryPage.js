// import React from 'react'
// import PropTypes from 'prop-types'
// // import Helmet from 'react-helmet'
// import Img from 'gatsby-image/withIEPolyfill'
// import { graphql, Link } from 'gatsby'
// import chunk from 'lodash/fp/chunk'
// import compose from 'ramda/src/compose'
// import flatten from 'ramda/src/flatten'
// import map from 'ramda/src/map'
// import reduce from 'ramda/src/reduce'
// import path from 'ramda/src/path'
// import merge from 'ramda/src/merge'
// import Media from 'react-media'
// import MainLayout from '@components/MainLayout'
// import { mediaQuery } from '@components/MediaQuery'
// // import { Pager, Paginator } from '@components/Paginator'
// import { colors, gradients, media } from '@src/theme'

// const Image = ({ filename, description, slug, title, linkLabel }) => (
//   <div key={filename.base} css={{ flex: filename.aspectRatio }}>
//     <figure
//       css={{
//         margin: 0,
//         '& a': {
//           display: `block`,
//           position: `relative`,
//         },
//         '& figcaption': {
//           display: `none`,
//           background: gradients.primary,
//           position: `absolute`,
//           top: 0,
//           right: 0,
//           bottom: 0,
//           left: 0,
//           color: colors.darkWhite,
//           padding: `.8rem`,
//           justifyContent: `center`,
//           alignItems: `center`,
//           textAlign: `center`,
//           overflow: `hidden`,
//           transition: `all .35s`,
//           opacity: 0,
//           [media.greaterThan(`medium`)]: {
//             display: `flex`,
//           },
//         },
//         '&:hover figcaption': {
//           opacity: 1,
//         },
//       }}
//     >
//       <Link
//         role="link"
//         to={slug}
//         css={{
//           color: colors.darkWhite,
//           display: `block`,
//           '&:hover': {
//             color: colors.darkWhite,
//             transform: `scale(1.03)`,
//           },
//         }}
//       >
//         <Img fluid={filename.image.fluid} />
//         <figcaption>
//           <div>
//             <h2
//               css={{
//                 letterSpacing: `.07rem`,
//               }}
//             >
//               {description}
//             </h2>

//             {linkLabel}
//             <br />
//             {title}
//           </div>
//         </figcaption>
//       </Link>
//     </figure>
//   </div>
// )
// Image.propTypes = {
//   key: PropTypes.string.isRequired,
//   filename: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   slug: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   linkLabel: PropTypes.string.isRequired,
// }

// const ImageList = map(Image)

// const RenderRow = images => (
//   <div
//     key={Math.random()}
//     css={{
//       display: `flex`,
//       justifyContent: `space-between`,
//       '& > div': {
//         margin: `.3rem`,
//         [media.greaterThan(`xsmall`)]: {
//           maxWidth: [`53%`, `53vw`],
//         },
//       },
//     }}
//   >
//     {ImageList(images)}
//   </div>
// )

// const getImageRows = ({ linkLabel, imagesPerRow }) =>
//   compose(
//     map(RenderRow),
//     chunk(imagesPerRow),
//     reduce((acc, { gallery, ...rest }) => {
//       gallery.forEach(x => {
//         acc.push({
//           ...x,
//           ...rest,
//         })
//       })
//       return acc
//     }, []),
//     map(compose(merge({ linkLabel }), path([`node`, `frontmatter`]))),
//     flatten
//   )

// const Images = ({ images, linkLabel, imagesPerRow }) => (
//   <div>{getImageRows({ linkLabel, imagesPerRow })(images)}</div>
// )
// Images.propTypes = {
//   images: PropTypes.array,
//   linkLabel: PropTypes.string,
//   imagesPerRow: PropTypes.number,
// }

// const GalleryPage = props => {
//   // const {
//   // first,
//   // index,
//   // last,
//   // next,
//   // pageNr,
//   // pagination,
//   // previous,
//   // slug,
//   // total,
//   // } = props.pageContext

//   const imagesPerRow = mediaQuery(`(min-width: 425px)`) ? 3 : 2

//   return (
//     <MainLayout
//       {...props}
//       wrapperStyles={{
//         width: [`100%`, `100vw`],
//         paddingLeft: `0`,
//         paddingRight: `0`,
//         [media.greaterThan(`medium`)]: {
//           paddingLeft: `2rem`,
//           paddingRight: `2rem`,
//         },
//       }}
//     >
//       {/* <Helmet>
//         {previous > 0 && (
//           <link rel="prev" href={`${slug}/${previous === 1 ? `` : previous}`} />
//         )}
//         {next > 0 && <link rel="next" href={`${slug}/${next}`} />}
//       </Helmet> */}

//       <Media
//         query="(max-width: 1024px)"
//         render={() => (
//           <p
//             css={{
//               textAlign: `center`,
//               marginTop: `-1rem`,
//             }}
//           >
//             {props.data.page.frontmatter.touchInfo}
//           </p>
//         )}
//       />

//       <Images
//         images={props.data.images.edges}
//         linkLabel={props.data.page.frontmatter.imageLinkLabel}
//         imagesPerRow={imagesPerRow}
//       />

//       {/* <Pager
//         next={next}
//         previous={previous}
//         slug={slug}
//         pagerNavAriaLabel={props.data.Paginator.frontmatter.pagerNavAriaLabel}
//         nextPageLabel={props.data.Paginator.frontmatter.nextPageLabel}
//         nextPageAriaLabel={props.data.Paginator.frontmatter.nextPageAriaLabel}
//         previousPageLabel={props.data.Paginator.frontmatter.previousPageLabel}
//         previousPageAriaLabel={
//           props.data.Paginator.frontmatter.previousPageAriaLabel
//         }
//       />

//       <Paginator
//         pagination={pagination}
//         pageNr={pageNr}
//         slug={slug}
//         paginationNavAriaLabel={
//           props.data.Paginator.frontmatter.paginationNavAriaLabel
//         }
//         currentAriaLabel={props.data.Paginator.frontmatter.currentAriaLabel}
//         pageNrAriaLabel={props.data.Paginator.frontmatter.pageNrAriaLabel}
//       /> */}
//     </MainLayout>
//   )
// }
// GalleryPage.propTypes = {
//   data: PropTypes.object,
//   pageContext: PropTypes.object,
// }
// export default GalleryPage

// export const query = graphql`
//   query($lang: String!, $slug: String!) {
//     ...siteData
//     ...SiteMeta
//     ...languages
//     ...homepage
//     ...menu
//     ...legal
//     ...Accounts
//     ...Paginator

//     page: javascriptFrontmatter(frontmatter: { slug: { eq: $slug } }) {
// ...PageTranslations
//       fields {
// url
//         translations {
// fields {
//   url
// }
//           frontmatter {
//             title
//             lang
//             slug
//           }
//         }
//       }
//       frontmatter {
//         title
//         lang
//         slug
//         touchInfo
//         imageLinkLabel
//         cover {
//           publicURL
//         }
//       }
//     }

//     images: allMarkdownRemark(
//       filter: { frontmatter: { lang: { eq: $lang }, published: { eq: true } } }
//       sort: { fields: [frontmatter___date], order: DESC }
//     ) {
//       edges {
//         node {
//           frontmatter {
//             title
//             slug
//             gallery {
//               description
//               filename {
//                 base
//                 aspectRatio
//                 image: childImageSharp {
//                   fluid(maxWidth: 600, quality: 75) {
//                     ...GatsbyImageSharpFluid
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `
