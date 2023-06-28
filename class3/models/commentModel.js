const mongoose = require('mongoose')


const commentSchema = mongoose.Schema({
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post" //this gives reference to post model
    },
    user : {
        type : String , 
        required : true
    },
    body : {
        type : String , 
        required : true
    }
})

module.exports = mongoose.model('Comment' , commentSchema)
