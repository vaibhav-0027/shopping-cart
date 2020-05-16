console.log('Adding the product file has loaded')

const inputName = document.querySelector('#inputNameProduct')
const inputPrice = document.querySelector('#inputPriceProduct')
const inputImage = document.querySelector('#inputImageProduct')
const addProductButton = document.querySelector('#signup-form')

addProductButton.addEventListener('submit', (e) => {

    e.preventDefault()

    const name = inputName.value 
    const price = inputPrice.value
    // const image = inputImage.value 

    var data = {
        "name": name,
        "price": price,
        "avatar": " " 
    }

    fetch('/product/new', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res)=>{
        return res.json()
    }).then((data) => {
        if(status!=='400'){
            alert('Product Added')
            setTimeout(() => {  location.reload(); }, 400);
        } else {
            alert('Not Created')
            setTimeout(() => {  location.reload(); }, 400);
        }
    })

})












