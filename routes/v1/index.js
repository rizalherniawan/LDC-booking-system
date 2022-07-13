const v1 = require('express')()
const system = require('./bookingRoutes')
const auth = require('./authRoutes')

v1.use('/auth', auth)
v1.use('/booking', system)

module.exports = v1