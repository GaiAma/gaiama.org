/* global document */
import React, { Component } from 'react'
import pt from 'prop-types'
import { Title, Meta } from 'react-head'
import { colors } from '@src/theme'

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
        <Meta name="apple-mobile-web-app-title" content={site.title} />
        <Meta name="application-name" content={site.title} />

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
