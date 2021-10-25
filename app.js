//config
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require("cors")
const expressValidator = require('express-validator')


//import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')

//app
const app = express()

//db
mongoose
    .connect(process.env.DATABASE,{
        useNewUrlParser : true
    })
    .then(()=> console.log('DB connected'))
    .catch((err)=> console.log(`error ${err}`))

//middlewares
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())

//routes middleware
app.use('/api/v1',authRoutes)
app.use('/api/v1',userRoutes)
app.use('/api/v1',categoryRoutes)
app.use('/api/v1',productRoutes)

const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`App listen on port ${8000}`)
})

