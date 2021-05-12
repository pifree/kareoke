require('dotenv').config()
const app = require('express')()

app.listen(process.env.PORT || 3000, async () => {
    await require('./database/connect')()
})
app.use('/api', require('./routes'))
app.get('/', (req, res) => {res.sendStatus(200)})