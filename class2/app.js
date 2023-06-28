const express = require('express')
const dotenv = require('dotenv')
const dbConnect = require('./config/database')


// require('dotenv').config()
dotenv.config()

// connect to your database
dbConnect()

// express instance
const app = express();

// middleware to parse
app.use(express.json())

// import the routes for todo app
const todoRoutes = require('./routes/todos')

// mounting the todos api
app.use('/api/v1',todoRoutes)





// start the server
const PORT  = process.env.PORT
app.listen(PORT , () => {
    console.log(`Server started at port number ${PORT}`)
})