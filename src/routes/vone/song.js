const router = require('express').Router()
const songsInfo = require('../../database/schemes/song-info')
const utils = require('../../utils')

router.get('/random', async (req, res) => {
  const data = await songsInfo.aggregate([
    {
      '$sample': {
        'size': 1
      }
    }
  ])
  res.header("Content-Type", 'application/json')
  res.send(JSON.stringify(data, null, 4))
})

router.get('/spotify', utils.cacheResponse(86400), async (req, res) => {
  var { q, limit, type } = req.query
  if (!q) res.sendStatus(400)
  else if (limit > 20) res.sendStatus(413)
  if (!type) type = 'id'
  if (!limit) limit = 5
  limit = parseInt(limit)
  var data 
  switch (type) {
    case 'id':
      data = await songsInfo.findOne({ 'spotify.id': q })
      break
    case 'text':
      data = await search(q, 'spotify', limit)
      break
  }
  if (data) {
    res.header("Content-Type", 'application/json')
    res.send(JSON.stringify(data, null, 4))
  } else {
    res.sendStatus(404)
  }
})

router.get('/youtube', utils.cacheResponse(86400), async (req, res) => {
  var { q, limit, type } = req.query
  if (!q) res.sendStatus(400)
  else if (limit > 20) res.sendStatus(413)
  if (!type) type = 'id'
  if (!limit) limit = 5
  limit = parseInt(limit)
  var data 
  switch (type) {
    case 'id':
      data = await songsInfo.findOne({ 'youtube.id': q })
      break
    case 'text':
      data = await search(q, 'youtube', limit)
      break
  }
  if (data) {
    res.header("Content-Type", 'application/json')
    res.send(JSON.stringify(data, null, 4))
  } else {
    res.sendStatus(404)
  }
})

async function search(q, from, limit) {
  return await songsInfo.aggregate(
    [
      [
        {
          '$search': {
            'index': 'default',
            'text': {
              'query': q,
              'path': from + '.title'
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