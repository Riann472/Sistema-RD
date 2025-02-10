const express = require('express')
const cors = require("cors")
const db = require('./models')
const app = express()
const usersRoute = require('./routes/usersRoute')
const produtesRoute = require('./routes/produtesRouter')

require('dotenv').config()

app.use(express.json())
app.use(cors())
app.use('/users', usersRoute)
app.use('/produtos', produtesRoute)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('server rodando')
    })
}) 