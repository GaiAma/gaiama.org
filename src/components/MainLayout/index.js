/* global document window */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import { Global, css } from '@emotion/core'
import { ToastContainer } from 'react-toastify'
// import i18n from 'i18next'
// import { I18nextProvider, translate } from 'react-i18next'
import Header from '@components/Header'
import ReferrerMessages from '@components/ReferrerMessages'
import Footer from '@components/Footer'
import * as QS from '@gaiama/query-string'
import '@src/utils/fontawesome'
import {
  // colors,
  media,
  screenReaderAndFocusable,
  focusOutlineNone,
  InstagramGradient,
  maxWidthLayout,
  maxWidthContent,
} from '@src/theme'
import { globalStyles } from './global.js'

import './fragments'
import 'react-toastify/dist/ReactToastify.css'
// import { CookieBanner } from '@components/CookieBanner.js'

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
    .map(x => (x.fields ? x : { frontmatter: {}, fields: {} }))
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

// const injectGTMCode = () => {
//   const gtm = document.createElement(`script`)
//   gtm.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
// new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
// j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
// 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
// })(window,document,'script','dataLayer','GTM-P2HCKV6');`
//   document.head.insertBefore(gtm, document.head.children[1])
// }

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

    window.onappinstalled = handleInstall

    if (typeof window !== `undefined`) {
      window.GaiAma = {
        ...window.GaiAma,
        accounts: this.props.data.Accounts.frontmatter.accounts,
      }
    }
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
    const translations = page.fields.translations
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
        css={css`
          width: 100%;
          width: 100vw;
          ${maxWidthLayout};
          margin: 0 auto;
          word-break: keep-all;
        `}
      >
        <Helmet
          titleTemplate={`%s ♡ ${site.siteMetadata.title}`}
          defaultTitle={page.frontmatter.title}
        >
          <title>{page.frontmatter.title}</title>
          <meta
            name="description"
            itemProp="description"
            content={page.frontmatter.summary || page.frontmatter.excerpt}
          />
          <meta
            name="apple-mobile-web-app-title"
            content={site.siteMetadata.title}
          />
          <meta name="application-name" content={site.siteMetadata.title} />

          <meta property="og:site_name" content={site.siteMetadata.title} />
          <meta
            property="og:url"
            content={`${site.siteMetadata.siteUrl}${page.fields.url}`}
          />
          <meta property="og:locale" content={getLang(lang).lc} />
          {getLang(lang, true).map(x => (
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
          <meta property="twitter:site" content="hellogaiama" />
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

        <Global styles={css(globalStyles)} />

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
          css={css`
            ${focusOutlineNone};
            margin: 0 auto;
            padding: 3rem 0 1.45rem;
            width: ${!wrapperStyles.width && `98%`};
            ${maxWidthContent};
            ${media.greaterThan(`medium`)} {
              width: ${!wrapperStyles.width && `90%`};
            }
            ${wrapperStyles};
          `}
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
          info={SiteMeta.code.body}
          sponsors={SiteMeta.frontmatter.sponsors}
        />

        {/* <CookieBanner onAccept={injectGTMCode}>
          {({ setAccept, setReject }) => (
            <div
              css={css`
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                color: #fff;
                background: ${colors.primaryLite};
                padding: 1rem;
                z-index: 10;
                display: flex;
                align-content: center;
                justify-content: space-between;
              `}
            >
              <div>
                Cookie Banner
                <span
                  css={css`
                    font-size: smaller;
                  `}
                >
                  <Link to="/datenschutz">Datenschutz</Link>
                </span>
              </div>
              <div>
                <button onClick={setReject}>Reject</button>
                <button onClick={setAccept}>Accept</button>
              </div>
            </div>
          )}
        </CookieBanner> */}

        <InstagramGradient />
        <ToastContainer position="bottom-right" />
      </div>
      // </I18nextProvider>
    )
  }
}

// export default translate(`translations`, { i18n })(MainLayout)
export default MainLayout
