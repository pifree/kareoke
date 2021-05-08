const express = require('express')
const router = express.Router()
const songsInfo = require('../../database/schemes/song-info')
const utils = require('../../utils')
const time = 86400
var songs = []

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

router.get('/random', async (req, res) => {
  if (songs <= 0) await getSongs()
  let data = await songsInfo.findById(songs[Math.floor(Math.random() * songs.length)]._id)
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(data, null, 4))
})

router.get('/search', async (req, res) => {
  if (songs <= 0) await getSongs()
  const { q, from } = req.query
  var data
  switch (from) {
    case 'youtube':
      break
    case 'spotify':
      break
  }
})

router.get('/all', async (req, res) => {
  try {
    await getSongs()
  } catch (error) {
    res.sendStatus(500)
  }
  res.sendStatus(200)
})

async function getSongs() {
  songs = await songsInfo.find({}, '_id youtube.title spotify.title')
}

module.exports = router