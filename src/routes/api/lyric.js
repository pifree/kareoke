const router = require('express').Router()
const cheerio = require('cheerio')
const fetch = require('node-fetch')
const cache = require('../../utils/cache')

router.get('/genius', async (req, res) => {
    if (!req.query.q) return res.status(400).send('You need to send query for search')
    else if (!req.query.type) req.query.type = 'text'

    const response = await fetch(`https://api.genius.com/search?q=${req.query.q}`, { headers: { "Authorization": `Bearer nEkoa5hvUWcscXor9utBB8wt6EDXTknzS5lmSjmzmJRNNqPfxLXmbzb7_GzTwZC9` } })
    const data = await response.json()

    if (data.meta.status != 200) return res.status(data.meta.status).send({ 'msg': `Couldn't find a song with ${req.query.q}`, 'status_code': 404 })

    const htmlResponse = await fetch('https://genius.com/Dario-moreno-her-aksam-votka-rak-ve-sarap-lyrics')
    const htmlPage = await htmlResponse.text()

    try {
        const $ = await cheerio.load(htmlPage)
        switch (req.query.type) {
            case 'html':
                var lyric = await $('div.lyrics').html()
                res.send(lyric)
                break;
            case 'text':
                var lyric = $('.lyrics').text()
                console.log('lyric', lyric)
                res.send(lyric)
                break;
        }
    } catch (e) {
        res.sendStatus(500)
        console.log(e)
    }
 
})

module.exports = router
