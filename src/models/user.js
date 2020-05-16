const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Order = require('./order')

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true 
    },
    mobile: {
        type: Number,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 10,
        maxlength:10
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    address: {
        type: String,
        trim: true,
        required: true 
    },
    locality: {
        type: String,
        trim: true,
        required: true 
    },
    tokens: [{
        token: {
            type: String,
            required: true 
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true 
})

//Creating a virtual property for accessing orders associated to a particular user
userSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'owner' 
})

//hashing the password before saving
userSchema.pre('save', async function(next) {
    const user = this 

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

//Creating authentication token for a login
userSchema.methods.generateAuthToken = async function () {
    const user = this 
    const token = jwt.sign({ _id: user._id.toString()}, process.env.AUTH_KEY)
    
    user.tokens = user.tokens.concat({token})
    await user.save() 

    return token 
}

//checking credentials before logging in a user
userSchema.statics.findByCredentials = async (mobile, password) => {
    const user = await User.findOne({ mobile })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

//removing the hashed password and the tokens from the response that would be sent through an API request.
userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens 

    return userObject //returning the updated JSON object to send function for sending in the request
}

const User = mongoose.model('User', userSchema)

module.exports = User






