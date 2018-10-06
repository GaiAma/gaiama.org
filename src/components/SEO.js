/* global document */
import React, { Component } from 'react'
import pt from 'prop-types'
import { Title, Meta, Link } from 'react-head'
import { colors } from '@/theme'

class SEO extends Component {
  componentDidUpdate = () => {
    if (
      typeof document !== `undefined` &&
      this.props.lang &&
      document.documentElement.lang !== this.props.lang
    ) {
      document.documentElement.lang = this.props.lang
    }
  }
  render = () => {
    const {
      page,
      site,
      lang,
      getLang,
      cover,
      location,
      translations,
    } = this.props

    return (
      <>
        <Title>Jop! {`${page.title} - ${site.title}`}</Title>
        <Meta name="description" content={page.summary || page.excerpt} />
        <Link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png?v=1"
        />
        <Link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png?v=1"
        />
        <Link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png?v=1"
        />
        <Link rel="manifest" href="/site.webmanifest?v=1" />
        <Link rel="shortcut icon" href="/favicon.ico?v=1" />
        <Meta name="apple-mobile-web-app-title" content={site.title} />
        <Meta name="application-name" content={site.title} />
        <Meta name="msapplication-TileColor" content={colors.turqoiseLight} />
        <Meta name="theme-color" content={colors.white} />

        <meta property="og:site_name" content={site.title} />
        <meta property="og:url" content={`${site.siteUrl}${page.slug}`} />
        <meta property="og:locale" content={getLang(page.lang).lc} />
        {getLang(page.lang, true).map(x => (
          <meta property="og:locale:alternate" content={x.lc} key={x.lc} />
        ))}
        <meta property="og:title" content={`${page.title} - ${site.title}`} />
        <meta property="og:type" content="website" />
        <meta property="fb:admins" content="100000166597534" />
        <meta
          property="og:description"
          content={page.summary || page.excerpt}
        />
        {[`og:image`, `image`].map(x => (
          <meta property={x} key={x} content={cover} />
        ))}

        <meta name="twitter:card" content="summary_large_image" />

        {[`/en`, `/de`].includes(location) && (
          <link rel="alternate" href={site.siteUrl} hrefLang="x-default" />
        )}
        {translations.map(({ frontmatter: t }) => (
          <link
            rel="alternate"
            href={`${site.siteUrl}${t.slug}`}
            hrefLang={t.lang}
            key={t.lang}
          />
        ))}
        {[`atom.xml`, `rss.xml`, `feed.json`].map(feed => (
          <link
            rel="alternate"
            href={`${site.siteUrl}/${lang}/blog/${feed}`}
            type={
              feed.includes(`json`) ? `application/json` : `application/rss+xml`
            }
            key={feed}
          />
        ))}
      </>
    )
  }

  static propTypes = {
    page: pt.object,
    site: pt.object,
    lang: pt.string,
    getLang: pt.func,
    cover: pt.string,
    location: pt.string,
    translations: pt.array,
  }
}

export { SEO }
