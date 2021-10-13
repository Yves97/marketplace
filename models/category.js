const mongoose = require('mongoose')
const {Schema,model} = mongoose

const categorySchema = new Schema({
    name : {
        type : String,
        trim : true,
        maxlength : 32,
        required : true
    }
},{timestamps : true})


module.exports = model('Category',categorySchema)
