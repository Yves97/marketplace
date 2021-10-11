//import Model
const User = require('../models/users')

const {errorHandler} = require("../helpers/dbErrorHandler") 


exports.signup = (req,res)=> {
    console.log('body',req.body)
    const user = new User(req.body)
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
        user.salt= undefined
        user.hash_password = undefined
        res.json({user})
    })
    
}