const router = require('express').Router()
const passport = require('passport')

router.get('/discord', passport.authenticate('discord'))
router.get('/discord/redirect', passport.authenticate('discord'), (req, res, next) => {
    res.status(200).send({msg: 'You successfully authorized your account, now you can close this page'})
})
router.get('/', (req, res) => {
    if (req.user) {
        res.send(req.user)
    } else {
        res.redirect('/auth/discord')
    }
})

module.exports = router
