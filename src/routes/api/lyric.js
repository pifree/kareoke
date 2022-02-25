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
    console.log('HTML Page')
    console.log(htmlPage)

    try {
        let $ = await cheerio.load(htmlPage)
        switch (req.query.type) {
            case 'html':
                var lyric = await $('div.lyrics').html()
                res.send(lyric)
                break;
            case 'text':
                var lyric = await $('div.song_body column_layout div.column_layout-column_span column_layout-column_span--primary div.song_body-lyrics div div.lyrics').text()
                res.send(lyric)
                break;
        }
    } catch (e) {
        res.sendStatus(500)
        console.log(e)
    }
 
})

module.exports = router
