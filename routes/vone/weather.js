const axios = require('axios')
const router = require('express').Router()

router.get('/current', async (req, res) => {
    const { lat, lon } = req.query
    const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_API_KEY}`)
    res.send(data.data)
})

module.exports = router