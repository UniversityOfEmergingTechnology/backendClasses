const mongoose = require('mongoose')

require('dotenv').config()

const connect = async(req,res) => {
    mongoose.connect(process.env.DATABASE_URL , {
        useNewUrlParser : true ,
        useUnifiedTopology : true
    })
    .then(() => console.log("Database connected "))
    .catch((Err) => console.log(Err.message))
}

module.exports = connect