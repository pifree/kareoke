const router = require('express').Router()

router.use('/v1', require('./vone'))
module.exports = router