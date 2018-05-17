import striptags from 'striptags'
import { decode } from 'he'
import { curry, ifElse, invoker, identity, compose, replace, trim } from 'ramda'

export const summarize = (str, length = 140) =>
  compose(
    ifElse(x => str.length > x.length, x => `${x}…`, identity),
    invoker(2, `substr`)(0, length),
    decode,
    trim,
    striptags, // TODO strip image descriptions
    replace(/\s{2,}/gm, ` `),
    replace(`<3`, `♡`)
  )(str)

export default curry(summarize)
