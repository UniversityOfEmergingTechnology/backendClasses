const express = require('express')
const app = express()

require('dotenv').config()

//middleware
app.use(express.json())

const blog = require('./routes/blog')

// mount
app.use('/api/v1',blog)

// database
const connectWithDb = require('./config/database')
connectWithDb()

app.listen(process.env.PORT , () => {
    console.log("Server has been started succesfully")
})
