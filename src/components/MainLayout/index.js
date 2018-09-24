import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { injectGlobal } from 'emotion'
import { ToastContainer } from 'react-toastify'
// import i18n from 'i18next'
// import { I18nextProvider, translate } from 'react-i18next'
import Header from '@/components/Header'
import ReferrerMessages from '@/components/ReferrerMessages'
import Footer from '@/components/Footer'
import * as QS from '@/utils/query-string'
import '@/utils/fontawesome'
import {
  colors,
  media,
  screenReaderAndFocusable,
  focusOutlineNone,
  InstagramGradient,
  maxWidthLayout,
  maxWidthContent,
} from '@/theme'

import './fragments'
import 'react-toastify/dist/ReactToastify.css'
// import 'typeface-amatic-sc'
// import 'typeface-quicksand'

// TODO: add PR to gatsby-remark-autolink-headers to disable floating
// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-autolink-headers/src/gatsby-ssr.js#L10
injectGlobal(`
  .anchor {
    float: none;
  }
  #nprogress .bar {
    height: 5px !important;
  }
`)

// const isDev = process.env.NODE_ENV === `development`

// const globalPolyfills = [
//   // `IntersectionObserver`,
//   `default`,
//   `Symbol`,
// ]

const getLangFactory = languages => (lang, alternate = false) => {
  if (alternate) {
    const alternates = languages.filter(l => l.node.frontmatter.id !== lang)
    return alternates ? alternates.map(x => x.node.frontmatter) : []
  }
  const _lang = languages.find(l => l.node.frontmatter.id === lang)
  return _lang ? _lang.node.frontmatter : {}
}

const generateMainMenu = items =>
  items
    .filter(({ node }) => node.frontmatter.menu === `main`)
    .map(({ node }) => ({
      title: node.frontmatter.title,
      titleShort: node.frontmatter.titleShort,
      to: node.fields.url,
    }))

const generateMetaMenu = ({ translations, getLang, menuItems }) =>
  translations
    .map(x => {
      if (!x) {
        console.log(`THE_X`)
        console.log(x)
      }
      return x || { frontmatter: {}, fields: {} }
    })
    .map(x => ({
      ...getLang(x.frontmatter.lang),
      to: x.fields.url,
    }))
    .concat(
      menuItems
        .filter(x => x.node.frontmatter.menu === `meta`)
        .map(({ node }) => ({
          title: node.frontmatter.title,
          titleShort: node.frontmatter.titleShort,
          icon: node.frontmatter.icon,
          to: node.fields.url,
        }))
    )

// const getI18nStore = (lang, messages) => ({
//   [lang]: { translations: messages }
// })

const getTranslations = page =>
  [
    ...(page.fields.translations || []),
    {
      fields: {
        url: page.fields.url,
      },
      frontmatter: {
        lang: page.frontmatter.lang,
        slug: page.frontmatter.slug,
        title: page.frontmatter.title,
      },
    },
  ].sort(
    (a, b) =>
      a.frontmatter.lang < b.frontmatter.lang
        ? -1
        : a.frontmatter.lang > b.frontmatter.lang
          ? 1
          : 0
  )

// i18n.init({
//   initImmediate: false,
//   fallbackLng: `en`,
//   ns: [`translations`],
//   defaultNS: `translations`,
//   debug: false,
//   interpolation: {
//     escapeValue: false,
//   },
//   react: {
//     wait: false,
//     bindI18n: false,
//     bindStore: false,
//   },
// })

class MainLayout extends Component {
  static propTypes = {
    data: PropTypes.object,
    wrapperStyles: PropTypes.object,
    pageContext: PropTypes.object,
    localPolyfills: PropTypes.array,
    cover: PropTypes.string,
    location: PropTypes.object,
  }

  static defaultProps = {
    wrapperStyles: {},
    pageContext: {
      lang: `en`,
    },
  }

  componentDidMount() {
    function handleInstall(event) {
      console.log(`Thank you for installing our app!`, event)
    }

    /* eslint-disable-next-line no-undef */
    window.onappinstalled = handleInstall
  }

  render() {
    process.env.NODE_ENV !== `production` && console.log(this.props)
    const {
      pageContext,
      wrapperStyles,
      data: { site, SiteMeta, languages, homepage, page, menu },
      // localPolyfills,
      location,
    } = this.props

    const lang = pageContext.lang
    // const i18nStore = getI18nStore(lang, pageContext.messages)
    const translations = getTranslations(page)
    const getLang = getLangFactory(languages.edges)
    const menuItems = menu.edges || []
    const mainMenu = generateMainMenu(menuItems)
    const metaMenu = generateMetaMenu({
      translations,
      getLang,
      menuItems,
    })
    const urlParams = QS.parse()

    // const polyfills = [...globalPolyfills, ...localPolyfills]

    const cover = `${site.siteMetadata.siteUrl}${this.props.cover ||
      (page.frontmatter.cover && page.frontmatter.cover.publicURL) ||
      SiteMeta.frontmatter.assets.globalCover.publicURL}`

    return (
      // <I18nextProvider //   i18n={i18n} //   initialLanguage={lang} //   initialI18nStore={i18nStore} // >
      <div
        css={{
          width: [`100%`, `100vw`],
          ...maxWidthLayout,
          margin: `0 auto`,
          wordBreak: `keep-all`,
        }}
      >
        <Helmet
          titleTemplate={`%s - ${site.siteMetadata.title}`}
          defaultTitle={page.frontmatter.title}
        >
          <title>{page.frontmatter.title}</title>
          <meta
            name="description"
            itemProp="description"
            content={page.frontmatter.summary || page.frontmatter.excerpt}
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png?v=1"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png?v=1"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png?v=1"
          />
          <link rel="manifest" href="/site.webmanifest?v=1" />
          <link rel="shortcut icon" href="/favicon.ico?v=1" />
          <meta
            name="apple-mobile-web-app-title"
            content={site.siteMetadata.title}
          />
          <meta name="application-name" content={site.siteMetadata.title} />
          <meta name="msapplication-TileColor" content={colors.primaryLite} />
          <meta name="theme-color" content={colors.primaryLite} />

          {/* <meta name="msapplication-config" content="browserconfig.xml" /> */}

          {/* facebook */}
          <meta property="og:site_name" content={site.siteMetadata.title} />
          <meta
            property="og:url"
            content={`${site.siteMetadata.siteUrl}${page.fields.url}`}
          />
          <meta
            property="og:locale"
            content={getLang(page.frontmatter.lang).lc}
          />
          {getLang(page.frontmatter.lang, true).map(x => (
            <meta property="og:locale:alternate" content={x.lc} key={x.lc} />
          ))}
          <meta
            property="og:title"
            content={`${page.frontmatter.title} - ${site.siteMetadata.title}`}
          />
          <meta property="og:type" content="website" />
          <meta property="fb:admins" content="100000166597534" />
          <meta
            property="og:description"
            content={page.frontmatter.summary || page.frontmatter.excerpt}
          />
          {[`og:image`, `image`].map(x => (
            <meta property={x} key={x} content={cover} />
          ))}
          {/* <meta property="og:image:width" content="1200"> */}
          {/* <meta property="og:image:height" content="628"> */}
          {/* <meta property="og:image:alt" content={`A shiny red apple with a bite taken out`} /> */}

          {/* twitter */}
          {/* <meta
            property="twitter:site"
            content={
              `hellogaiama`
              // this.props.data.Accounts.frontmatter.accounts.find(
              //   x => x.service === `twitter`
              // ).handle
            }
          /> */}
          <meta name="twitter:card" content="summary_large_image" />

          {[`/en`, `/de`].includes(location.pathname) && (
            <link
              rel="alternate"
              href={site.siteMetadata.siteUrl}
              hrefLang="x-default"
            />
          )}
          {translations.map(({ frontmatter: t }) => (
            <link
              rel="alternate"
              href={`${site.siteMetadata.siteUrl}${t.slug}`}
              hrefLang={t.lang}
              key={t.lang}
            />
          ))}
          {[`atom.xml`, `rss.xml`, `feed.json`].map(feed => (
            <link
              rel="alternate"
              href={`${site.siteMetadata.siteUrl}/${lang}/blog/${feed}`}
              type={
                feed.includes(`json`)
                  ? `application/json`
                  : `application/rss+xml`
              }
              key={feed}
            />
          ))}
          {/* {!isDev && (
            <script
              src={`https://cdn.polyfill.io/v2/polyfill.min.js?features=${polyfills.join(
                `,`
              )}`}
            />
          )} */}
          <html lang={lang} />
          {/* <body className={slugify(page.fields.url)} /> */}
        </Helmet>

        <a href="#main" css={screenReaderAndFocusable}>
          {SiteMeta.frontmatter.skipLinks.toContent}
        </a>
        <a href="#main-nav" css={screenReaderAndFocusable}>
          {SiteMeta.frontmatter.skipLinks.toNav}
        </a>

        {urlParams.ref && (
          <ReferrerMessages urlParams={urlParams} lang={lang} />
        )}

        <Header
          homepage={homepage}
          meta={metaMenu}
          menu={mainMenu}
          logo={SiteMeta.frontmatter.assets.logo.image}
          bgImage={SiteMeta.frontmatter.assets.headerBg.image}
        />

        <main
          id="main"
          tabIndex="-1"
          css={{
            ...focusOutlineNone,
            margin: `0 auto`,
            // padding: `3rem .8rem 1.45rem`,
            padding: `3rem 0 1.45rem`,
            width: !wrapperStyles.width && `98%`,
            ...maxWidthContent,
            [media.greaterThan(`medium`)]: {
              width: !wrapperStyles.width && `90%`,
            },
            ...wrapperStyles,
          }}
        >
          {this.props.children}
        </main>

        <Footer
          menu={mainMenu.concat(metaMenu.reverse())}
          menuTitle={SiteMeta.frontmatter.footer.menuTitle}
          socialTitle={SiteMeta.frontmatter.footer.socialTitle}
          supportTitle={SiteMeta.frontmatter.footer.supportTitle}
          legal={this.props.data.legal.edges}
          bgImage={SiteMeta.frontmatter.assets.headerBg.image}
          accounts={this.props.data.Accounts}
          info={SiteMeta.htmlAst}
        />

        <InstagramGradient />
        <ToastContainer position="bottom-right" />
      </div>
      // </I18nextProvider>
    )
  }
}

// export default translate(`translations`, { i18n })(MainLayout)
export default MainLayout
