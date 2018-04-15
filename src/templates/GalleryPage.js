import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import chunk from 'lodash/fp/chunk'
import compose from 'ramda/src/compose'
import map from 'ramda/src/map'
import prop from 'ramda/src/prop'
import merge from 'ramda/src/merge'
import MainLayout from '@/components/MainLayout'
import { ReactMedia } from '@/components/MediaQuery'
import { Pager, Paginator } from '@/components/Paginator'
import { colors, gradients, media } from '@/theme'

const Image = ({
  key,
  aspect_ratio,
  filename,
  description,
  article,
  linkLabel,
}) => (
  <div key={key} css={{ flex: aspect_ratio }}>
    <figure
      css={{
        margin: 0,
        '& a': {
          display: `block`,
          position: `relative`,
        },
        '& figcaption': {
          display: `none`,
          background: gradients.primary,
          position: `absolute`,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          color: colors.darkWhite,
          padding: `.8rem`,
          justifyContent: `center`,
          alignItems: `center`,
          textAlign: `center`,
          overflow: `hidden`,
          transition: `all .35s`,
          opacity: 0,
          [media.greaterThan(`medium`)]: {
            display: `flex`,
          },
        },
        '&:hover figcaption': {
          opacity: 1,
        },
      }}
    >
      <Link
        role="link"
        to={article.slug}
        css={{
          color: colors.darkWhite,
          display: `block`,
          '&:hover': {
            color: colors.darkWhite,
            transform: `scale(1.03)`,
          },
        }}
      >
        <Img sizes={filename.image.sizes} />
        <figcaption>
          <div>
            <h2
              css={{
                letterSpacing: `.07rem`,
              }}
            >
              {description}
            </h2>
            
            {linkLabel}<br/>
            {article.title}
          </div>
        </figcaption>
      </Link>
    </figure>
  </div>
)
Image.propTypes = {
  key: PropTypes.string.isRequired,
  aspect_ratio: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  article: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired,
}

const ImageList = map(Image)

const RenderRow = images => (
  <div
    key={Math.random()}
    css={{
      display: `flex`,
      justifyContent: `space-between`,
      '& > div': {
        margin: `.3rem`,
      },
    }}
  >
    {ImageList(images)}
  </div>
)

const getImageRows = linkLabel => compose(
  map(RenderRow),
  chunk(3),
  map(
    compose(
      merge({ linkLabel }),
      prop(`node`)
    )
  )
)

const Images = ({ images, linkLabel }) => <div>{getImageRows(linkLabel)(images)}</div>
Images.propTypes = {
  images: PropTypes.array,
  linkLabel: PropTypes.string,
}

const GalleryPage = props => {
  const {
    // first,
    // index,
    // last,
    next,
    pageNr,
    pagination,
    previous,
    slug,
    // total,
  } = props.pathContext

  return (
    <MainLayout
      {...props}
      wrapperStyles={{
        width: [`100%`, `100vw`],
        paddingLeft: `0`,
        paddingRight: `0`,
        [media.greaterThan(`medium`)]: {
          paddingLeft: `2rem`,
          paddingRight: `2rem`,
        },
      }}
    >
      <Helmet>
        {previous > 0 && (
          <link rel="prev" href={`${slug}/${previous === 1 ? `` : previous}`} />
        )}
        {next > 0 && <link rel="next" href={`${slug}/${next}`} />}
      </Helmet>

      <ReactMedia
        mq="(max-width: 1024px)"
        onMatch={() => (
          <p
            css={{
              textAlign: `center`,
            }}
          >
            {props.data.page.frontmatter.touchInfo}
          </p>
        )}
      />

      <Images
        images={props.data.images.edges}
        linkLabel={props.data.page.frontmatter.imageLinkLabel}
      />

      <Pager
        next={next}
        previous={previous}
        slug={slug}
        pagerNavAriaLabel={props.data.Paginator.frontmatter.pagerNavAriaLabel}
        nextPageLabel={props.data.Paginator.frontmatter.nextPageLabel}
        nextPageAriaLabel={props.data.Paginator.frontmatter.nextPageAriaLabel}
        previousPageLabel={props.data.Paginator.frontmatter.previousPageLabel}
        previousPageAriaLabel={props.data.Paginator.frontmatter.previousPageAriaLabel}
      />

      <Paginator
        pagination={pagination}
        pageNr={pageNr}
        slug={slug}
        paginationNavAriaLabel={props.data.Paginator.frontmatter.paginationNavAriaLabel}
        currentAriaLabel={props.data.Paginator.frontmatter.currentAriaLabel}
        pageNrAriaLabel={props.data.Paginator.frontmatter.pageNrAriaLabel}
      />
    </MainLayout>
  )
}
GalleryPage.propTypes = {
  data: PropTypes.object,
  pathContext: PropTypes.object,
}
export default GalleryPage

export const query = graphql`
  query GalleryPageQuery(
    $lang: String!
    $slug: String!
    $limit: Int!
    $skip: Int!
  ) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...Paginator

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
        touchInfo
        imageLinkLabel
      }
    }

    images: allGalleryJson(
      filter: { lang: { eq: $lang } }
      sort: { fields: [date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          lang
          key
          article {
            title
            slug
          }
          description
          ext
          aspect_ratio
          filename {
            base
            image: childImageSharp {
              sizes {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
      }
    }
  }
`
