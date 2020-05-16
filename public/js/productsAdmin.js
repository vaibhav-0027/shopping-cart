console.log('Products admin file has loaded')

// var addProductButton = document.querySelector('#addProduct')

function appendData(data) {
    var mainContainer = document.getElementById("productsInformation")

    $('#productsInformation').html('')

    if(data.length === 0){
        var div = document.createElement("div")
        div.innerHTML = 'No Products found!!'
        mainContainer.appendChild(div)
        return
    }

    console.log(data)

    for(var i=0; i<data.length; ++i) {
        var div = document.createElement('div')
        div.className = 'col-md-6'

        div.innerHTML = div.innerHTML + data[i].name + "  :   "  + data[i].price 
        div.innerHTML = div.innerHTML + '<br><a href="/product/update/'+data[i]._id+'" class="btn btn-primary btn-lg" role="button" aria-disabled="true">Edit product</a>'
        div.innerHTML = div.innerHTML + "<hr>"
        mainContainer.appendChild(div) 
    }
}

fetch('/product/all', {
    method: 'GET'
}).then((res) => {
    return res.json()
}).then((data) => {
    appendData(data)
})

// addProductButton.addEventListener('click', (e) => {
    
// })







