import cuid from 'cuid'
import { parse, stringify } from '@gaiama/query-string'

// store views so we won't count recurring pages
const views = {}
// init Image here to be reused on every route change
const image = new Image()
// uid used to group visitors instead of PII
const uid = cuid()

const getDuration = () => {
  const start = window.pixelStart || new Date()
  const now = new Date()
  const difference = now.getTime() - start.getTime()

  if (difference === 0) {
    return null
  }

  return difference
}

/**
 * utm_source – Identifies which site sent the traffic - utm_source=Google
 * utm_campaign - Identifies a specific product promotion or strategic campaign - utm_campaign=spring_sale
 * utm_content - Identifies what specifically was clicked to bring the user to the site - utm_content=logolink
 */
export const onRouteUpdate = (
  { location: { pathname, search } },
  { endpoint, version, enabled }
) => {
  if (typeof enabled !== `undefined` && !enabled) return
  const isRecurring = !!views[pathname]
  const { utm_source, utm_campaign, utm_content, ref } = parse(search)

  views[pathname] = isRecurring ? views[pathname] + 1 : 1

  if (!isRecurring) {
    setTimeout(() => {
      // eslint-disable-next-line
      const { title: dt, referrer } = document
      const query = {
        uid,
        dt,
        plt: getDuration(),
        sd: window.screen.colorDepth, // screen colors
        de: document.characterSet, // document encoding
        vp: `${window.innerWidth}x${window.innerHeight}`, // viewport size
        sr: `${window.screen.width}x${window.screen.height}`, // screen resolution
      }

      if (ref || referrer) query.dr = ref || referrer // document referrer
      if (utm_source) query.cs = utm_source // campaign source
      if (utm_campaign) query.cn = utm_campaign // campaign name
      if (utm_content) query.cc = utm_content // campaign content
      if (version) query.av = version // application version
      if (window.navigator.sendBeacon) query.beacon = 1

      const pixel = stringify(query, endpoint)

      if (window.navigator.sendBeacon) {
        window.navigator.sendBeacon(pixel)
      } else {
        image.src = pixel
      }
    }, 1000)
  }
}
