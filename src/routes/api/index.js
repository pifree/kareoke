const router = require('express').Router();

//router.use(require('../../utils/apiCheck')) //! Disabled for better version
router.use('/song', require('./song'))
router.use('/lyric', require('./lyric'))

module.exports = router