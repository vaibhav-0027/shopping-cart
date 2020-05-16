const mongoose = require('mongoose')
// const validator = require('validator')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

// productSchema.pre('save' async function(next) {
//     const product = this 

//     if(product.isMod)
// })
const Product = mongoose.model('Product', productSchema)

module.exports = Product 
