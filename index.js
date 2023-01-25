const express = require('express'),
    cors = require('cors')
require("dotenv").config()

const app = express()
const port = process.env.PORT
const connect = require('./config/db')
const { Link } = require('./models/linkModels')
const { linkRoutes, userRoutes } = require('./routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
connect()

app.get('/', async (req, res) => {
    res.send('Boginoo Home')

})

app.use(linkRoutes)
app.use(userRoutes)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})