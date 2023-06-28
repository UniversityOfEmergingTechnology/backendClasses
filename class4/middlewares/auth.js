const jwt = require('jsonwebtoken')

require('dotenv').config()


exports.auth = (req,res,next) => {
    try{
        const token = req.cookies.token 
        // req.body
        // req.header("Authorization").replace(Bearer , "")
        if(!token){
            res.status(400).json({
                success : false,
                message : "token not available"
            })
        }

        try{
            const decode = jwt.verify(token , process.env.JWT_SECRET)
            req.user = decode
        }
        catch(err){
            console.log(err)
            res.status(400).json({
                success : false , 
                message : "Token is invalid"
            })
        }
        next()
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success : false , 
            message : "Internal server error"
        })
    }
}

exports.isStudent = (req,res,next) => {
    try{
        if(req.user.role !== 'Student'){
            return res.status(400).json({
                success:false , 
                message : "This is a protected route for students"
            })
        }
        next()
    }
    catch(err){
        console.log(err)
    }
}
exports.isAdmin = (req,res,next) => {
    try{
        if(req.user.role !== 'Admin'){
            return res.status(400).json({
                success:false , 
                message : "This is a protected route for admin"
            })
        }
        next()
    }
    catch(err){
        console.log(err)
    }
}