const {db, projects} = require('../database')

module.exports = async (req, res, next) => {
    const database = new db()
    database.Schema = projects

    const key = req.headers.authorization
    if (!key) return res.status(401).send({'msg': 'Authorization parameter is not sended', 'status_code': 401})
    
    const project = await database.findOne({ 'ApiKey': key })
    if (project) next()
    else res.status(401).send({'msg': 'Authorization key is not right', 'status_code': 401})
}