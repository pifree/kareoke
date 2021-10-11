const router = require('express').Router()
const cheerio = require('cheerio')
const fetch = require('node-fetch')

router.get('/genius', async (req, res) => {
    if (!req.query.q) return res.status(400).send('You need to send query for search')
    else if (!req.query.type) req.query.type = 'text'

    const response = await fetch(`https://api.genius.com/search?q=${req.query.q}`, { headers: { "Authorization": `Bearer nEkoa5hvUWcscXor9utBB8wt6EDXTknzS5lmSjmzmJRNNqPfxLXmbzb7_GzTwZC9` } })
    const data = await response.json()

    if (data.response.hits.length == 0) return res.status(404).send({ 'msg': `Couldn't find a song with ${req.query.q}`, 'status_code': 404 })
    
    const htmlResponse = await fetch('https://genius.com' + data.response.hits[0].result.path)
    const htmlPage = await htmlResponse.text()

    try {
        let $ = cheerio.load(htmlPage)
        switch (req.query.type) {
            case 'html':
                res.send($('div [class="lyrics"]').html())
                break;
            case 'text':
                res.send($('div [class="lyrics"]').text())
                break;
        } 
    } catch (e) {
        res.sendStatus(500)
        console.log(e)
    }
 
})

module.exports = router