const mongoose = require('mongoose')
require('dotenv').config()

const connectWithDb = () => {
    mongoose.connect(process.env.DATABASE_URL , {
        useNewUrlParser : true ,
        useUnifiedTopology : true
    })
    .then(() => console.log("Connected to database has been done successfully"))
    .catch((err) => console.log(err))
}

module.exports = connectWithDb