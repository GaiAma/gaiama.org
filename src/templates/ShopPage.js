/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import MainLayout from '@components/MainLayout'
import { useScript } from '../utils/use-script'
import GaiamaLoader from '@components/GaiamaLoader'

const ShopPage = props => {
  const {
    shopScript,
    fallbackLinkInfo,
    fallbackLinkUrl,
    fallbackLinkLabel,
  } = props.data.page.frontmatter

  const lang = props.data.languages.edges.find(
    x => x.node.frontmatter.id === props.pageContext.lang
  )
  const locale = lang?.node?.frontmatter?.lc || `en_US`

  /* global window */
  window.spread_shop_config = {
    shopName: `gaiama`,
    locale,
    prefix: `https://shop.spreadshirt.de`,
    baseId: `GaiAmaShop`,
  }

  useScript(shopScript)

  return (
    <MainLayout {...props}>
      <div
        id="GaiAmaShop"
        sx={{
          '.sprd-header__title.sprd__headline, .sprd-startpage-teaser, .sprd-startpage-preview-tiles__caption, .sprd-info-banner__link': {
            display: `none !important`,
          },
          a: {
            border: `none`,
          },
          'li + li': {
            marginTop: 0,
          },
          '.sprd-info-footer__open-shop': {
            padding: 0,
            ':hover': {
              background: `none`,
              color: `black`,
            },
          },
        }}
      >
        <div sx={{ textAlign: `center` }}>
          <GaiamaLoader
            sx={{ width: `5rem`, display: `block`, margin: `0 auto 5rem` }}
          />
          <p>{fallbackLinkInfo}</p>
          <a href={fallbackLinkUrl}>{fallbackLinkLabel}</a>
        </div>
      </div>
    </MainLayout>
  )
}

ShopPage.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object,
}

export default ShopPage

export const query = graphql`
  query($lang: String!, $slug: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...legal
    ...Accounts

    page: javascriptFrontmatter(
      frontmatter: { slug: { eq: $slug }, lang: { eq: $lang } }
    ) {
      ...PageTranslations
      frontmatter {
        title
        lang
        slug
        summary
        shopScript
        fallbackLinkInfo
        fallbackLinkUrl
        fallbackLinkLabel
      }
    }
  }
`
