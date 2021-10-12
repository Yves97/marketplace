//import Model
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

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

exports.signin = (req,res)=> {
    //rechercher l'utilisateur par son mail
    const {email,password} = req.body
    User.findOne({email},(err,user)=>{
        //si l'utilisateur n'est pas trouvé
        if(err || !user){
            return res.status(400).json({
                error : "L'utilisateur que vous avez choisi n'exite pas"
            })
        }

        //si l'utilisateur est trouvé, s'assurer que l'email et le mot de passe correspondent
        //creation de la méthode d'authentification dans le user model
        if(!user.authenticate(password)){
            return res.status(401).json({
                error : "Email and password dont match"
            })
        }

        //generation du token via l'user id et le secret JWT
        const token = jwt.sign({_id : user._id},process.env.JWT_SECRET)
        //faire persister le token temporaire dans les cookies avec une date d'expiration
        res.cookie('t',token , {expire : new Date() + 9999})
        //retourner la reponse à au client
        const {_id,name,email,role} = user
        return res.json({token,user: {_id,email,name,role}})
    })
}

exports.signout = (req,res) => {
    res.clearCookie('t')
    res.json({message : 'deconnection réussit avec succès !'})
}

exports.requireSignIn = expressJwt({
    secret : process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty : 'auth'
})

exports.isAuth = (req,res,next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user){
        return res.status(403).json({
            error : "Access Denied"
        })
    }
    next()
}

exports.isAdmin = (req,res,next) => {
    if(req.profile.role === 0){
        return res.status(400).json({
            error : "Admin ressources ! Access denied"
        })
    }
    next()
}

