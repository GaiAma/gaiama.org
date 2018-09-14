const cuid = require(`cuid`)
const Qs = require(`@/utils/query-string`)

// store views so we won't count recurring pages
const views = {}
// init Image here to be reused on every route change
const pixel = new Image()
// uid used to group visitors instead of PII
const uid = cuid()

/**
 * utm_source – Identifies which site sent the traffic - utm_source=Google
 * utm_campaign - Identifies a specific product promotion or strategic campaign - utm_campaign=spring_sale
 * utm_content - Identifies what specifically was clicked to bring the user to the site - utm_content=logolink
 */
exports.onRouteUpdate = (
  { location: { pathname, search } },
  { endpoint, version }
) => {
  const isRecurring = !!views[pathname]
  const { utm_source, utm_campaign, utm_content } = Qs.parse(search)

  views[pathname] = isRecurring ? views[pathname] + 1 : 1

  if (!isRecurring) {
    setTimeout(() => {
      // eslint-disable-next-line
      const { title: dt, referrer } = document
      const query = { uid, dt }

      if (referrer) query.dr = referrer // document referrer
      if (utm_source) query.cs = utm_source // campaign source
      if (utm_campaign) query.cn = utm_campaign // campaign name
      if (utm_content) query.cc = utm_content // campaign content
      if (version) query.av = version // application version

      pixel.src = Qs.stringify(query, endpoint)
    }, 1000)
  }
}
