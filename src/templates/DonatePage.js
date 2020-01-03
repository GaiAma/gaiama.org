/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'
import { media } from '@src/theme'
import MainLayout from '@components/MainLayout'
import { SupportWidget } from '@components/Shared'

const calcTotalAmount = x =>
  x.edges.reduce((acc, val) => acc + val.node.item.amount, 0).toFixed()

const DonatePage = props => {
  const { page, contributions } = props.data
  return (
    <MainLayout {...props}>
      <div
        sx={{
          display: `flex`,
          flexDirection: `column-reverse`,
          justifyContent: `space-between`,
          maxWidth: `950px`,
          margin: `0 auto 2rem`,
          [media.greaterThan(`medium`)]: {
            flexDirection: `row`,
          },
        }}
      >
        <Img
          fluid={page.frontmatter.image.file.image.fluid}
          sx={{
            width: `100%`,
            margin: `2rem auto 0`,
            [media.greaterThan(`medium`)]: {
              marginRight: `1rem`,
              maxWidth: `56%`,
            },
          }}
        />

        <div>
          <h1>{page.frontmatter.intro.title}</h1>
          <div>
            {page.frontmatter.intro.text.map(x => (
              <div
                key={x}
                dangerouslySetInnerHTML={{ __html: x }}
                sx={{ lineHeight: `1.8rem` }}
              />
            ))}
          </div>
          {/* <div
            sx={{ marginTop: `1rem` }}
            dangerouslySetInnerHTML={{
              __html: page.frontmatter.contributorInfo.replace(
                `[[amount]]`,
                calcTotalAmount(contributions)
              ),
            }}
          /> */}
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
        sx={{ margin: `0 0 3rem` }}
      />
    </MainLayout>
  )
}
DonatePage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.object,
    contributions: PropTypes.object,
    SiteMeta: PropTypes.object,
    SupportWidget: PropTypes.object,
  }),
  pageContext: PropTypes.object.isRequired,
}
export default DonatePage

export const query = graphql`
  query($lang: String!, $url: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...legal
    ...Accounts
    ...SupportWidget

    page: mdx(fields: { url: { eq: $url } }) {
      ...MdxTranslations
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
        contributorInfo
        image {
          file {
            image: childImageSharp {
              fluid(maxWidth: 950, quality: 75) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }

    contributions: allGaiamaDonation {
      edges {
        node {
          item {
            amount
          }
        }
      }
    }
  }
`
