import cuid from 'cuid'

// store views so we won't count recurring pages
const views = {}
const id = cuid()

exports.onRouteUpdate = ({ location: { pathname } }, { endpoint }) => {
  const isRecurring = !!views[pathname]
  views[pathname] = isRecurring ? views[pathname] + 1 : 1

  if (!isRecurring) {
    setTimeout(() => {
      const { title } = document
      const pixel = new Image()
      pixel.src = endpoint
        .replace(`[[nocache]]`, encodeURIComponent(Math.random()))
        .replace(`[[id]]`, encodeURIComponent(id))
        .replace(`[[title]]`, encodeURIComponent(title))
    }, 500)
  }
}
