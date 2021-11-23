const router = require('express').Router()
const { db, songInfo } = require('../../database')
const cache = require('../../utils/cache')

const database = new db()

router.use((req, res, next) => {
  database.Schema = songInfo
  songInfo.aggregate
  next();
})

router.get('/random', async (req, res) => {
  const { limit } = req.query

  if (limit > 20) return res.status(413).send({ 'msg': 'Provided limit is larger than accaptable limit', 'status_code': 413 })

  const data = await database.aggregate([
    {
      '$sample': {
        'size': parseInt(limit) || 1
      }
    }, {
      '$project': {
        '_id': 0,
        'youtube': 1,
        'spotify': 1
      }
    }
  ])

  res.header("Content-Type", 'application/json')
  res.send(JSON.stringify(data[0], null, 4))
})

router.get('/spotify', cache(21600000), async (req, res) => {
  const { id } = req.query

  if (!id) return res.status(400).send({'msg': 'You must provide a id', 'status_code': 400})


  const data = await database.findOne({ 'spotify.id': id }).catch((err) => { return res.sendStatus(500) })
  console.log(data)
  if (data) {
    res.header("Content-Type", 'application/json')
    res.send(JSON.stringify({
      'youtube': data.youtube,
      'spotify': data.spotify
    }, null, 4))
  } else {
    res.status(404).send({'msg': 'We couldn\'t find a data with this id', 'status_code': 404})
  }
})

router.get('/youtube', cache(21600000), async (req, res) => {
  const { id } = req.query

  if (!id) return res.status(400).send({'msg': 'You must provide a id', 'status_code': 400})


  const data = await database.findOne({ 'youtube.id': id }).catch((err) => { return res.sendStatus(500) })

  if (data) {
    res.header("Content-Type", 'application/json')
    res.send(JSON.stringify({
      'youtube': data.youtube,
      'spotify': data.spotify
    }, null, 4))
  } else {
    res.status(404).send({'msg': 'We couldn\'t find a data with this id', 'status_code': 404})
  }
})

router.get('/search', cache(21600000), async (req, res) => {
  var { q, limit } = req.query
  res.header("Content-Type", 'application/json')

  limit = parseInt(limit)
  if (!q) return res.status(400).send({'msg': 'You must provide a query', 'status_code': 400})
  else if (!limit) limit = 5
  else if (limit > 20) return res.status(413).send({ 'msg': 'Provided limit is larger than accaptable limit', 'status_code': 413 })

  const data = await search(database, q, limit)

  if (data.length >= 1) {
    res.send(JSON.stringify( limit == 1 ? data[0] : data, null, 4))
  }
  else res.status(404).send({ 'msg': `We can't find any song with this query, ${q}`, 'status_code': 404 })
})

async function search(db, q, limit) {
  return await db.aggregate(
    [
      {
        '$search': {
          'index': 'default', 
          'text': {
            'query': q, 
            'path': [
              'youtube.title', 'spoitfy.title'
            ]
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'youtube': 1, 
          'spotify': 1, 
          'score': {
            '$meta': 'searchScore'
          }
        }
      }, {
        '$limit': limit
      }
    ]
  )
}

module.exports = router
