import QS from './query-string'

describe(`url params suite`, function() {
  test(`parse url query string correctly`, () => {
    const url = `https://www.npmjs.com/package/retext-emoji?sort=asc&filter=quark`
    const expected = { sort: `asc`, filter: `quark` }
    expect(QS.parse(url)).toMatchObject(expected)
  })

  test(`add single query param correctly`, () => {
    const base = `https://www.npmjs.com/package/retext-emoji`
    const url = `${base}?sort=asc`
    const expected = `${base}?sort=asc&filter=quarks`
    const parsed = QS.parse(url)
    parsed.filter = `quarks`
    expect(QS.stringify(parsed, base)).toBe(expected)
  })

  test(`stringify without leading ? if no url provided`, () => {
    const search = `?sort=asc`
    const expected = `sort=asc&filter=quarks`
    const parsed = QS.parse(search)
    parsed.filter = `quarks`
    expect(QS.stringify(parsed)).toBe(expected)
  })

  test(`properly add params to url without any`, () => {
    const base = `https://www.npmjs.com/package/retext-emoji`
    const expected = `${base}?filter=quarks`
    const parsed = QS.parse(base)
    parsed.filter = `quarks`
    expect(QS.stringify(parsed, base)).toBe(expected)
  })

  test(`handles empty query string`, () => {
    const base = `https://www.npmjs.com/package/retext-emoji`
    const parsed = QS.parse(base)
    expect(QS.stringify(parsed, base)).toBe(base)
  })

  test(`handles malformed params`, () => {
    const base = `https://www.npmjs.com/package/retext-emoji`
    const url = `${base}?foo=bar?bar=baz`
    const expected = `${base}?foo=bar&bar=baz`
    const parsed = QS.parse(url)
    expect(QS.stringify(parsed, base)).toBe(expected)
  })

  test(`handles arrays properly`, () => {
    const base = `https://www.npmjs.com/package/retext-emoji`
    const expected = {
      foo: [`bar`, `baz`],
    }
    expect(QS.parse(`${base}?foo=bar&foo=baz`)).toMatchObject(expected)
    expect(QS.parse(`${base}?foo[]=bar&foo[]=baz`)).toMatchObject(expected)
    expect(QS.parse(`${base}?foo=bar,baz`)).toMatchObject(expected)
    expect(QS.parse(`${base}?foo=,baz`)).toMatchObject({ foo: [`baz`] })
  })
})
