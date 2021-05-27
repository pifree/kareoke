const uuid = require('uuid');
const router = require('express').Router()
const userScheme = require('../../database/schemes/user')

router.use('/v1', require('./v1'))
router.post('/key', async (req, res) => {
    const { id } = req.query
    const user = await userScheme.findById(id)
    
    if (!user) return res.status(404).send({ msg: "There is not user with this id" })
    else if (user.keys.length = 1) return res.status(402).send({msg: "You need to purchase new place to have another key"})

    const keyString = `${user.email}:${uuid.v4()}:${Date.now()}:pifree:user`
    const encodedKeyString = Buffer.from(keyString).toString('base64')

    try {
        await userScheme.findByIdAndUpdate(id, { $push: { 'keys': { '_id': encodedKeyString } } })
        res.status(200).send({key: encodedKeyString})
    } catch (err) {
        require('../../utils').error(err)
        res.status(500).send({msg: 'There is been a error while processing the work'})
    }
})
module.exports = router