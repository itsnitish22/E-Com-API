const express = require('express')
const app = express()
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const morgan = require('morgan') //for logging when we send a req. to the server
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


//connecting to our db on mongodb
mongoose.connect('mongodb+srv://ecom:' + process.env.MONGO_ATLAS_PW + '@cluster0.zd0je.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(() => {
    console.log("MongoDB Connected!")
})
mongoose.Promise = global.Promise


app.use(morgan('dev')) //format how morgan is used (can't be changed)
app.use(bodyParser.urlencoded({ extended: false })) //parse urlencoded bodies, simple bodies will be parsed because of false
app.use(bodyParser.json()) //parse json data


//sending back headers for handling CORS (Cross Origin Request Sharing)
app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*')
    res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})


//request that has /products will be forwarded to productRoutes function in products.js
app.use('/products', productRoutes)

//request that has /orders will be forwaraded to orderRoutes function in products.js
app.use('/orders', orderRoutes)

//landing url
// app.use('/', (req, res, next) => {
//     res.status(200).json({
//         message: "On the landing page"
//     })
// })

//if request doesn't hit anyone of the above, it will log this error, and if the error is something different, it will forward the request to next which then will handle other errors
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status(404)
    next(error)
})

//errors other than normal errors will be handled here, so instead of HTML result, we now will get error when required
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

//other files will be able to access app, which here is an express instance
module.exports = app