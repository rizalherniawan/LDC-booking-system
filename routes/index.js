const api = require('express')()
const v1 = require('./v1/index')


api.use('/v1', v1)


module.exports = api
