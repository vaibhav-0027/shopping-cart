console.log('update product file has loaded')

const updateProduct = document.querySelector('#update-form')
const productName = document.querySelector('#inputNameProduct')
const productPrice = document.querySelector('#inputPriceProduct')
const uploadImage = document.querySelector('#upload-image-form')
const deleteProduct = document.querySelector('#deleteProduct')
const confirmDeleteProduct = document.querySelector('#confirmDeleteProduct')
const imageID = document.querySelector('#imageID')

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

var productId="";
for(var i=uid.length - 1; i>=0; --i){
    productId+=uid[i];
}

console.log(productId)
imageID.value = productId

fetch('/product/'+productId,{
    method: 'GET'
}).then((res) => {
    return res.json()
}).then((data) => {
    console.log(data)
    productName.value = data.name 
    productPrice.value = data.price 
})

updateProduct.addEventListener('submit', (e) => {
    e.preventDefault()

    var name = document.getElementById('inputNameProduct').value
    var price = document.getElementById('inputPriceProduct').value 

    var updateData = {
        "name": name,
        "price": price
    }

    fetch('/product/'+productId, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    }).then((res)=>{
        return res.json()
    }).then((data) => {
        console.log(data)
        alert('Product Details updated')
        setTimeout(() => {  location.reload(); }, 300);
    })
})

// uploadImage.addEventListener('submit', (e) => {
//     e.preventDefault()

//     var formData = new FormData()
//     // formData.append('avatar', new Buffer(10))
//     formData.append("avatar", File)

//     fetch('/product/avatar/'+productId, {
//         method: 'POST',
//         body: formData 
//     }).then((res) => {
//         return res.json()
//     }).then((data) => {
//         console.log(data);
//         alert('Picture uploaded successfully')
//         setTimeout(() => {  location.reload(); }, 300);
//     })
// })

deleteProduct.addEventListener('click', (e) => {
    // e.preventDefault()
    //open a warning modal for confirmation
    console.log('clicked')

    $('#confirmDeleteModal').modal('toggle')
})

confirmDeleteProduct.addEventListener('click', (e) => {
    fetch('/product/'+productId, {
        method: 'DELETE'
    }).then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data)
        alert('Product has been deleted')
        setTimeout(() => {  location.reload(); }, 300);
    })
})

