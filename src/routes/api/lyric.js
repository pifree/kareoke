const router = require('express').Router()
const cheerio = require('cheerio')
const fetch = require('node-fetch')
const cache = require('../../utils/cache')

router.get('/genius', cache(21600000), async (req, res) => {
    if (!req.query.q) return res.status(400).send('You need to send query for search')
    else if (!req.query.type) req.query.type = 'text'

    const response = await fetch(`https://api.genius.com/search?q=${req.query.q}`, { headers: { "Authorization": `Bearer nEkoa5hvUWcscXor9utBB8wt6EDXTknzS5lmSjmzmJRNNqPfxLXmbzb7_GzTwZC9` } })
    const data = await response.json()

    if (data.meta.status != 200) return res.status(data.meta.status).send({ 'msg': `Couldn't find a song with ${req.query.q}`, 'status_code': 404 })

    const htmlResponse = await fetch('https://genius.com' + data.response.hits[0].result.path)
    const htmlPage = await htmlResponse.text()
    console.log(htmlPage)

    try {
        let $ = await cheerio.load(htmlPage)
        var lyric
        switch (req.query.type) {
            case 'html':
                lyric = await $('div.lyrics').html()
                break;
            case 'text':
                lyric = await $('div.lyrics').text()
                break;
        }
        console.log(lyric)
        res.send(lyric)
    } catch (e) {
        res.sendStatus(500)
        console.log(e)
    }
 
})

module.exports = router
