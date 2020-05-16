// import { urlencoded } from "express"

console.log('Server side javascipt for signup')
// var request = require('request');

const signupForm = document.querySelector('#signup-form')
const inputPhoneNumber = document.querySelector('#inputPhoneNumber')
const inputPassword = document.querySelector('#inputPassword')
const inputAddress = document.querySelector('#inputAddress')
const inputLocality = document.querySelector('#inputLocality')
const inputName = document.querySelector('#inputName')
const inputRepeatPassword = document.querySelector('#inputRepeatPassword')
const showMessage = document.querySelector('#show-message')
const submitSignupButton = document.querySelector('#submitSignupButton')
const verifyMobileButton = document.querySelector('#verifyMobileButton')
const otpValue = document.querySelector('#otpValue')
const verifyOtpButton = document.querySelector('#verifyOtpButton')
const resendOtpButton = document.querySelector('#resendOtpButton')

verifyMobileButton.style.display = 'block'
otpValue.style.display = 'none'
submitSignupButton.style.display = 'none'
verifyOtpButton.style.display = 'none'
resendOtpButton.style.display = 'none'

var otp




// fetch("https://nexmo-nexmo-sms-verify-v1.p.rapidapi.com/send-verification-code?phoneNumber=917814664315&brand=shopping-cart", {
// 	"method": "POST",
// 	"headers": {
// 		"x-rapidapi-host": "nexmo-nexmo-sms-verify-v1.p.rapidapi.com",
// 		"x-rapidapi-key": "85d37d5b98msha19700952f1ac31p12084djsn7f12f857e874",
// 		"content-type": "application/x-www-form-urlencoded"
// 	},
// 	"body": {}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.log(err);
// });



verifyMobileButton.addEventListener('click', (e) => {

    //send OTP using API
    const mobile = inputPhoneNumber.value
    if (mobile.length !== 10) {
        return alert('invalid mobile number')
    }

    while(true){
        otp = Math.random() * 10000
        otp = parseInt(otp)

        if(otp>1000) break 
    }
    console.log(otp)

    
    fetch('/otp/'+mobile+'/'+otp, {
        method: 'GET'
    }).then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data)
    })
    // const sender = 'BIT'
    

    // var message = ('The OTP is ' + otp)

    // fetch("https://gurubrahma-smsly-sms-to-india-v1.p.rapidapi.com/sms/transactional/" + mobile + "/Your%2520otp%2520is%2520" + otp, {
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-host": "gurubrahma-smsly-sms-to-india-v1.p.rapidapi.com",
    //             "x-rapidapi-key": "88ffc44064msh2423487b3f4d888p1e52f8jsn23e1a065c8ad",
    //             "accept": "text/plain"
    //         }
    //     })
    //     .then(response => {
    //         console.log(response);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });

    // fetch("https://gurubrahma-smsly-sms-to-india-v1.p.rapidapi.com/otp/generate/" + mobile + "?getOTP=true&duration=500&digits=4&message=Your%20verification%20code%20is%20OTP_VALUE", {
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-host": "gurubrahma-smsly-sms-to-india-v1.p.rapidapi.com",
    //             "x-rapidapi-key": "88ffc44064msh2423487b3f4d888p1e52f8jsn23e1a065c8ad"
    //         }
    //     })
    //     .then(response => {
    //         console.log(response);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });

    // var request = require('request');
    // var options = {
    //     'method': 'POST',
    //     'url': 'https://http-api.d7networks.com/send?username=xvlu7403&password=oZT6fYNF&dlr-method=POST&dlr-url=https://4ba60af1.ngrok.io/receive&dlr=yes&dlr-level=3&from=smsinfo&content=This is the sample content sent to test &to=+91'+mobile,
    //     'headers': {
    //         "x-rapidapi-host": "d7-verify.p.rapidapi.com",
	// 	    "x-rapidapi-key": "88ffc44064msh2423487b3f4d888p1e52f8jsn23e1a065c8ad",
	// 	    "authorization": "972375nfegdmd82sjsdbdfs524",
	// 	    "content-type": "application/json",
	// 	    "accept": "application/json"
    //         },
    //     formData: {

    //         }
    // };
    // request(options, function (error, response) {
    //     if (error) throw new Error(error);
    //     console.log(response.body);
    // });


//     fetch("https://d7-verify.p.rapidapi.com/send", {
// 	"method": "POST",
// 	"headers": {
// 		"x-rapidapi-host": "d7-verify.p.rapidapi.com",
// 		"x-rapidapi-key": "88ffc44064msh2423487b3f4d888p1e52f8jsn23e1a065c8ad",
// 		"authorization": "972375nfegdmd82sjsdbdfs524",
// 		"content-type": "application/json",
// 		"accept": "application/json"
// 	},
// 	"body": {
// 		"mobile": mobile,
// 		"sender_id": "SMSInfo",
// 		"message": "Your otp code is {code}",
// 		"expiry": 900
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.log(err);
// });
        // });

    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Token aa563135620197769a6cdcfc898ec3bd85a32458");

    // var formdata = new FormData();
    // formdata.append("mobile", mobile);
    // formdata.append("sender_id", "BIT shopping-cart");
    // formdata.append("message", "Your otp code is {code}");
    // formdata.append("expiry", "900");
    // // formdata.append("Access-Control-Allow-Origin","https://d7networks.com/api/verifier/send")
    //     formdata.append("Access-Control-Allow-Origin","localhost:3000")
    // // : http://www.example.com

    // var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: formdata,
    //     redirect: 'follow'
    // };

    // fetch("https://d7networks.com/api/verifier/send", requestOptions)
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));

    



    //show buttons
    resendOtpButton.style.display = 'block'
    verifyMobileButton.style.display = 'none'
    otpValue.style.display = 'block'
    verifyOtpButton.style.display = 'block'
})

verifyOtpButton.addEventListener('click', (e) => {

    // fetch("https://gurubrahma-smsly-sms-to-india-v1.p.rapidapi.com/otp/verify/99020XXXXX/4/100/1234", {
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-host": "gurubrahma-smsly-sms-to-india-v1.p.rapidapi.com",
    //             "x-rapidapi-key": "88ffc44064msh2423487b3f4d888p1e52f8jsn23e1a065c8ad"
    //         }
    //     })
    //     .then(response => {
    //         console.log(response);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });

    


    console.log(otpValue.value)
    if (otp === parseInt(otpValue.value)) { //correct otp
        otpValue.style.display = 'none'
        verifyOtpButton.style.display = 'none'
        submitSignupButton.style.display = 'block'
        resendOtpButton.style.display='none'
    } else { //wrong otp 
        alert('Incorrect OTP')
        otpValue.value = ""
    }
})

//resending the otp
resendOtpButton.addEventListener('click', (e) => {
    const mobile = inputPhoneNumber.value
    if (mobile.length !== 10) {
        return alert('invalid mobile number')
    }

    while(true){
        otp = Math.random() * 10000
        otp = parseInt(otp)

        if(otp>1000) break 
    }
    console.log(otp)

    
    fetch('/otp/'+mobile+'/'+otp, {
        method: 'GET'
    }).then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data)
    })
})


//on clicking create accoutn button
signupForm.addEventListener('submit', (e) => {
    //stopping the webpage from reloading
    e.preventDefault()

    const name = inputName.value
    const mobile = inputPhoneNumber.value
    const password = inputPassword.value
    const repeatPassword = inputRepeatPassword.value
    const address = inputAddress.value
    const locality = inputLocality.value

    if (password !== repeatPassword) {
        return showMessage.textContent = "Passwords do not match"
    }

    var data = {
        "name": name,
        "mobile": mobile,
        "password": password,
        "address": address,
        "locality": locality
    }

    console.log(data)

    // fetch('/users', {method: 'POST', body: data}).then((response) => {
    //     response.json().then((data) => {
    //         console.log(data)
    //         // if()

    //     })
    // })
    fetch('/users/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data);
        // Do something with the returned data.
        if (status !== '400') {
            showMessage.textContent = "Account Created"
            alert("Account created")

        } else {
            showMessage.textContent = "Invalid details"
            alert("invalid details")
        }
    });
})

