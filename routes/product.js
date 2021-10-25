const express = require('express')
const router = express.Router()


//controllers
const {create,productById,read,remove,update,list,listRelated,listCategories,listBySearch,photo} = require('../controllers/product')

//user middlewares
const {isAdmin,isAuth,requireSignIn} = require('../controllers/auth')

//get user id param
const {userById} = require("../controllers/user")

router.get('/product/:productId',read)
router.post('/product/create/:userId', requireSignIn,isAuth, isAdmin , create)
router.delete('/product/:productId/:userId', requireSignIn,isAuth,isAdmin,remove)
router.put('/product/:productId/:userId', requireSignIn,isAuth,isAdmin,update)

router.get('/products',list)
router.get('/products/related/:productId',listRelated)
router.get('/products/categories',listCategories)
router.post('/products/by/search',listBySearch)
router.get("/product/photo/:productId",photo)

router.param("userId",userById)
router.param("productId",productById)

module.exports = router