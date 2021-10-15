const formidable = require('formidable')
const _ = require('lodash')
const fs = require("fs")

//model
const Product = require('../models/product')

const {errorHandler} = require("../helpers/dbErrorHandler") 


exports.productById = (req,res,next,id) => {
    Product.findById(id).exec((err,product)=>{
        if(err || !product){
            return res.status(400).json({
                error : "Produit non trouvé"
            })
        }
        req.product = product
        next()
    })
    
}

exports.read = (req,res) => {
    req.product.photo = undefined
    return res.json(req.product)
}

exports.create = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err,fields,files) => {
        if(err){
            return res.status(400).json({
                error : "L'image ne peut être uploader"
            })
        }


        //check for fields
        const {name,description,price,category,quantity,shipping} = fields
        
        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error : "Tout les champs sont requis"
            })
        }

        let product = new Product(fields)
        if(files.photo){
            if(files.photo.size > 100000){
                return res.status(400).json({
                    error : "L'image est doit être inférieur a 1MB"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    error : errorHandler(err)   
                })
            }
            res.json({result})
        })

    })
}

exports.remove = (req,res) => {
    let product = req.product

    product.remove((err,deletedProduct)=>{
        if(err){
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
        res.json({
            "message": "Produit supprimé avec succès"
        })
    })
}

exports.update = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err,fields,files) => {
        if(err){
            return res.status(400).json({
                error : "L'image ne peut être uploader"
            })
        }


        //check for fields
        const {name,description,price,category,quantity,shipping} = fields
        
        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error : "Tout les champs sont requis"
            })
        }

        let product = req.product

        product = _.extend(product,fields)

        if(files.photo){
            if(files.photo.size > 100000){
                return res.status(400).json({
                    error : "L'image est doit être inférieur a 1MB"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    error : errorHandler(err)   
                })
            }
            res.json({result})
        })

    })
}


