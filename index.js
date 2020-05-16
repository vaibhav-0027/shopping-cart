require('dotenv').config()
const connectDB = require('./src/db/mongoose')
const express = require('express')
const userRouter = require('./src/routers/user')
const orderRouter = require('./src/routers/order')
const productRouter = require('./src/routers/product')
const hbs = require('hbs')
const path = require('path')
const session = require('express-session')

connectDB()

// const Nexmo = require('nexmo');
// const nexmo = new Nexmo({
//   apiKey: '56be76ad',
//   apiSecret: 'cbF563ouLkee0gDb'
// });

// var request = require('request');
// const FormData = require('form-data')
// const admin = require('express-session')

const app = express()
const port = process.env.PORT

// Define paths for Express config
// const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//we have to maintain session when user signs in
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true 
}))

// app.use(admin({
//     secret: 'thisIsMySecretKey',
//     resave: false,
//     saveUninitialized: true
// }))

// Setup static directory to serve
app.use('/public', express.static(path.join(__dirname, 'public')))
// console.log('/public',path.join(__dirname, 'public'))

app.use(express.json())
app.use(userRouter)
app.use(orderRouter)
app.use(productRouter)

// var authToken=''

app.get('/',(req,res) => {
    // if(req.session.user.name === 'admin') {
    //     return res.render('adminIndex', req.admin.user)
    // }
    res.render('index', req.session.user)
})

app.get('/home', (req,res) => {
    res.render('index', req.session.user )
})

app.get('/contact', (req,res) => {
    res.render('contact', req.session.user )
})

app.get('/about', (req,res) => {
    res.render('about', req.session.user )
})

app.get('/login', (req,res)=> {
    res.render('login', req.session.user)
})

app.get('/signup', (req,res) => {
    res.render('signup')
})

app.get('/users', (req,res) => {
    res.render('usersAdmin', req.session.user)
})

app.get('/orders', (req,res) => {
    res.render('ordersAdmin', req.session.user)
})

app.get('/dashboard', (req,res) => {
    res.render('dashboard', req.session.user )
})

app.get('/addproduct', (req,res) => {
    res.render('addProduct', req.session.user)
})

app.get('/user/order/:id', (req,res) => {
    res.render('ordersUser', req.session.user)
})

app.get('/product/update/:id', (req,res) => {
    res.render('updateProduct', req.session.user)
})

app.get('/order/details/:id', (req,res) => {
    
    // console.log({
    //     "user":req.session.user,
    //     "uid":req.params.id
    // })
    // res.render('orderDetails',{
    //     "user":req.session.user,
    //     "uid":req.params.id
    // })

    // fetch('/order/ownername/'+req.params.id, {
    //     method:'GET'
    // }).then((res) => {
    //     return res.json()
    // }).then((data) => {
    //     console.log(data)
    //     return res.send(data)
    // })

    res.render('orderDetails', req.session.user)

    // res.send({
    //     "user":req.session.user,
    //     "uid":req.params.id
    // })
    // res.render('orderDetails')

})

app.get('/order/update/:id', (req,res) => {
    res.render('updateStatus', req.session.user)
})

app.get('/products', (req,res) => {
    res.render('productsAdmin', req.session.user)
})

app.get('/dashboard/update', (req,res) => {
    res.render('update', req.session.user)
})

app.get('*', (req,res) => {
    res.render('404page', req.session.user )
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})












