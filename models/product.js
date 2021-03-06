const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types


const productSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,         
        required : true,
        maxlength : 32,
    },
    description : {
        type : String,
        maxlength : 2000,
        required : true
    },
    price : {
        type : Number,
        maxlength : 32,
        required : true,
        trim : true 
    },
    category : {
        type : ObjectId,
        ref : 'Category',
        required : true
    },
    quantity : {
        type : Number
    },
    sold : {
        type : Number,
        default : 0
    },
    photo : {
        data : Buffer,
        contentType : String
    },
    shipping : {
        required : false,
        type : Boolean
    }


}, {timestamps : true})


module.exports = mongoose.model('Product',productSchema)