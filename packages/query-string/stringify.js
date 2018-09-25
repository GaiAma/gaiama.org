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
