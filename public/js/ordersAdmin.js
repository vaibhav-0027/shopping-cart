console.log("ordersAdmin javascript file is loaded!!")

const yayd = document.querySelector('#yayd')
const yand = document.querySelector('#yand')
const nand = document.querySelector('#nand')

function appendData(data) {
    var mainContainer = document.getElementById("ordersInformation")

    // mainContainer.html('')
    // mainContainer.empty()
    $('#ordersInformation').html('') 
    if(data.length === 0){
        var div = document.createElement("div")
        div.innerHTML = 'No orders found!!'
        mainContainer.appendChild(div)
        return
    }
    // console.log(data)
    // for(var i = 0; i<data.length; ++i){
    //     var div = document.createElement("div")
    //     div.innerHTML = ""

    //     div.innerHTML = div.innerHTML + "Name : " + data[i].name +
    //         "<br>Mobile : " + data[i].mobile + "<br>Locality : " + data[i].locality + 
    //         "<br>Address : " + data[i].address + "<br> <a href='/order/"+data[i]._id+"'>Show orders</a><hr>"
        

    //     mainContainer.appendChild(div)
    // }
    for (var i = 0; i < data.length; ++i) {
        var div = document.createElement("div")
        div.className = 'col-md-6'
        // console.log(data)
        // var ownerName = ""

        // fetch('/order/ownername/'+data[i]._id, {
        //     method: 'GET'
        // }).then((res) => {
        //     return res.json()
        // }).then((data) => {
        //     // console.log("information")
        //     // console.log(data.name)
        //     // console.log(data.user.name)
        //     // console.log(data.user)
        //     ownerName = data.user.name  
        // })
        // // setTimeout(() => {   }, 400);
        // div.innerHTML = div.innerHTML + "Owner Name : " + ownerName
        // div.innerHTML = div.innerHTML + "<br>"
        var arr = []
        // var userOwner
        
        for (var j = 0; j < data[i].order.length; ++j) {
            arr.push(data[i].order[j])
        }
        // console.log(arr)
        for (var j = 0; j < arr.length; ++j) {
            div.innerHTML = div.innerHTML + arr[j].item + " : " + arr[j].qty +"<br>"

        }
        div.innerHTML = div.innerHTML + "Order confirmation : " 
        if(data[i].accepted === true) div.innerHTML += "OK<br>";
        else div.innerHTML += "NOT YET<br>"
        div.innerHTML = div.innerHTML + "Order delivered : " 
        if(data[i].delivered === true) div.innerHTML += "YES<br>";
        else div.innerHTML += "ON THE WAY<br>"
        // div.innerHTML = div.innerHTML + "Address : " 

        // // console.log(data[i]._id)
        // fetch('/order/ownername/'+data[i]._id, {
        //     method: 'GET'
        // }).then((res) => {
        //     return res.json()
        // }).then((data1) => {
        //     // console.log(data1)
        //     console.log(data1.user.address)
        //     // console.log(data1.address)
        //     // console.log(user.address)
        //     div.innerHTML = div.innerHTML + data1.user.address
        //     // div.innerHTML += ", "
        //     // div.innerHTML += data1.user.locality
        // })
        div.innerHTML = div.innerHTML + '<a href="/order/details/' + data[i]._id + '" class="btn btn-primary btn-lg" role="button" aria-disabled="true">Show owner</a>'
        div.innerHTML = div.innerHTML + '<a href="/order/update/' + data[i]._id + '" class="btn btn-primary btn-lg" role="button" aria-disabled="true">Update Order State</a> '

        div.innerHTML = div.innerHTML + "<hr>"
        mainContainer.appendChild(div)
    }
}

// fetch('/users', {
//     method: 'GET'
// }).then((res) => {
//     return res.json()
// }).then((data) => {
    
//     appendData(data)

// })
fetch('/order/nand', {
    method: 'GET'
}).then((res) => {
    return res.json()
}).then((data) => {
    // console.log('js file',data)
    // if (!jQuery.isEmptyObject(data)) {
        console.log("inside")
        
        appendData(data)
        
        // create something in hbs file inorder to display this information
    // }
})

nand.addEventListener('click', (e) => {
    fetch('/order/nand', {
        method: 'GET'
    }).then((res) => {
        return res.json()
    }).then((data) => {
        appendData(data)
    })
})

yand.addEventListener('click', (e) => {
    fetch('/order/yand', {
        method: 'GET'
    }).then((res) => {
        return res.json()
    }).then((data) => {
        appendData(data)
    })
})

yayd.addEventListener('click', (e) => {
    fetch('/order/yayd', {
        method: 'GET'
    }).then((res) => {
        return res.json()
    }).then((data) => {
        appendData(data)
    })
})













