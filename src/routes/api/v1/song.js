const router = require('express').Router()
const songsInfo = require('../../../database/schemes/song-info')
const utils = require('../../../utils')

router.get('/random', async (req, res) => {
  const { limit } = req.query
  if (limit > 20) return res.status(406).send({ 'msg': 'Provided limit is larger than accaptable limit', 'status_code': 406 })
  const data = await songsInfo.aggregate([
    {
      '$sample': {
        'size': parseInt(limit) || 1
      }
    }
  ])
  res.header("Content-Type", 'application/json')
  res.send(JSON.stringify(data, null, 4))
})

router.get('/spotify', utils.cacheResponse(86400), async (req, res) => {
  const { id } = req.query
  if (!id) return res.sendStatus(400)
  const data = await songsInfo.findOne({ 'spotify.id': id }).catch((err) => { return res.sendStatus(500) })
  if (data) {
    res.header("Content-Type", 'application/json')
    res.send(JSON.stringify(data, null, 4))
  } else {
    res.sendStatus(404)
  }
})

router.get('/youtube', utils.cacheResponse(86400), async (req, res) => {
  const { id } = req.query
  if (!id) return res.sendStatus(400)
  const data = await songsInfo.findOne({ 'youtube.id': id }).catch((err) => { return res.sendStatus(500) })
  if (data) {
    res.header("Content-Type", 'application/json')
    res.send(JSON.stringify(data, null, 4))
  } else {
    res.sendStatus(404)
  }
})

router.get('/search', utils.cacheResponse(86400), async (req, res) => {
  var { q, limit } = req.query
  res.header("Content-Type", 'application/json')
  if (!q) return res.sendStatus(400)
  else if (limit > 20) return res.status(406).send({ 'msg': 'Provided limit is larger than accaptable limit', 'status_code': 406 })
  else if (!limit) limit = 5
  const data = await search(q, limit)
  if (data?.length >= 1) res.send(JSON.stringify(data, null, 4))
  else res.status(404).send({'msg': 'We can\'t find any song with this query', 'status_code': 404})
})

async function search(q, limit) {
  return await songsInfo.aggregate(
    [
      [
        {
          '$search': {
            'index': 'default',
            'text': {
              'query': q,
              'path': ['spotify.title', 'youtube.title']
            }
          }
        }, {
          '$project': {
            'youtube': 1,
            'spotify': 1,
            'score': {
              '$meta': 'searchScore'
            }
          }
        }, {
          '$sort': {
            'score': -1
          }
        }, {
          '$project': {
            'youtube': 1,
            'spotify': 1,
          }
        },{
          '$limit': limit
        }
      ]
    ]
  )
}

module.exports = router