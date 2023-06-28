const express = require('express')

const router  = express.Router()

// import controller
const {likePost , unlikePost} = require('../controller/likeController.js')
const {createPost , getAllPosts} = require('../controller/postController')
const {createComment} = require('../controller/commentController.js')
// mapping
router.post('/posts/post' , createPost)
router.get('/posts' , getAllPosts)

router.post('/likes/like' , likePost)
router.post('/likes/unlike' , unlikePost)

router.post('/comments/comment' , createComment)

module.exports = router