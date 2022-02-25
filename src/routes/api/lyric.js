const router = require('express').Router()
/*const pupet = require('puppeteer')
const cheer = require('cheerio')
const fetch = require('node-fetch')
const cache = require('../../utils/cache')

router.get('/genius', cache(21600000), async (req, res) => {
    if (!req.query.q) return res.status(400).send('You need to send query for search')
    else if (!req.query.type) req.query.type = 'text'

    const response = await fetch(`https://api.genius.com/search?q=${req.query.q}`, { headers: { "Authorization": `Bearer nEkoa5hvUWcscXor9utBB8wt6EDXTknzS5lmSjmzmJRNNqPfxLXmbzb7_GzTwZC9` } })
    const data = await response.json()

    if (data.meta.status != 200) return res.status(data.meta.status).send({ 'msg': `Couldn't find a song with ${req.query.q}`, 'status_code': 404 })

    try {
        const browser = await pupet.launch().catch(err => {})
        console.log('Tarayıcı açıldı')
        const page = await browser.newPage().catch(err => {})
        console.log('Sayfa açıldı')
        await page.goto(data.response.hits[0].result.url, {waitUnitl: 'networkidle'}).catch(err => {})
        console.log(data.response.hits[0].result.url + ' adresi açıldı')

        try {
            const content = await page.content().catch(err => { })
            console.log('İçerik alındı')
            browser.close()
            console.log('Tarayıcı kapatıldı')
            res.send(content)
            // Lyrics__Container-sc-1ynbvzw-6
        } catch (e) {
            res.sendStatus(500)
            console.log(e)
        }
    } catch (err) {

    }
 
})*/

module.exports = router