import React from 'react'
import PropTypes from 'prop-types'
import MainLayout from '@/components/MainLayout'
import TitledCopy from '@/components/TitledCopy'
import { SupportWidget } from '@/components/Shared'

const DonatePage = props => {
  const { page } = props.data
  return (
    <MainLayout {...props}>
      <TitledCopy
        centered
        title={page.frontmatter.intro.title}
        paragraphs={page.frontmatter.intro.text}
        css={{ marginBottom: `2rem` }}
      />

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
        lang={props.pathContext.lang}
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
  pathContext: PropTypes.object.isRequired,
}
export default DonatePage

export const query = graphql`
  query DonatePageQuery($lang: String!, $slug: String!) {
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
          }
        }
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
      }
    }
  }
`
