const endPointLists = require('express-list-endpoints')

module.exports = (req, res, next) => {
    const endPoints = endPointLists(req.app)
    const path = req._parsedUrl.pathname
    const method = req.method
    var flag;

    for (let i = 0; i < endPoints.length; i++) {
        if (endPoints[i].path == path) {
            flag = 200
            for (let ı = 0; ı < endPoints[i].methods.length; ı++){
                if (endPoints[i].methods[ı] == method) break
                else flag = 405
            }
            
            break
        } else flag = 404
    }

    switch (flag) {
        case 404:
            res.status(404).send({'msg': 'Requseted path is not a valid path for us', 'status_code': 404})
            break;
        case 405:
            res.status(405).send({'msg': 'Requested method is not accaptable for this path', 'status_code': 405})
            break;
        default:
            next();
    }
}