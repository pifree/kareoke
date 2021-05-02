const express = require('express')
const router = express.Router()
const connect = require('../../../database')
const songsInfo = require('../../../database/schemes/song-info')
const utils = require('../../../utils')

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
    
    await connect().then(async (mongoose) => {
        const songs = await songsInfo.find({})
        console.log(songs)
        mongoose.connection.close()
    })
    
    /*const mongoose = await connect()
    const songs = await songsscheme.find({})
    console.log(songs)
    try {
        const titles = []
        switch (type) {
            case 'youtube':
                for (let i = 0; i < songs.length; i++) {
                    titles.push(songs[i].youtube.title)
                }
                break;
            case 'spotify':
                for (let i = 0; i < songs.length; i++) {
                    titles.push(songs[i].spotify.title)
                }
                break;
        }
        const result = utils.distanceSearch(titles, query, songs)
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
        return 500
    } finally {
        mongoose.connection.close()
    } */

}

module.exports = router