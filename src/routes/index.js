const router = require('express').Router()

router.use('/v1', require('./api'))
router.all('/brew/coffe', (req, res) => {
    res.status(418).send({'msg': 'Bro I am a teapot, how the fuck I can brew coffe', 'status_code': 418})
})

module.exports = router
