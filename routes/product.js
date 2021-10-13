const express = require('express')
const router = express.Router()


//controllers
const {create} = require('../controllers/product')

//user middlewares
const {isAdmin,isAuth,requireSignIn} = require('../controllers/auth')

//get user id param
const {userById} = require("../controllers/user")

router.post('/product/create/:userId', requireSignIn,isAuth, isAdmin , create)


router.param("userId",userById)

module.exports = router