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
  breakPoints,
  screenReaderAndFocusable,
  focusOutlineNone,
  InstagramGradient,
} from '@/theme'

import './fragments'
import 'typeface-amatic-sc'
import 'typeface-quicksand'

const isDev = process.env.NODE_ENV === `development`

const getLangFactory = languages => lang => {
  const _lang = languages.find(l => l.node.frontmatter.id === lang)
  return _lang ? _lang.node.frontmatter : {}
}
const generateMainMenu = items =>
  items
    .filter(({ node }) => node.frontmatter.menu === `main`)
    .map(({ node }) => ({
      title: node.frontmatter.title,
      to: node.frontmatter.slug,
    }))

const generateMetaMenu = ({ translations, getLang, menuItems }) =>
  translations.map(
    x => (
      {
        ...getLang(x.frontmatter.lang),
        to: x.frontmatter.slug,
      }
    )
  )
  .concat(
    menuItems
      .filter(x => x.node.frontmatter.menu === `meta`)
      .map(
        ({ node }) => ({
          title: node.frontmatter.title,
          short: node.frontmatter.short,
          to: node.frontmatter.slug,
        }))
  )

// const getI18nStore = (lang, messages) => ({
//   [lang]: { translations: messages }
// })

const getTranslations = page => [
    ...(page.fields.translations || []),
    {
      frontmatter: {
        lang: page.frontmatter.lang,
        slug: page.frontmatter.slug,
        title: page.frontmatter.title,
      },
    },
  ].sort((a, b) =>
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
  }

  static defaultProps = {
    wrapperStyles: {},
    pathContext: {
      lang: `en`,
    },
  }

  componentDidMount () {
    function handleInstall (event) {
      console.log(`Thank you for installing our app!`, event)
    }

    /* eslint-disable-next-line no-undef */
    window.onappinstalled = handleInstall
  }

  render() {
    console.log(this.props)
    const {
      pathContext,
      wrapperStyles,
      data: { site, SiteMeta, languages, homepage, page, menu },
    } = this.props

    const lang = pathContext.lang
    // const i18nStore = getI18nStore(lang, pathContext.messages)
    const translations = getTranslations(page)
    const getLang = getLangFactory(languages.edges)
    const menuItems = menu.edges || []
    const mainMenu = generateMainMenu(menuItems)
    const metaMenu = generateMetaMenu({ translations, getLang, menuItems })
    const urlParams = QS.parse()

    return (
      // <I18nextProvider
      //   i18n={i18n}
      //   initialLanguage={lang}
      //   initialI18nStore={i18nStore}
      // >
      <div
        css={{
          width: [`100%`, `100vw`],
          maxWidth: `1440px`,
          margin: `0 auto`,
        }}
      >
        <Helmet
          titleTemplate="%s - GaiAma.org"
          defaultTitle={page.frontmatter.title}
        >
          <title>{page.frontmatter.title}</title>
          <meta name="description" content="Sample" />
          <meta name="keywords" content="sample, something" />
          {translations.map(({ frontmatter }) => (
            <link
              rel="alternate"
              href={`${site.siteMetadata.siteUrl}${frontmatter.slug}`}
              hrefLang={frontmatter.lang}
              key={frontmatter.lang}
            />
          ))}
          {!isDev && (
            <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=IntersectionObserver" />
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

        <Header
          title={homepage.frontmatter.header.title}
          subtitle={homepage.frontmatter.header.subtitle}
          meta={metaMenu}
          menu={mainMenu}
          logo={SiteMeta.frontmatter.assets.logo.image}
          bgImage={SiteMeta.frontmatter.assets.headerBg.image}
        />

        {urlParams.ref && <ReferrerMessages urlParams={urlParams} />}

        <main
          id="main"
          tabIndex="-1"
          css={{
            ...focusOutlineNone,
            margin: `0 auto`,
            padding: `3rem .8rem 1.45rem`,
            width: !wrapperStyles.width && `98%`,
            maxWidth: `1280px`,
            [breakPoints.minMdLandscape]: {
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
          bgImage={SiteMeta.frontmatter.assets.headerBg.image}
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
