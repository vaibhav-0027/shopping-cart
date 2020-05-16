console.log('Navbar maintainance javascipt loaded')

const dashboardButton = document.querySelector('#dashboardButton')
const loginButton = document.querySelector('#loginButton')
const logoutButton = document.querySelector('#logoutButton')
const aboutHeader = document.querySelector('#aboutHeader')
const contactHeader = document.querySelector('#contactHeader')
const usersHeader = document.querySelector('#usersHeader')
const ordersHeader = document.querySelector('#ordersHeader')
const productsHeader = document.querySelector('#productsHeader')

fetch('/users/me', {
    method: 'GET'
}).then((res) => {
    return res.json()
}).then((data) => {
    // console.log(data)

    if(jQuery.isEmptyObject(data)) {
        // console.log('null')
        dashboardButton.style.display = 'none'
        loginButton.style.display = 'block'
        logoutButton.style.display = 'none'
    } else {
        // console.log('!null')
        loginButton.style.display = 'none'
        dashboardButton.style.display = 'block'
        logoutButton.style.display = 'block'
    }

    if(data.name === "admin"){
       aboutHeader.style.display = 'none'
       contactHeader.style.display = 'none'
       usersHeader.style.display = 'block'
       ordersHeader.style.display = 'block'
       productsHeader.style.display = 'block'
    } else {
        aboutHeader.style.display = 'block'
        contactHeader.style.display = 'block'
        usersHeader.style.display = 'none'
        ordersHeader.style.display = 'none'
        productsHeader.style.display = 'none'
    }
});

logoutButton.addEventListener('click', (e) => {
    fetch('/users/logout', {
        method: 'POST'
    }).then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data)
        location.reload()
    })
})