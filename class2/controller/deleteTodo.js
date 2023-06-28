const Todo = require('../models/Todo')

exports.deleteTodo = async(req,res) => {
    try{
        const {id} = req.params;
        await Todo.findByIdAndDelete({_id : id})
        res.status(200).json({
            success : true,
            message:"Deleted succesfully"
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message:"Internval server error"
        })
    }

}