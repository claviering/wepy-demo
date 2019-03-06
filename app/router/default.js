const path = require('path')
const router = require('express').Router()
const defaultCtrl = require(path.resolve('./app/controller/default.js'))
const middleware = require(path.resolve('./app/middleware/authority'))

router.get('/', defaultCtrl.default)
router.post('/dec', defaultCtrl.dec)
router.post('/login', defaultCtrl.dec)
router.post('/register', defaultCtrl.register)
router.post('/addinfo', defaultCtrl.addInfo)
router.get('/getinfo', defaultCtrl.getInfo)

module.exports = router