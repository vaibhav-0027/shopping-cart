console.log('Home page javascipt loaded')

const checkoutButton = document.querySelector('#checkoutButton')
// const itemCounters = document.querySelectorAll('.itemCount')
const loginWarning = document.querySelector('#loginWarning')
const confirmOrderButton = document.querySelector('#confirmOrderButton')
const showCurrentOrderBody = document.querySelector('#showCurrentOrderBody')
const closeModalButton = document.querySelector('#closeModalButton')


// console.log(checkoutButton)
var data=[]
// console.log(itemCounters)

// fetch('/users/me', {
//     method: 'GET'
// }).then((res) => {
//     return res.json()
// }).then((data) => {
//     // console.log(data.name)

//     if(jQuery.isEmptyObject(data)) {
//         console.log('null')
//         loginWarning.style.display='block'
//         // dashboardButton.style.display = 'none'
//         // loginButton.style.display = 'block'
//         // logoutButton.style.display = 'none'
//         // itemCounters.style.display = 'none'
//         itemCounters.forEach(function(e) {
//             e.style.display='none'
//         })
//         checkoutButton.style.display = 'none'
//     } else {
//         console.log('!null')
//         loginWarning.style.display='none'
//         // loginButton.style.display = 'none'
//         // dashboardButton.style.display = 'block'
//         // logoutButton.style.display = 'block'
//         // itemCounters.style.display = 'block'
//         itemCounters.forEach(function(e) {
//             e.style.display='block'
//             e.value=0
//         })
//         checkoutButton.style.display = 'block'
//     }
// });

function appendData(data) {
    var mainContainer = document.getElementById('productList')

    $('productList').html('')

    if(data.length === 0) {
        var div = document.createElement("div")
        div.innerHTML = div.innerHTML + 'No Products found!!'
        mainContainer.appendChild(div)

        // console.log(div)

        const itemCounters = document.querySelectorAll('.itemCount')
        console.log('products displayed...time for hiding stuff')

        fetch('/users/me', {
            method: 'GET'
        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data.name)
        
            if(jQuery.isEmptyObject(data)) {
                console.log('null')
                loginWarning.style.display='block'
                // dashboardButton.style.display = 'none'
                // loginButton.style.display = 'block'
                // logoutButton.style.display = 'none'
                // itemCounters.style.display = 'none'
                checkoutButton.style.display = 'none'
                itemCounters.forEach(function(e) {
                    e.style.display='none'
                })
            } else {
                console.log('!null')
                loginWarning.style.display='none'
                // loginButton.style.display = 'none'
                // dashboardButton.style.display = 'block'
                // logoutButton.style.display = 'block'
                // itemCounters.style.display = 'block'
                checkoutButton.style.display = 'block'
                itemCounters.forEach(function(e) {
                    e.style.display='block'
                    e.value=0
                })
            }
        });

        return
    }

    
    for(var i=0; i<data.length; i+=2){
        var div = document.createElement("div")
        div.className = "row"
        // console.log(data[i].price,data[i+1].price)
        div.innerHTML = div.innerHTML + '<div class="card col-md-6 col-sm-6" style="width: 18rem;"><img id="' + data[i].name + 'Image"class="card-img-top"src="/product/avatar/' + data[i]._id + '"alt="'+data[i].name +'"><div class="card-body"><div class="row"><p class="card-text">' + data[i].name + ' Cost:' + data[i].price +  '</p></div><div class="row"><input name="'+ data[i].name +'" cost="' + data[i].price + '" min="0" class="itemCount"type="number" id="' +data[i].name + 'Count"></div></div></div>'
        if(i+1 < data.length)
        div.innerHTML = div.innerHTML + '<div class="card col-md-6 col-sm-6" style="width: 18rem;"><img id="' + data[i+1].name + 'Image"class="card-img-top"src="/product/avatar/' + data[i]._id + '"alt="'+data[i+1].name +'"><div class="card-body"><div class="row"><p class="card-text">' + data[i+1].name + ' Cost:' + data[i+1].price +  '</p></div><div class="row"><input name="'+ data[i+1].name +'" cost="' + data[i+1].price + '" min="0" class="itemCount"type="number" id="' +data[i+1].name + 'Count"></div></div></div>'

        mainContainer.appendChild(div)
        console.log(div) 
    }

    const itemCounters = document.querySelectorAll('.itemCount')

    console.log('products displayed...time for hiding stuff')

    fetch('/users/me', {
        method: 'GET'
    }).then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data.name)
    
        if(jQuery.isEmptyObject(data)) {
            console.log('null')
            loginWarning.style.display='block'
            // dashboardButton.style.display = 'none'
            // loginButton.style.display = 'block'
            // logoutButton.style.display = 'none'
            // itemCounters.style.display = 'none'
            checkoutButton.style.display = 'none'
            itemCounters.forEach(function(e) {
                e.style.display='none'
            })
        } else {
            console.log('!null')
            loginWarning.style.display='none'
            // loginButton.style.display = 'none'
            // dashboardButton.style.display = 'block'
            // logoutButton.style.display = 'block'
            // itemCounters.style.display = 'block'
            checkoutButton.style.display = 'block'
            itemCounters.forEach(function(e) {
                e.style.display='block'
                e.value=0
            })
        }
    });

    // for(var i=0; i<data.length; ++i) {
    //     var picId = data[i].name + 'Image'
    //     // console.log(data[i]._id)
    //     fetch('/product/avatar/'+data[i]._id, {
    //         method: 'GET'
    //     }).then((res) => {
    //         return res.json()
    //     }).then((data) => {
    //         // picId.value = data 
    //         // document.getElementById(picId).src = data
    //         console.log(data)  
    //     })
    // }

}


fetch('/product/all', {
    method: 'GET'
}).then((res)=>{
    return res.json()
}).then((data) => {
    //Received all the products in an array
    console.log(data)
    appendData(data)
})


var sendThisData

checkoutButton.addEventListener('click', (e) => {
    data=[]
    var mainContainer = document.getElementById("showCurrentOrderBody")
    $('#showCurrentOrderBody').html('')

    const itemCounters = document.querySelectorAll('.itemCount')

    itemCounters.forEach(element => {
        var div = document.createElement("div")
        // console.log(element.name)
        // data.push({})
        div.innerHTML = div.innerHTML + '<div class="row">     '
        if(element.value!=='0'){
            console.log(element)
            // console.log(element.name)
            // console.log(parseInt(element.value))
            // console.log(element.cost)
            var uid = element.name + 'Count'
            console.log($(uid).cost)
            div.innerHTML = div.innerHTML + element.name + " : " + parseInt(element.value,10) + " : " + parseInt(element.vaue,10)*parseInt(element.cost,10) + "<br>"
            data.push({
                "item":element.name,
                "qty": parseInt(element.value,10)   
                // "cost": element.cost
            })
        }
        div.innerHTML = div.innerHTML + '</div>'
        mainContainer.appendChild(div)
    })

    if(data.length === 0){
        return alert('No items selected')
        // return closeModalButton.click()
    }

    // console.log(data)

    sendThisData = {
        "order": data 
    }

    $('#showCurrentOrder').modal('toggle')

    console.log(JSON.stringify(sendThisData))
    // mainContainer.appendChild(modalString)
    // showCurrentOrderBody.textContent = modalString 

    // showCurrentOrder karna toh hai but abhi nahi aata
    //abhi sidha new order API request.

    // var modalString = ""
    // for(var i=0; i<sendThisData.length; ++i)

    // fetch('/order/new', {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(sendThisData)
    // }).then((res) => {
    //     return res.json()
    // }).then((data) => {
    //     if(status !== '400') {
    //         console.log("order", data)
    //         alert("Order confirmed")
    //         itemCounters.forEach(function(e) {
    //             e.value=0
    //         })
    //     } else {
    //         alert("Order not made")
    //     }
    // })
})

confirmOrderButton.addEventListener('click', (e) => {
    const itemCounters = document.querySelectorAll('.itemCount')
    
    fetch('/order/new', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendThisData)
    }).then((res) => {
        return res.json()
    }).then((data) => {
        if(status !== '400') {
            console.log("order", data)
            alert("Order confirmed")
            closeModalButton.click()
            itemCounters.forEach(function(e) {
                e.value=0
            })
        } else {
            alert("Order not made")
        }
    })
})

