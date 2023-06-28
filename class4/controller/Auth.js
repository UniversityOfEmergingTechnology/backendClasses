const bcrypt = require('bcrypt')
const user = require('../models/Users')
const jwt = require('jsonwebtoken')

require('dotenv').config()

exports.login = async(req,res) => {
    try{
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success : false , 
                message : "User need to pass all the details"
            })
        }

        let existingUser = await user.findOne({email})
        if(!existingUser){
            return res.status(401).json({
                success : false , 
                message : "Sign in first Please"
            })
        }
        const payload = {
            email : existingUser.email , 
            id : existingUser._id,
            role : existingUser.role
        }
        if(await bcrypt.compare(password , existingUser.password)){
            let token = jwt.sign(payload , process.env.JWT_SECRET, {
                expiresIn : "2h"
            })
            let existingUserObject = existingUser.toObject()
            existingUserObject.token = token
            delete existingUserObject.password;

            const options = {
                expiresIn : new Date(Date.now() + 3*24*60*60 *1000),
                httpOnly : true
            }

            res.cookie("token" , token , options).status(200).json({
                success : true,
                token ,
                existingUser : existingUserObject,
                message: "User has logged in succesfully"
            })
        }
        else{
            return res.status(401).json({
                success : false , 
                message : "Password is wrong"
            })
        }
    }
    catch(Err){
        console.log(Err)
    }
}

exports.signup = async(req,res) => {
    try{
        const {name,email,password,role} = req.body;

        const existingUser = await user.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success : false,
                message : "User already exists"
            })
        }
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password , 10)
        }
        catch(err){
            console.log(err)
            return res.status(400).json({
                success : false,
                message : "Hashing failed for some reason"
            })
        }
        const newUser = await user.create({
            name ,
            email ,
            password : hashedPassword,
            role
        })
        return res.status(200).json({
            success : true,
            message: "User created succesfully"
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }



}