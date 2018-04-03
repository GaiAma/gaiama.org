import striptags from 'striptags'
import {
  decode,
} from 'he'
import {
  curry,
  invoker,
  compose,
  replace,
  trim,
} from 'ramda'

export const summarize = (str, length = 140) =>
  compose(
    invoker(2, `substr`)(0, length),
    decode,
    trim,
    striptags,
    replace(/\s{2,}/gm, ` `),
    replace(`<3`, `♡`)
  )(str)

export default curry(summarize)
