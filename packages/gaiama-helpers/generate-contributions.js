const R = require(`ramda`)
const { toNumber } = require(`lodash`)
const speakingurl = require(`speakingurl`)

const slugify = x =>
  speakingurl(`${x}`, {
    replacement: `_`,
    remove: /"|﻿/,
    lower: true,
  })

// turn array into unique object with amounts summed by email address
const uniqueSum = R.reduce((items, /*{ original, ...*/ item /*}*/) => {
  if (!item.email && !item.name) throw new Error(`missing group identifier`)
  const key = slugify(item.email || item.name)
  const amount = toNumber(item.amount) / 10
  // if (`${item.date}`.includes(`Invalid`)) {
  //   // Datum: '20.02.2019' Uhrzeit: '08:24:37'
  //   item.date = original[`"Datum"`]
  //   console.log(`INVALID`, item.date)
  // }
  return {
    ...items,
    [key]: {
      ...item,
      amount: items[key] ? items[key].amount + amount : amount,
      currency: item.original[`Sender Currency`] || item.original[`Währung`],
    },
  }
}, {})

// TODO: split gifts, so presentees get their own entries..
const counts = {}
// const publicSaveValuesList = R.map(item => {
//   const key = slugify(item.name)
//   counts[key] = R.inc(counts[key] || 0)
//   return {
//     ...item,
//     key: key + (counts[key] > 1 ? `-${R.dec(counts[key])}` : ``),
//     time_string: new Date(item.date).getTime(),
//   }
// })
const publicSaveValuesList = R.reduce((items, item) => {
  const key = slugify(item.name)
  counts[key] = R.inc(counts[key] || 0)
  if (item.presentees && item.presentees.length) {
    return [
      ...items,
      ...item.presentees.map(presentee_name => ({
        ...item,
        key:
          slugify(presentee_name) +
          (counts[key] > 1 ? `-${R.dec(counts[key])}` : ``),
        id: item.id + presentee_name,
        time_string: new Date(item.date).getTime(),
        name: presentee_name,
        amount: item.amount / item.presentees.length,
      })),
    ]
  }
  return [
    ...items,
    {
      ...item,
      key: key + (counts[key] > 1 ? `-${R.dec(counts[key])}` : ``),
      time_string: new Date(item.date).getTime(),
    },
  ]
}, [])

module.exports.generateContributions = R.compose(
  publicSaveValuesList,
  R.values,
  uniqueSum
)
