const express = require('express')
const router = express.Router()
const connect = require('../../database')
const songsInfo = require('../../database/schemes/song-info')
const utils = require('../../utils')
var songs = []
var titles = {'youtube': [], 'spotify': []}

router.get('/spotify', async (req, res) => {
    const { type, q } = req.query;
    var data = 404
    await getSongs()
    switch (type) {
        case 'id':
            for (let i = 0; i < songs.length; i++){
                if (songs[i].spotify.id == q) {
                    data = songs[i]
                    break
                } 
            }
            res.send(data)
            break;
        case 'title':
            data = await search(q, 'spotify')
            res.send(data)
            break;
    }
})

router.get('/youtube', async (req, res) => {
    const { type, q } = req.query;
    var data = 404
    await getSongs()
    switch (type) {
        case 'id':
            for (let i = 0; i < songs.length; i++){
                if (songs[i].youtube.id == q) {
                    data = songs[i]
                    break
                } 
            }
            res.send(data)
            break;
        case 'title':
            data = await search(q, 'youtube')
            res.send(data)
            break;
    }
})

router.get('/random', async (req, res) => {
    await getSongs()
    res.send(songs[Math.floor((Math.random() * songs.length))])
})

async function search(query, type) {
    var song
    switch (type) {
        case 'youtube':
            song = utils.distanceSearch(titles.youtube, query, songs)
            break;
        case 'spotify':
            song = utils.distanceSearch(titles.spotify, query, songs)
            break;
    }
    if (song == null || song == undefined) return 404
    return song
}

async function getSongs() {
    if (songs.length <= 0) {
        const mongoose = await connect()
        songs = await songsInfo.find({})
        mongoose.connection.close()
        for (let i = 0; i < songs.length; i++){
            titles.youtube.push(songs[i].youtube.title)
            titles.spotify.push(songs[i].spotify.title)
        }
    }
}

module.exports = router