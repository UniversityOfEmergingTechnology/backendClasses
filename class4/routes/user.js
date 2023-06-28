const express = require('express')
const router = express.Router()

// import
const {signup , login} = require('../controller/Auth')
const { auth , isStudent , isAdmin } = require('../middlewares/auth')

router.post('/signup' , signup)
router.post('/login' , login)


// protected routes
router.get('/test' , auth, (req,res) => {
    res.json({
        success : true , 
        message : "Welcome to the protected route for tests",
        data : req.user
    })
})

router.get('/student' , auth , isStudent , (req,res) => {
    res.json({
        success : true , 
        message : "Welcome to protected routes for students"
    })
} )
router.get('/admin' , auth , isAdmin , (req,res) => {
    res.json({
        success : true , 
        message : "Welcome to protected routes for admin"
    })
} )

module.exports = router
