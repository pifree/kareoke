const router = require('express').Router()

router.use('/song', require('./song'))
module.exports = router