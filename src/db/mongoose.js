const mongoose = require('mongoose')

// mongoose.connect('mongodb://127.0.0.1:27017/shopping-cart-api', {
//     useNewUrlParser: true, 
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// })

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true, 
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    
    console.log('online db connected..')
}

module.exports = connectDB