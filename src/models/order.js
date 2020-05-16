const mongoose = require('mongoose')
const User = require('./user')

const orderSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    accepted: {
        type: Boolean,
        default: false 
    },
    delivered: {
        type: Boolean,
        default: false 
    },
    order: [{
        item:String,
        qty:Number 
    }]
},{
        timestamps: true 
    }
)

const Order = mongoose.model('Order', orderSchema)

module.exports = Order 