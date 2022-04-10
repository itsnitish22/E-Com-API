const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /orders'
    })
})

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'Handling POST request to /orders',
        order: order
    })
})

router.get('/:orderId', (req, res, next) => {
    const id = req.params.productId
    res.status(200).json({
        message: "GET with orderId " + id
    })
})

router.post('/:orderId', (req, res, next) => {
    const id = req.params.productId
    res.status(201).json({
        message: "POST with orderId " + id
    })
})

router.patch('/:orderId', (req, res, next) => {
    const id = req.params.productId
    res.status(200).json({
        message: "PATCH on orderId " + id
    })
})

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.productId
    res.status(200).json({
        message: "DELETE orderId " + id
    })
})

module.exports = router