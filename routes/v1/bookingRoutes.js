const system = require('express')()
const Booking = require('../../controller/System')
const authentication = require('../../middleware/authentication')
const roleAuthorization = require('../../middleware/roleAuthorization')

system.use(authentication)
system.post('/room', Booking.createSlot)
system.get('/room', Booking.lookSlot)
system.delete('/room/:id', roleAuthorization('admin'),Booking.deleteSlot)
system.put('/room', Booking.updateSlot)

module.exports = system