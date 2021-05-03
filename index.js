const express = require('express')
const app = express()
const v1 = require('./routes')
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.sendStatus(200)
})
app.use('/v1', v1)
app.listen(port, () => {console.log(`http://localhost:${port}`)})