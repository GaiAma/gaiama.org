import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
// import i18n from 'i18next'
// import { I18nextProvider, translate } from 'react-i18next'
import Header from '@/components/Header'
import ReferrerMessages from '@/components/ReferrerMessages'
import Footer from '@/components/Footer'
import QS from '@/utils/query-string'
import '@/utils/fontawesome'
import {
  media,
  screenReaderAndFocusable,
  focusOutlineNone,
  InstagramGradient,
  maxWidthLayout,
  maxWidthContent,
} from '@/theme'

import './fragments'
import 'typeface-amatic-sc'
import 'typeface-quicksand'

const isDev = process.env.NODE_ENV === `development`

const globalPolyfills = [
  // `IntersectionObserver`,
  `default`,
  `Symbol`,
]

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
      to: node.frontmatter.slug,
    }))

const generateMetaMenu = ({ translations, getLang, menuItems }) =>
  translations
    .map(x => ({
      ...getLang(x.frontmatter.lang),
      to: x.frontmatter.slug,
    }))
    .concat(
      menuItems
        .filter(x => x.node.frontmatter.menu === `meta`)
        .map(({ node }) => ({
          title: node.frontmatter.title,
          titleShort: node.frontmatter.titleShort,
          icon: node.frontmatter.icon,
          to: node.frontmatter.slug,
        }))
    )

// const getI18nStore = (lang, messages) => ({
//   [lang]: { translations: messages }
// })

const getTranslations = page =>
  [
    ...(page.fields.translations || []),
    {
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
    pathContext: PropTypes.object,
    localPolyfills: PropTypes.array,
    cover: PropTypes.string,
  }

  static defaultProps = {
    wrapperStyles: {},
    pathContext: {
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
      pathContext,
      wrapperStyles,
      data: { site, SiteMeta, languages, homepage, page, menu },
      localPolyfills,
      cover,
    } = this.props

    const lang = pathContext.lang
    // const i18nStore = getI18nStore(lang, pathContext.messages)
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

    const polyfills = [...globalPolyfills, ...localPolyfills]

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
          <meta name="msapplication-TileColor" content="#a4fcfb" />
          <meta name="theme-color" content="#ffffff" />

          {/* <meta name="msapplication-config" content="browserconfig.xml" /> */}

          {/* facebook */}
          <meta property="og:site_name" content={site.siteMetadata.title} />
          <meta
            property="og:url"
            content={`${site.siteMetadata.siteUrl}${page.frontmatter.slug}`}
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
          <meta
            property="og:description"
            content={page.frontmatter.summary || page.frontmatter.excerpt}
          />
          {(cover ||
            (page.frontmatter.cover && page.frontmatter.cover.publicURL)) &&
            [`og:image`, `image`].map(x => (
              <meta
                property={x}
                key={cover || page.frontmatter.cover.publicURL}
                content={cover || page.frontmatter.cover.publicURL}
              />
            ))}
          {/* <meta property="og:image:width" content="1200"> */}
          {/* <meta property="og:image:height" content="628"> */}
          {/* <meta property="og:image:alt" content={`A shiny red apple with a bite taken out`} /> */}

          {/* twitter */}
          <meta
            property="twitter:site"
            content={
              this.props.data.Accounts.frontmatter.accounts.find(
                x => x.service === `twitter`
              ).handle
            }
          />
          <meta name="twitter:card" content="summary_large_image" />

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
          {!isDev && (
            <script
              src={`https://cdn.polyfill.io/v2/polyfill.min.js?features=${polyfills.join(
                `,`
              )}`}
            />
          )}
          <html lang={lang} />
          {/* <body className={slugify(page.frontmatter.slug)} /> */}
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
          homepage={homepage.frontmatter}
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
          metaTitle={SiteMeta.frontmatter.footer.metaTitle}
          meta={SiteMeta.frontmatter.footer.meta}
          legal={this.props.data.legal.edges}
          bgImage={SiteMeta.frontmatter.assets.headerBg.image}
          accounts={this.props.data.Accounts}
        />

        <InstagramGradient />
      </div>
      // </I18nextProvider>
    )
  }
}

// export default translate(`translations`, { i18n })(MainLayout)
export default MainLayout

// const globalStyles = {
//   // fontFamily: fontFamilies.main,
//   // fontWeight: 100,

//   '& a': {
//     color: colors.link,
//     textDecoration: `none`,

//     '&:hover': {
//       color: colors.linkHover,
//       textDecoration: `none`,
//     },
//   },

//   // '& h1, & h2, & h3, & h4, & h5, & h6': {
//   //   fontFamily: fontFamilies.accent,
//   //   fontWeight: 400,
//   //   letterSpacing: `.09rem`,
//   //   lineHeight: 1.1,
//   // },

//   // '& h1, & h2': {
//   //   fontSize: `1.5rem`,

//   //   // [breakPoints.minMd]: {
//   //   //   fontSize: `2.5rem`,
//   //   // },
//   // },

//   // 'main': {
//   //   minHeight: `50vh`,
//   //   margin: `1rem`,
//   // },

//   // 'figure': {
//   //   boxShadow: `2px 2px 9px 1px rgba(0, 0, 0, .5)`
//   // },

//   // 'img': {
//   //   maxWidth: `100%`,
//   //   height: `auto`,
//   // },

//   // 'floatLeft': {
//   //   float: `left`,
//   //   margin: `0 1rem 1rem 0`,
//   // },
// }
