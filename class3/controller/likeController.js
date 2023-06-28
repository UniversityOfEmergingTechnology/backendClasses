const Like = require("../models/likeModel");
const Post = require("../models/postModel");

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;
    const like = new Like({
      post,
      user,
    });
    const savedLike = await like.save();

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $push: { likes: savedLike._id },
      },
      {
        new: true,
      }
    );
    res.send({
        post : updatedPost
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
        error : "Not liked"
    })
  }
};

exports.unlikePost = async(req,res) => {
    try{
        const {post , like} = req.body

        const deletedLike = await Like.findOneAndDelete({post, _id : like })
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            {
              $pull: { likes: deletedLike._id },
            },
            {
              new: true,
            }
          );
          res.send({
              post : updatedPost
          })

    }
    catch(err){
        console.log(err)
    }
}