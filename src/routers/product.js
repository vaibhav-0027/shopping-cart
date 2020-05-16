const express = require('express')
const Product = require('../models/product')
const router = new express.Router()
const multer = require('multer')
const path = require('path')
const sharp = require('sharp')

// const storage = multer.diskStorage({
//     destination: './public/uploads',
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

// function checkFileType(file, cb) {
//     // ALlow ext
//     const filetypes = /jpeg|jpg|png/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//     const mimetype = filetypes.test(file.mimetype)

//     if(mimetype && extname){
//         return cb(null,true)
//     } else {
//         cb('Error: images only')
//     }
// }

// const upload = multer({
//     storage: storage,
//     limits: {fileSize: 1000000},
//     fileFilter: function(req, file, cb) {
//         checkFileType(file, cb)
//     }
// }).single('avatar')

// var  = multer({dest: 'uploads/'})


//middleware for uploading file
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

//uploading image for a product
// router.post('/product/avatar/:id', upload.single('avatar'), async(req,res) => {
//     var buffer = await sharp(req.body).resize({
//         width: 250,
//         height: 250
//     }).png().toBuffer()

// var updateData = {
//     "avatar": buffer
// }

//     var product = await Product.findByIdAndUpdate(req.params.id, updateData)

//     // product.avatar = buffer 
//     // await product.save()

// res.status(200).send(product)
// }, (error, req,res, next) => {
//     res.status(400).send({error: error.message})
// })

// router.post('/upload', (req,res) => {
//     upload(req,res,(err) => {
//         if(err){
//             res.send('image too large')
//         }else {
//             console.log(req.file)
//             res.send('test')
//         }
//     })
// })

router.post('/upload',upload.single('avatar'), async (req, res) => {
    // console.log(req.file.buffer)
    // var buffer = await sharp(req.file.buffer).resize({
    //     width: 250,
    //     height: 250
    // }).png().toBuffer()

    // console.log(buffer)
    if(req.session.user.mobile !== process.env.ADMIN_NAME){
        return res.send({"message" : "not authenticated"})
    }

    var updateData = {
        "avatar": req.file.buffer
    }

    // console.log(req.body.id)
    // console.log(updateData)

    var product = await Product.findById(req.body.id)
    // console.log(product)
    var product = await Product.findByIdAndUpdate(req.body.id, updateData)
    // console.log(product)
    // res.status(200).send(product)
    return res.send('Image has been uploaded\n Go back')
    // console.log(req.body)
})

//Get product image
router.get('/product/avatar/:id', async (req, res) => {

    // if(req.session.user.mobile !== process.env.ADMIN_NAME){
    //     return res.send({"message" : "not authenticated"})
    // }

    try{
        const product = await Product.findById(req.params.id)

        if(!product || !product.avatar){
            throw new Error()
        }
        // console.log('product avatar')

        res.set('Content-Type', 'image/png')
        res.send(product.avatar)
    } catch(e) {
        res.status(404).send()
    }
})

// router.post('/product/new', upload.single('avatar'), async(req,res) => {
//     const buffer = await sharp(req.file.buffer).resize({
//         width: 250,
//         height: 250
//     }).png().toBuffer()

//     req.product.avatar = buffer 
//     await req.product.save()
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })

//Creating a new product
router.post('/product/new', async (req, res) => {

    if(req.session.user.mobile !== process.env.ADMIN_NAME){
        return res.send({"message" : "not authenticated"})
    }

    const product = new Product(req.body)

    try {
        await product.save()

        res.status(201).send({ product })
    } catch (e) {
        res.status(400).send(e)
    }
})

//Getting all the products
router.get('/product/all', async (req, res) => {
    try {
        var products = []
        products = await Product.find({})
        res.send(products)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Getting a product by id
router.get('/product/:id', async (req, res) => {

    if(req.session.user.mobile !== process.env.ADMIN_NAME){
        return res.send({"message" : "not authenticated"})
    }

    try {
        var product = await Product.findById(req.params.id)
        res.send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Updating a product
router.patch('/product/:id', async (req, res) => {

    if(req.session.user.mobile !== process.env.ADMIN_NAME){
        return res.send({"message" : "not authenticated"})
    }

    try {
        var product = await Product.findByIdAndUpdate(req.params.id, req.body)

        // if(!product) {
        //     return res.status(404).send({"message": "invalid details"})
        // }

        res.status(200).send(product)
    } catch (e) {
        res.status(400).send({ "message": "invalid details" })
    }
})

//Deleting a product
router.delete('/product/:id', async (req, res) => {

    if(req.session.user.mobile !== process.env.ADMIN_NAME){
        return res.send({"message" : "not authenticated"})
    }
    
    const product = await Product.findByIdAndDelete(req.params.id)

    try {
        if (!product) {
            return res.status(404).send()
        }

        res.send(product)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router






