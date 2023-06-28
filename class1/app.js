const express = require('express')
// this line imports express.js library allowing use to use its functionalities in our application
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
// we are creating an instance of an express application

// middleware
app.use(bodyParser.json())
// here we are telling our express app to use body parser. This middleware will parse incoming request bodies in a middleware before your handlers, available under req.body property.

// mongodb connection

const options = {
    // is used for using new url string parser instead of current string parser
    useNewUrlParser : true,
    useUnifiedTopology : true
    // is used to opt in to using the mongodb's driver's new connection management engine
}
// this line means that you are establishing a connection to a mongodb database
mongoose.connect('mongodb://localhost:27017' , options)
.then(() => console.log("Database connected succesfully"))
.catch((error) => console.log(error))


app.get('/' , (req,res) => {
    res.send("Hi our application is working fine")
})
// this line sets up a route handler for get request made to the root url /. When a get request is made to the root url the server sends a message 

app.post('/api/car' , (req,res) => {
    const {name , car} = req.body;

    console.log(name)
    console.log(car)
    res.send("Post request working fine")
})


const PORT = 3000
app.listen(PORT , () => {
    console.log(`Server  started successfully at ${PORT} using nodemon `)
})
// this line starts our server on defined port and logs a message on to the console once the server is up and running 