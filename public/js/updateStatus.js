console.log('update status file loaded')

const updateAccepted = document.querySelector('#updateAccepted')
const updateDelivered = document.querySelector('#updateDelivered')

const url = window.location.href
// console.log(url)

var uid="";

for(var i=url.length - 1; i>=0; --i){
    if(url[i]!=='/'){
        uid+=url[i];
    } else {
        break;
    }
}
// console.log(uid)

var id="";
for(var i=uid.length - 1; i>=0; --i){
    id+=uid[i];
}

console.log(id)


//Getting the current order's owner
fetch('/order/ownername/'+id, {
    method: 'GET'
}).then((res)=>{
    return res.json()
}).then((data)=>{
    console.log(data)
    var mainContainer = document.getElementById("userDetails")
    $('#userDetails').html('')

    var div = document.createElement('div')
    div.innerHTML = div.innerHTML + "Name : " + data.user.name + "<br>Mobile : " + data.user.mobile + "<br>Locality : " + data.user.locality + "<br>Address : " + data.user.address + "<hr>"

    mainContainer.appendChild(div)
})

//Getting the current order
fetch('/order/'+id, {
    method: 'GET'
}).then((res)=> {
    return res.json()
}).then((data)=>{
    console.log(data)
    var mainContainer = document.getElementById("orderDetails")
    $('#orderDetails').html('')

    var div = document.createElement('div')
    for(var i=0; i<data.order.length; ++i) {
        div.innerHTML = div.innerHTML + data.order[i].item + " : " + data.order[i].qty + "<br>"
    }
    div.innerHTML = div.innerHTML + "<hr>"
    mainContainer.appendChild(div)

    if(data.accepted === false) {
        // document.getElementById('yesacc').checked = false  
        document.getElementById("notacc").checked = true
    } else {
        document.getElementById("yesacc").checked = true 
    }

    if(data.delivered === false) {
        document.getElementById("notdel").checked = true 
    } else {
        document.getElementById("yesdel").checked = true 
    }

})

updateAccepted.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log('button clicked')

    var value;
    if(document.getElementById("notacc").checked === true) {
        value = 'false'
    } else {
        value='true'
    }

    var updateData = {
        "accepted" : value 
    }

    fetch('/order/updateAccepted/'+id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    }).then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data)
    })
})

updateDelivered.addEventListener('submit', (e) => {
    e.preventDefault()

    var value;
    if(document.getElementById("notdel").checked === true) {
        value = 'false'
    } else {
        value='true'
    }

    var updateData = {
        "delivered" : value 
    }

    fetch('/order/updateDelivered/'+id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    }).then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data)
    })
})


