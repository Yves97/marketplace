const express = require("express")
const router = express.Router()

//middleware
const {requireSignIn,isAdmin,isAuth} = require('../controllers/auth')

//controllers
const {create,categoryById,read,update,remove,list} = require('../controllers/category')
const {userById} = require('../controllers/user')

//routes
router.get('/category/:categoryId',read)
router.post('/category/create/:userId',requireSignIn,isAuth,isAdmin, create)
router.put('/category/:categoryId/:userId',requireSignIn,isAuth,isAdmin,update)
router.delete('/category/:categoryId/:userId',requireSignIn,isAuth,isAdmin,remove)
router.get('/categories',list)

router.param('userId',userById)
router.param('categoryId',categoryById)


module.exports = router
