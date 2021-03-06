/** @jsx jsx */
/* global window, navigator */
// eslint-disable-next-line no-unused-vars
import { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { jsx, useColorMode } from 'theme-ui'
import Helmet from 'react-helmet'
import { Global, css } from '@emotion/core'
import { ToastContainer } from 'react-toastify'
// import i18n from 'i18next'
// import { I18nextProvider, translate } from 'react-i18next'
import Header from '@components/Header'
import ReferrerMessages from '@components/ReferrerMessages'
import Footer from '@components/Footer'
import * as QS from '@gaiama/query-string'
import { toast } from '@src/utils/toast.js'
import '@src/utils/fontawesome'
import {
  media,
  screenReaderAndFocusable,
  focusOutlineNone,
  InstagramGradient,
  maxWidthContent,
} from '@src/theme'
import { globalStyles } from './global.js'

import './fragments'
import 'react-toastify/dist/ReactToastify.css'
import { getCookie, setCookie } from '@src/utils/cookie.js'
// import { CookieBanner } from '@components/CookieBanner.js'

// const isDev = process.env.NODE_ENV === `development`

// const globalPolyfills = [
//   // `IntersectionObserver`,
//   `default`,
//   `Symbol`,
// ]

// based on https://stackoverflow.com/a/52112155/3484824
const getNavigatorLanguage = () => {
  let lang = ``
  if (navigator.languages && navigator.languages.length) {
    lang = navigator.languages[0]
  } else {
    lang =
      navigator.userLanguage ||
      navigator.language ||
      navigator.browserLanguage ||
      `en`
  }
  return lang.includes(`-`) ? lang.split(`-`)[0] : lang
}

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

const isDev = process.env.NODE_ENV !== `production`

const MainLayout = props => {
  const [colorMode, setColorMode] = useColorMode()
  const {
    pageContext,
    wrapperStyles,
    data: { site, SiteMeta, languages, homepage, page, menu },
    // localPolyfills,
    // location,
  } = props
  const lang = pageContext.lang
  const translations = page.fields.translations
  const alternate = translations.find(x => x.id !== lang)

  useEffect(() => {
    const storedLang = getCookie(`nf_lang`)
    if (storedLang === lang) return

    const navigatorLang = getNavigatorLanguage()

    if (navigatorLang !== lang) {
      toast.warning(
        <Fragment>
          <div sx={{ color: `black`, fontWeight: 500 }}>
            <span>{SiteMeta.frontmatter.langToast.prefix}</span>
            <span sx={{ mx: 1 }}>{alternate.title}?</span>
            <span sx={{ textDecoration: `underline` }}>
              {SiteMeta.frontmatter.langToast.suffix}
            </span>
          </div>
        </Fragment>,
        {
          autoClose: 25000,
          closeOnClick: false,
          onClick: () => {
            setCookie(`nf_lang`, alternate.id)
            window.location.replace(alternate.to)
          },
          onClose: () => {
            setCookie(`nf_lang`, lang)
          },
        }
      )
    }
  }, [lang, alternate, SiteMeta.frontmatter.langToast])

  useEffect(() => {
    function handleInstall(event) {
      console.log(`Thank you for installing our app!`, event)
    }

    window.onappinstalled = handleInstall

    if (typeof window !== `undefined`) {
      window.GaiAma = {
        ...window.GaiAma,
        accounts: props.data.Accounts.frontmatter.accounts,
      }
    }
  }, [props.data.Accounts.frontmatter.accounts])

  isDev && console.log(`DEVMODE`, props)

  // const i18nStore = getI18nStore(lang, pageContext.messages)
  const getLang = getLangFactory(languages.edges)
  const menuItems = menu.edges || []
  const mainMenu = generateMainMenu(menuItems)
  const metaMenu = generateMetaMenu({
    translations,
    getLang,
    menuItems,
  })
  const urlParams = QS.parse()
  const translationEn = translations.find(t => t.frontmatter.lang === `en`)

  // const polyfills = [...globalPolyfills, ...localPolyfills]

  const cover = `${site.siteMetadata.siteUrl}${props.cover ||
    page.frontmatter?.cover?.publicURL ||
    SiteMeta.frontmatter.assets.globalCover.publicURL}`

  return (
    // <I18nextProvider //   i18n={i18n} //   initialLanguage={lang} //   initialI18nStore={i18nStore} // >
    <Fragment>
      <Helmet
        titleTemplate={`%s ♡ ${site.siteMetadata.title}`}
        defaultTitle={page.frontmatter.title}
      >
        <title>{page.frontmatter.title}</title>
        {/* TODO: SVG favicons https://twitter.com/JoshWComeau/status/1241887478627303432 */}
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

        <link
          rel="sitemap"
          type="application/xml"
          href={`/${lang}/sitemap.xml`}
        />

        <link
          rel="alternate"
          href={site.siteMetadata.siteUrl + translationEn.fields.url}
          hrefLang="x-default"
        />
        {translations.map(({ frontmatter: t, fields }) => (
          <link
            rel="alternate"
            href={`${site.siteMetadata.siteUrl}${fields.url}`}
            hrefLang={t.lang}
            key={t.lang}
          />
        ))}
        {/* {[`atom.xml`, `rss.xml`, `feed.json`].map(feed => (
          <link
            rel="alternate"
            href={`${site.siteMetadata.siteUrl}/${lang}/blog/${feed}`}
            type={
              feed.includes(`json`) ? `application/json` : `application/rss+xml`
            }
            key={feed}
          />
        ))} */}
        {/* {!isDev && (<script src={`https://cdn.polyfill.io/v2/polyfill.min.js?features=${polyfills.join(`,`)}`}/>)} */}
        {!isDev && (
          <script
            src={`https://polyfill.io/v3/polyfill.min.js?features=Object.assign`}
          />
        )}
        <html lang={lang} />
      </Helmet>

      <Global styles={globalStyles} />

      <a href="#main" css={screenReaderAndFocusable}>
        {SiteMeta.frontmatter.skipLinks.toContent}
      </a>
      <a href="#main-nav" css={screenReaderAndFocusable}>
        {SiteMeta.frontmatter.skipLinks.toNav}
      </a>

      {urlParams.ref && <ReferrerMessages urlParams={urlParams} lang={lang} />}

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
        sx={{
          ...focusOutlineNone,
          margin: `0 auto`,
          padding: `3rem 0 1.45rem`,
          width: !wrapperStyles.width && `98%`,
          ...maxWidthContent,
          [media.greaterThan(`medium`)]: {
            width: !wrapperStyles.width && `90%`,
          },
          ...wrapperStyles,
        }}
      >
        {props.children}
      </main>

      <Footer
        menu={mainMenu.concat(metaMenu.reverse())}
        menuTitle={SiteMeta.frontmatter.footer.menuTitle}
        socialTitle={SiteMeta.frontmatter.footer.socialTitle}
        supportTitle={SiteMeta.frontmatter.footer.supportTitle}
        legal={props.data.legal.edges}
        bgImage={SiteMeta.frontmatter.assets.headerBg.image}
        accounts={props.data.Accounts}
        info={SiteMeta.body}
        sponsors={SiteMeta.frontmatter.sponsors}
      />

      {isDev && (
        <div
          css={css`
            position: fixed;
            bottom: 1rem;
            left: 1rem;
            font-size: 0.5rem;
          `}
        >
          <button
            onClick={() =>
              setColorMode(colorMode === `dark` ? `light` : `dark`)
            }
          >
            Toggle Theme
          </button>
        </div>
      )}

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
      <ToastContainer position="top-center" />
    </Fragment>
    // </I18nextProvider>
  )
}

MainLayout.propTypes = {
  data: PropTypes.object,
  wrapperStyles: PropTypes.object,
  pageContext: PropTypes.object,
  localPolyfills: PropTypes.array,
  cover: PropTypes.string,
  location: PropTypes.object,
}

MainLayout.defaultProps = {
  wrapperStyles: {},
  pageContext: {
    lang: `en`,
  },
}

// export default translate(`translations`, { i18n })(MainLayout)
export default MainLayout
