const router = require('express').Router()

router.use('/song', require('./song'))
router.use('/lyric', require('./lyric'))
module.exports = router
