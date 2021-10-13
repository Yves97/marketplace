const express = require("express")
const router = express.Router()

//middleware
const {requireSignIn,isAdmin,isAuth} = require('../controllers/auth')

//controllers
const {create} = require('../controllers/category')
const {userById} = require('../controllers/user')

//routes
router.post('/category/create/:userId',requireSignIn,isAuth,isAdmin, create)


router.param('userId',userById)


module.exports = router
