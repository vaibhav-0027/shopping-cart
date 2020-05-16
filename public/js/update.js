console.log('update javascript file has loaded!!')

// const robot = require('robotjs')

const updateForm = document.querySelector('#update-profile-form')
const inputPhoneNumber = document.querySelector('#inputPhoneNumber')
const inputPassword = document.querySelector('#inputPassword')
const inputAddress = document.querySelector('#inputAddress')
const inputLocality = document.querySelector('#inputLocality')
const inputName = document.querySelector('#inputName')
const inputRepeatPassword = document.querySelector('#inputRepeatPassword')
// const oldInputPassword = document.querySelector('#oldInputPassword')

// inputPhoneNumber.value = mobile
// inputAddress.value = address
// inputName.value = name
// inputLocality.value = locality
fetch('/users/me', {
    method: 'GET'
}).then((res) => {
    return res.json()
}).then((data) => {
    inputPhoneNumber.value = data.mobile
    inputAddress.value = data.address
    inputName.value = data.name
    inputLocality.value = data.locality
})

updateForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = inputName.value
    const mobile = inputPhoneNumber.value
    const password = inputPassword.value
    const repeatPassword = inputRepeatPassword.value
    const address = inputAddress.value
    const locality = inputLocality.value

    if (password !== repeatPassword) {
        return alert("entered passwords do not match")
    }

    var updateData = {
        "name": name,
        "mobile": mobile,
        "password": password,
        "address": address,
        "locality": locality
    }

    fetch('/users/me', {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    }).then((res) => {
        return res.json()
    }).then((data) => {
        if (data.message === "invalid details") {
            alert("invalid information")
        } else {
            alert("profile has been updated")
            //press enter
            // setTimeout(() => { robot.keyTap('enter') }, 500);
            // robot.keyTap('enter')
            // location.reload()
        }
    })
})

