const Post = require('../models/postModel')

exports.createPost = async(req,res) => {
    try{
        const {title , body} = req.body;

        // another way to make a document in database
        const post = new Post({title,body})
        const savedPost = await post.save()

        res.json({
            post : savedPost
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send({
            error : "Error while creating post"
        })
    }
}

exports.getAllPosts = async(req,res) =>{
    try{
        const posts = await Post.find()
        // .populate("likes").exec()
        res.json({
            posts : posts
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            error : "Was not able to retrieve all the posts"
        })
    }

}