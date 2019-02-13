const crypto = require(`crypto`)
const AWS = require(`aws-sdk`)
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
const uniqueSum = R.reduce((items, item) => {
  if (!item.email && !item.name) throw new Error(`missing group identifier`)
  const key = slugify(item.email || item.name || item.id)
  return {
    ...items,
    [key]: {
      ...item,
      amount:
        toNumber(items[key] ? items[key].amount + item.amount : item.amount) /
        10,
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

const generateContributions = R.compose(
  publicSaveValuesList,
  R.values,
  uniqueSum
)

module.exports.sourceNodes = async (
  { actions, createNodeId, cache },
  pluginOptions
) => {
  const { createNode } = actions
  const { TableName, accessKeyId, secretAccessKey } = pluginOptions
  const cacheKey = `source-gaiama-donations`
  const dynamoConf = {
    apiVersion: '2012-08-10',
    region: `eu-west-1`,
    accessKeyId,
    secretAccessKey,
  }
  const dynamodb = new AWS.DynamoDB.DocumentClient(dynamoConf)

  let donations = await cache.get(cacheKey)
  // console.log(`donations`, donations)

  if (!donations) {
    console.log(`no cache`)
    donations = await scanAsync(dynamodb, { TableName })
    if (!donations || !donations.Count) {
      throw new Error(`gatsby-source-gaiama-donations`)
    }
    cache.set(cacheKey, donations)
  }

  // console.log(donations)

  const items = generateContributions(donations.Items).forEach(item => {
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(item))
      .digest(`hex`)

    const node = {
      id: createNodeId(item.id),
      parent: null,
      children: [],
      internal: {
        type: `gaiamaDonation`,
        contentDigest,
      },
      item,
    }

    createNode(node)
  })
}

const scanAsync = (db, conf) =>
  new Promise((resolve, reject) =>
    db.scan(conf, (err, data) => {
      if (err) return reject(err)
      return resolve(data)
    })
  )
