const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

// var messagebird = require('messagebird')('DAGAiOC75znRGlvoLZ42KFvNq');

//     var params = {
//       'originator': 'MessageBird',
//       'recipients': [
//         'RECIPIENT'
//     ],
//       'body': 'This is a test message'
//     };

//     messagebird.messages.create(params, function (err, response) {
//       if (err) {
//         return console.log(err);
//       }
//       console.log(response);
//     });

const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_SECRET
  });


// Sending otp to user using nexmo
router.get('/otp/:phone/:otp', (req,res) => {
    const from = 'shopping-cart';
    const to = '91' + req.params.phone;
    const text = 'Your One Time Password is ' + req.params.otp;

    nexmo.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
                res.send({"message" : "ok"})
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                res.send({"message" : "no"})
            }
        }
    })
})

//Creating a new user
router.post('/users/signup', async (req,res) => {
    const user = new User(req.body)

    try {
        await user.save()
        
        //send welcome message
        const from = 'shopping-cart';
        const to = '91' + user.mobile
        const text = 'Dear ' + user.name + ', We welcome you to our shopping-cart family. We always try to satisfy our customers and hope you have fun using this.\n -Team Shopping-cart'

        nexmo.message.sendSms(from, to, text, (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                if(responseData.messages[0]['status'] === "0") {
                    console.log("Message sent successfully.");
                    // return res.send({"message" : "ok"})
                    return 
                } else {
                    console.log("Message failed");
                    return 
                    // res.send({"message" : "no"})
                }
            }
        })

        res.status(201).send({user})
    } catch(e) {
        res.status(400).send(e)
    }
})

//Logging in for a user using mobile and password
// router.post('/users/login/:mobile/:password', async (req,res) => {
router.post('/users/login', async (req,res) => {
    // console.log('login request')
    try {
        if(req.body.mobile === process.env.ADMIN_NAME && req.body.password === process.env.ADMIN_PASSWORD){
            req.session.user = {
                'name': 'admin',
                'mobile': process.env.ADMIN_NAME,
                'uid': '',
                'locality': 'BIT',
                'address': 'BIT'
            }
            // req.session.user = null
            return res.send({"status":"logged in"})
        }
        // console.log(req.params.mobile, req.params.password)
        // const user = await User.findByCredentials(req.params.mobile, req.params.password) 
        const user = await User.findByCredentials(req.body.mobile, req.body.password)
        // const token = await user.generateAuthToken()
        req.session.user = user
        // res.send({ user })
        res.send({"status":"logged in"})
        // res.send({ user, token })
        
    } catch (e) {
        res.status(400).send({ "status": "not logged in" })
    }
})

//Logging out an already logged in user
router.post('/users/logout', async (req, res) => {
    try {
        req.session.user=null
        // req.admin.user = null
        //redirect to home
        res.send({'logout':'true'})
        // res.redirect('home')
        
    } catch (e) {
        res.status(500).send()
    }
})

//Showing details of the current user
router.get('/users/me', (req,res) => {
    // res.send(req.user)
    // console.log("requested")
    if(!req.session.user) {
        return res.send({ 
            // "name": "not logged in"
         })
        
    } 
    // if(!authToken) {
    //     return res.send("<h1>authenticate please</h1>")
    // }

    return res.send(req.session.user)
})

//Getting the list of all users
router.get('/users/all', async (req,res) => {
    // try {
    //     const users = await User.find({})
    //     console.log(users)
    //     res.send(users)
    // } 
    // if(req.session.user !== 'null'){
    //     if(req.session.user.name === 'admin'){

    if(req.session.user.mobile !== process.env.ADMIN_NAME){
        return res.send({
            "message" : "not authorized"
        })
    }

            try{
                var users = []
                users = await User.find({  })
                // console.log(orders)
                res.send(users)
            } catch(e) {
                res.status(400).send(e)
            }
    //     } else {
    //         res.send({'message':'not authorized'})
    //     }
    // }
    
})

//Getting user information from his id
router.get('/users/:id', async (req,res) => {
    // const _id = req.params.id 

    try {
        const user = await User.findById(req.params.id)
        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch(e) {
        res.status(500).send(e)
    }
})



//Updating the details currently logged in user
router.patch('/users/me', async (req,res) => {
    // const updates = Object.keys(req.body)
    // const allowedUpdates = ['name', 'mobile', 'password', 'address', 'locality']
    // const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // if (!isValidOperation) {
    //     return res.status(400).send({ 'message': 'invalid details' })
    // }

    try {
        const user = await User.findByIdAndUpdate(req.session.user._id, req.body, { new: true, runValidators:true })

        if(!user){
            return res.status(404).send({ "message":"invalid details" })
        }
        
        res.send({'message':'valid details'})
    } catch(e) {
        res.status(400).send({ "message":"invalid details" })
    }
})

//Deleting the currently logged in user
router.delete('/users/me', auth, async (req,res) => {

    const user = await User.findByIdAndDelete(req.user._id)

    try {
        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch(e) {
        res.status(500).send()
    }

})

module.exports = router 











