const crypto = require(`crypto`)
const AWS = require(`aws-sdk`)
const { generateContributions } = require(`@gaiama/helpers`)

module.exports.sourceNodes = async (
  { actions, createNodeId, cache },
  { TableName, accessKeyId, secretAccessKey, offline }
) => {
  const { createNode } = actions

  if (offline) {
    return createNode({
      id: `donations-offline`,
      parent: null,
      children: [],
      internal: {
        type: `gaiamaDonation`,
        contentDigest: `offline placeholder`,
      },
      item: {
        key: `offline`,
        name: `Plugin offline`,
        amount: 10000000000,
        time_string: 1550073079989,
        anonymous: false,
      },
    })
  }

  const cacheKey = `source-gaiama-donations`
  const dynamoConf = {
    apiVersion: `2012-08-10`,
    region: `eu-west-1`,
    accessKeyId,
    secretAccessKey,
  }
  const dynamodb = new AWS.DynamoDB.DocumentClient(dynamoConf)

  let donations = await cache.get(cacheKey)

  if (!donations) {
    console.log(`no cache`)
    donations = await scanAsync(dynamodb, { TableName })
    if (!donations || !donations.Count) {
      throw new Error(`gatsby-source-gaiama-donations`)
    }
    cache.set(cacheKey, donations)
  }

  generateContributions(donations.Items).forEach(item => {
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(item))
      .digest(`hex`)

    if (item.anonymous) {
      item.anonymous = true
    } else {
      item.anonymous = false
    }

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
