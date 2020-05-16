console.log('dashboard javascript file has loaded!!')

// const previousOrders = document.querySelector('#previousOrders')

function appendData(data) {
    var mainContainer = document.getElementById("previousOrders")
    if (data.length === 0) {
        var div = document.createElement("div")
        div.innerHTML = 'No previous orders found!!'
        mainContainer.appendChild(div)
        return
    }
    for (var i = 0; i < data.length; ++i) {
        var div = document.createElement("div")
        // console.log(data)
        var arr = []
        for (var j = 0; j < data[i].order.length; ++j) {
            arr.push(data[i].order[j])
        }
        console.log(arr)
        for (var j = 0; j < arr.length; ++j) {
            div.innerHTML = div.innerHTML + arr[j].item + " : " + arr[j].qty + "<br>"

        }
        // div.innerHTML = div.innerHTML + "Order confirmation : " + (data[i].accepted)?"OK<br>":"NOT YET<br>"
        // div.innerHTML = div.innerHTML + "Order delivered : " + (data[i].delivered)?"YES<br>":"NO<br>"
        div.innerHTML = div.innerHTML + "Order confirmation : "
        if (data[i].accepted === 'true') div.innerHTML += "OK<br>";
        else div.innerHTML += "NOT YET<br>"
        div.innerHTML = div.innerHTML + "Order delivered : "
        if (data[i].delivered === 'true') div.innerHTML += "YES<br>";
        else div.innerHTML += "ON THE WAY<br>"
        div.innerHTML = div.innerHTML + "<hr>"
        mainContainer.appendChild(div)
    }
}


fetch('/order/me', {
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



