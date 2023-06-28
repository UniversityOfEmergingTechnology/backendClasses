const express  = require('express')
const app = express()
const cookieParser = require('cookie-parser')

require('dotenv').config()

// middleware
app.use(cookieParser())
app.use(express.json())



// connecting the database
const connect = require('./config/database')
connect()

// import the routes and mount them
const user = require('./routes/user')

app.use('/api/v1' , user)

app.listen(process.env.PORT , () => {
    console.log("Server started successfully")
})