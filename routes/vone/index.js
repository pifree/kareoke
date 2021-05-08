const express = require('express')
const router = express.Router()

router.use('/song', require('./song'))
router.use('/auth', require('./auth/auth'))
router.use('/weather', require('./weather'))
module.exports = router