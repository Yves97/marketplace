const express = require('express')
const router = express.Router()

//controllers
const {signup} = require('../controllers/users')

//validators
const {userSignUpValidator} = require('../validator')

router.post('/signup',userSignUpValidator,signup)

module.exports = router