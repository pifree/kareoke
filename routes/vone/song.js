const express = require('express')
const router = express.Router()
const songsInfo = require('../../database/schemes/song-info')
const utils = require('../../utils')
const time = 86400

router.get('/spotify', utils.cacheResponse(time), async (req, res) => {
  const { q } = req.query;
  var data
  if (!q || q == undefined || q == null) data = 400
  else {
    try {
      data = await songsInfo.findOne({ 'spotify.id': q })
      if (!data) data = 404
    } catch (err) {
      data = 500
    }
  }
  if (typeof (data) == 'number') res.sendStatus(data)
  else {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(data, null, 4))
  }
})

router.get('/youtube', utils.cacheResponse(time), async (req, res) => {
  const { q } = req.query;
  var data
  if (!q || q == undefined || q == null) data = 400
  else {
    try {
      data = await songsInfo.findOne({ 'youtube.id': q })
      if (!data) data = 404
    } catch (err) {
      data = 500
    }
  }
  if (typeof (data) == 'number') res.sendStatus(data)
  else {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(data, null, 4))
  }
})

module.exports = router