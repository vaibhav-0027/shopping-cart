const express = require('express')
const Order = require('../models/order')
const router = new express.Router()
const auth = require('../middleware/auth')


//Adding a new order
router.post('/order/new', async (req,res) => {
    // console.log('new order request')
    if(req.session.user!='null') {
        // console.log('inside')
        // console.log(req.session.user)
        // console.log(req.session.user._id)
        // console.log(req.body)
        const order = new Order({
            ...req.body,
            owner: req.session.user._id
        })

        // console.log(order)
    
        try {
            await order.save()
            res.status(201).send(order)
        } catch (e) {
            res.status(400).send(e)
        }
    }
})

//show all accepted and delivered orders
router.get('/order/yayd', async(req,res) => {
    if(req.session.user.mobile === process.env.ADMIN_NAME){
        try{
            var orders = []
            orders = await Order.find({accepted:true, delivered:true})
            // console.log(orders)
            res.send(orders)
        } catch(e) {
            res.status(400).send(e)
        }
    } else {
        res.send({'message':'not authorized'})
    }
})

//orders accepted but not delivered
router.get('/order/yand', async(req,res) => {
    if(req.session.user.mobile === ADMIN_NAME){
        try{
            var orders = []
            orders = await Order.find({accepted:true, delivered:false})
            // console.log(orders)
            res.send(orders)
        } catch(e) {
            res.status(400).send(e)
        }
    } else {
        res.send({'message':'not authorized'})
    }
})

//show not accepted not delivered
router.get('/order/nand', async(req,res) => {
    if(req.session.user.mobile === ADMIN_NAME){
        try{
            var orders = []
            orders = await Order.find({accepted:false, delivered:false})
            // console.log(orders)
            res.send(orders)
        } catch(e) {
            res.status(400).send(e)
        }
    } else {
        res.send({'message':'not authorized'})
    }
})

//Showing all orders of current user
router.get('/order/me',async (req,res) => {
    if(!req.session.id){
        return res.send({"status":"not authenticated"})
    }

    try{
        var orders = []
        orders = await Order.find({owner:req.session.user._id})
        // console.log(orders)
        res.send(orders)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Find order by id
router.get('/order/:id', async (req,res) => {
    if(req.session.user.mobile !== process.env.ADMIN_NAME){
        return res.send({"message" : "not authenticated"})
    }

    try{
        var order
        order = await Order.findById(req.params.id)
        res.send(order)
    } catch (e) {
        res.send(e)
    }
})

//Find all orders of particular user
router.get('/order/user/:id', async (req,res) => {
    // const order = await Order.findById(req.params.id)
    // await order.populate('owner').execPopulate()
    // res.send(order.owner)
    if(!req.session.id)
        return res.render({"message" : "Not authenticated"})

    if(req.session.user.mobile === process.env.ADMIN_NAME){
        // console.log('inside')
        try{
            var orders = []
            orders = await Order.find({owner:req.params.id})
            // console.log(orders)
            res.send(orders)
        } catch (e) {
            res.status(400).send(e)
        }
    } else {
        return res.render({"status":"Not authenticated"})
    }
})

// router.get('/order/details/:id', async (req,res) => {

// })

//get name of owner using order id
router.get('/order/ownername/:id', async(req,res) => {
    // console.log(req.params._id)
    // if(req.session.user.mobile === '0000000000'){

        if(req.session.user.mobile !== process.env.ADMIN_NAME){
            return res.send({"message" : "not authenticated"})
        }

        try {
            // console.log(req.params._id)
            const order = await Order.findById(req.params.id)
            await order.populate('owner').execPopulate()
            res.send({"user":order.owner})
        } catch (e) {
            res.send(e)
        }
    // } 
    // else {
    //     res.send({"message":"something wrong happened"})
    // }
})

//Update the order status of accepted
router.patch('/order/updateAccepted/:id', async(req,res) => {
    // console.log('API request success')
    // console.log(req.params.id)
    // console.log(req.body)

    if(req.session.user.mobile !== process.env.ADMIN_NAME){
        return res.send({"message" : "not authenticated"})
    }

    try {
        var order = await Order.findByIdAndUpdate(req.params.id, req.body)
        // , { new: true, runValidators:true }
        res.status(201).send(order)
    } catch (e) {
        return res.status(400)
    }
})

//Update the order status of delivered
router.patch('/order/updateDelivered/:id', async(req,res) => {

    if(req.session.user.mobile !== process.env.ADMIN_NAME){
        return res.send({"message" : "not authenticated"})
    }
    
    try {
        var order = await Order.findByIdAndUpdate(req.params.id, req.body)
        // , { new: true, runValidators:true }
        res.status(201).send(order)
    } catch (e) {
        return res.status(400)
    }
})


module.exports = router 