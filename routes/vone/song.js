const express = require('express')
const router = express.Router()
const songsInfo = require('../../database/schemes/song-info')

router.get('/spotify', async (req, res) => {
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
    else res.send(data)
})

router.get('/youtube', async (req, res) => {
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
    else res.send(data)
})

module.exports = router