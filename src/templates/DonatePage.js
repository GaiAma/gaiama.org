import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { media } from '@/theme'
import MainLayout from '@/components/MainLayout'
import TitledCopy from '@/components/TitledCopy'
import { SupportWidget } from '@/components/Shared'

const DonatePage = props => {
  const { page } = props.data
  return (
    <MainLayout {...props}>
      <div
        css={`
          display: flex;
          flex-direction: column-reverse;
          justify-content: space-between;
          max-width: 950px;
          margin: 0 auto 2rem;
          ${media.greaterThan(`medium`)} {
            flex-direction: row;
          }
        `}
      >
        <Img
          fluid={page.frontmatter.image.image.fluid}
          css={`
            width: 100%;
            margin: 2rem auto 0;
            ${media.greaterThan(`medium`)} {
              margin-right: 1rem;
              max-width: 60%;
            }
          `}
        />

        <div>
          <h1>{page.frontmatter.intro.title}</h1>
          {page.frontmatter.intro.text.map(x => (
            <div
              key={x}
              dangerouslySetInnerHTML={{ __html: x }}
              css={`
                line-height: 1.8rem;
              `}
            />
          ))}
        </div>
      </div>

      <SupportWidget
        title={page.frontmatter.donationTitle}
        description={page.frontmatter.donationDescr}
        paypalButton={
          props.data.SiteMeta.frontmatter.assets.paypalButton.publicURL
        }
        bankButton={props.data.SupportWidget.frontmatter.bankButton}
        bankButtonAlt={props.data.SupportWidget.frontmatter.bankButtonAlt}
        bankInfo={props.data.SupportWidget.frontmatter.bankInfo}
        bankDetails={props.data.SupportWidget.frontmatter.bankDetails}
        lang={props.pageContext.lang}
        css={{ margin: `0 0 3rem` }}
      />
    </MainLayout>
  )
}
DonatePage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.object,
    SiteMeta: PropTypes.object,
    SupportWidget: PropTypes.object,
  }),
  pageContext: PropTypes.object.isRequired,
}
export default DonatePage

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

    page: javascriptFrontmatter(frontmatter: { slug: { eq: $slug } }) {
      ...PageTranslations
      fields {
        url
      }
      frontmatter {
        title
        lang
        slug
        summary
        intro {
          title
          text
        }
        donationTitle
        donationDescr
        image {
          image: childImageSharp {
            fluid(maxWidth: 950, quality: 75) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
