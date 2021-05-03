const express = require('express')
const app = express()
const v1 = require('./routes/v1/index.js')

app.use('/v1', v1)
app.listen(3000, () => {console.log(`http://localhost:3000`)})