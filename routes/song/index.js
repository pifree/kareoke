const express = require('express')
const router = express.Router()
const connect = require('../../database')
const songsInfo = require('../../database/schemes/song-info')
const utils = require('../../utils')

router.get('/spotify', async (req, res) => {
    const { type, q } = req.query;
    switch (type) {
        case 'id':
            console.log(`ID lookup id: ${q}`)
            break;
        case 'title':
            const data = await search(q, 'spotify')
            res.send(data)
            break;
    }
})

router.get('/youtube', (req, res) => {
    const { type, q } = req.query;
    switch (type) {
        case 'id':
            console.log(`ID lookup id: ${q}`)
            break;
        case 'title':
            console.log(`Title lookup title: ${q}`)
            break;
    }
    res.sendStatus(200)
})

router.get('/random', (req, res) => {
    res.send('Random bir şarkı')
})

async function search(query, type) {
    console.log('Starting...')
    const start = Date.now()
    const mongoose = await connect()
    const songs = await songsInfo.find({})
    console.log(`Getting documents ended, ${Date.now() - start}ms for ${songs.length} doc.`)
    mongoose.connection.close()
}

module.exports = router