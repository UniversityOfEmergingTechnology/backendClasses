const mongoose = require('mongoose')

require('dotenv').config()

const options = {
    useNewUrlParser : true,
    useUnifiedTopology : true
}

const dbConnect = () => {

    mongoose.connect(process.env.DATABASE_URL , options)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log(error))
}


module.exports = dbConnect;