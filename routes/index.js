const express = require('express')
const router = express.Router()

router.use('/song', require('./song'))

module.exports = router