const auth = require('express')()
const authController = require('../../controller/auth')
const authentication = require('../../middleware/authentication')
const roleAuthorization = require('../../middleware/roleAuthorization')


auth.post('/add', authentication, roleAuthorization('admin'), authController.register)
auth.post('/login', authController.login)

module.exports = auth