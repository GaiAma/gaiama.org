/**
 * Parse query string
 * inspired by https://gist.github.com/tjmehta/9204891
 * @param {string} url - Pure query string, url with or w/o query string or empty
 */
export const parse = (url = ``) => {
  const _url =
    url !== ``
      ? url
      : // eslint-disable-next-line no-undef
        typeof window !== `undefined` ? window.location.search : ``

  const indexOfQueryDelimiter = _url.indexOf(`?`)

  if (indexOfQueryDelimiter < 0) return {}

  const normalized = _url.slice(indexOfQueryDelimiter + 1).replace(/\?/g, `&`)

  const hashes = normalized
    ? normalized.split(`&`)
    : /* eslint-disable-next-line no-undef */
      typeof window !== `undefined` ? window.location.search : ``

  return hashes.reduce((acc, hash) => {
    const [_key, _val = ``] = hash.split(`=`)

    // we uri encode key and value
    // and strip possible square brackets used for arrays
    const key = encodeURIComponent(_key.replace(`[]`, ``))

    // split to array if comma present
    const val = _val.includes(`,`)
      ? _val.split(`,`).map(encodeURIComponent)
      : encodeURIComponent(_val)

    // if key exists it's an array
    if (acc[key]) {
      // key exists but is not yet an array
      if (!Array.isArray(acc[key])) {
        // turn into array
        acc[key] = [acc[key]]
      }
      // then push val to array
      acc[key].push(val)
      return acc
    }

    acc[key] = !Array.isArray(val) ? val : val.filter(x => x)

    return acc
  }, {})
}

/**
 * Stringify query string object with optional url
 * @param {object} qs - object containing desired key: value pairs
 * @param {string} url - url to prepend to query string or ``
 */
export const stringify = (qs, url = ``) =>
  Object.keys(qs).reduce((acc, key, i) => {
    const delimiter = i === 0 && acc ? `?` : !acc ? `` : `&`
    return [
      acc,
      delimiter,
      encodeURIComponent(key),
      `=`,
      encodeURIComponent(qs[key]),
    ].join(``)
  }, url)
