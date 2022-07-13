const express = require('express')
const app = express()
const PORT = 8000
const api = require('./routes')
const cookieParser = require('cookie-parser')
const errorHandler = require('./handler/errorHandler')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api', api)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is connected to PORT: ${PORT}`)
})