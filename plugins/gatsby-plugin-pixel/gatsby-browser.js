import cuid from 'cuid'

// store views so we won't count recurring pages
const views = {}
const uid = cuid()

exports.onRouteUpdate = ({ location: { pathname, search } }, { endpoint }) => {
  const isRecurring = !!views[pathname]
  const utmSourceResults = /utm_source=([^&]*)/.exec(search)
  const utmSource = utmSourceResults ? utmSourceResults[1] : ``

  views[pathname] = isRecurring ? views[pathname] + 1 : 1

  if (!isRecurring) {
    setTimeout(() => {
      const { title } = document
      const nocache = `${Math.random()}`.replace(`0.`, ``)
      const pixel = new Image()
      pixel.src =
        endpoint
          .replace(`[[nocache]]`, encodeURIComponent(nocache))
          .replace(`[[uid]]`, encodeURIComponent(uid))
          .replace(`[[title]]`, encodeURIComponent(title)) +
        (utmSource ? `&utm_source=${utmSource}` : ``)
    }, 500)
  }
}
