const Post = require('../models/postModel')
const Comment = require('../models/commentModel')

exports.createComment = async(req,res) => {
    try{
        const {post , user , body} = req.body
        const comment = new Comment({
            post ,
            user , 
            body
        })
        const savedComment = await comment.save()

        // find the post by id and add a new comment to its comments array
        // push operator is used to update the entry and pull operator will just delete

        const updatedPost = await Post.findByIdAndUpdate(post , {
            $push : {comments : savedComment._id}
        } , 
        {
            new:true
        })
        // .populate('comments').exec()
        res.json({
            post : updatedPost
        })
    }
    catch(err){
        console.log(err)
    }
}