console.log('Client side js file has loaded!!')
// const fetch = require('node-fetch')

const loginForm = document.querySelector('#login-form')
const inputMobile = document.querySelector('#inputMobile')
const passwordId = document.querySelector('#inputPassword')
const showMessage = document.querySelector('#showMessage')

//on clicking login button

loginForm.addEventListener('submit', (e) => {

    //stopping the webpage from reloading
    
    e.preventDefault()

    const mobile = inputMobile.value 
    const password = passwordId.value 
    //received the values from the user

    // console.log(email,password)

    showMessage.textContent = 'Signing in...'

    // const id = '/users/login/'+mobile+'/'+password
    // console.log(id)
    // check for correctness and send to home page if correct else show a message of wrong credentials
    // fetch('/users/login/'+mobile+'/'+password, {method: 'POST'}).then((response) => {
    //     response.json().then((data) => {
    //         if(!data){
    //             showMessage.textContent = 'Wrong mobile number or password'
    //         } else {
    //             showMessage.textContent = 'Login successful'
    //         }
    //     })
    // })
    var data = {
        "mobile": mobile,
        "password": password
    }

    // console.log(data)

    // fetch('/users/login/'+mobile+"/"+password, {
    fetch('/users/login', { 
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data) ;
            // Do something with the returned data.
            if(data.status === "not logged in") {
                alert("invalid email or password")
                passwordId.value=""
                showMessage.textContent=""
            } else {
                alert("successfully logged in")
                setTimeout(() => {  location.reload(); }, 300);
                // location.reload()
            }
            // if(status!=='400') {
            //     // location.reload()
            //     showMessage.textContent = "Logged in successfully"
                
                
            // } else {
            //     showMessage.textContent = "Wrong mobile or password"
            // }
        });

})









