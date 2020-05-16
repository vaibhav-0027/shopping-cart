console.log("usersAdmin javascript is now loaded")

function appendData(data) {
    var mainContainer = document.getElementById("usersInformation")

    if(data.length === 0){
        var div = document.createElement("div")
        div.innerHTML = 'No users found!!'
        mainContainer.appendChild(div)
        return
    }
    console.log(data)
    for(var i = 0; i<data.length; ++i){
        var div = document.createElement("div")
        div.innerHTML = ""

        div.innerHTML = div.innerHTML + '<div class="row"><div class="card"><div class="card-body"><h5 class="card-title">'+data[i].name+'</h5>'
        div.innerHTML = div.innerHTML + '<p class="card-text"> Mobile : '+data[i].mobile+ '<br>Locality : ' + data[i].locality + '<br>Address : ' + data[i].address+'</p>'
        // div.innerHTML = div.innerHTML + '<a href=">'+data[i].
//    div.innerHTML = div.innerHTML + "Name : " + data[i].name + "<br>Locality : " + data[i].locality + 
// "<br>Address : " + data[i].address
//             "<br>Mobile : " + data[i].mobile + "<br>Locality : " + data[i].locality + 
//             "<br>Address : " + data[i].address + "<br> <a href='/order/"+data[i]._id+"'>Show orders</a><hr>"
        div.innerHTML = div.innerHTML + '</div></div></div>'
        div.innerHTML = div.innerHTML + '<a href="/user/order/'+data[i]._id + '" class="btn btn-primary btn-lg" role="button" aria-disabled="true">Show all orders</a>'

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
fetch('/users/all', {
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










