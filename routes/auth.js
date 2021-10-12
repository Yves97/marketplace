const express = require('express')
const router = express.Router()

//controllers
const {signup,signin,signout,requireSignIn} = require('../controllers/auth')

//validators
const {userSignUpValidator} = require('../validator')

router.post('/signup',userSignUpValidator,signup)
router.post('/signin',signin)
router.get('/signout',signout)


module.exports = router