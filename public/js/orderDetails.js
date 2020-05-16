console.log('Order Details file has loaded')

// const url = $(location).attr('href')
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

fetch('/order/ownername/'+id, {
    method: 'GET'
}).then((res) => {
    return res.json()
}).then((data) => {
    var mainContainer = document.getElementById("orderDetails")
    $('#orderDetails').html('')
    
    var div = document.createElement('div')
    div.className = 'col-md-6'
    div.innerHTML = div.innerHTML + "Name : " + data.user.name + "<br>Mobile : " + data.user.mobile + "<br>Locality : " + data.user.locality + "<br>Address : " + data.user.address

    mainContainer.appendChild(div)
})









