const express = require('express')
const app = express()

app.get('/', (req, res) => { res.sendStatus(418) })
app.listen(3000, () => {})