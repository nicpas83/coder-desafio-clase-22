const socket = io()

// //FORMULARIO DE PRODUCTOS
// const AddProductForm = document.querySelector('#AddProductForm')
// const ProductTitle = document.querySelector('#ProductTitle')
// const ProductPrice = document.querySelector('#ProductPrice')
// const ProductThumbnail = document.querySelector('#ProductThumbnail')

// //agarro evento submit del form.
// AddProductForm.addEventListener('submit', event => {
//     event.preventDefault();
//     const newProduct = { 
//         title: ProductTitle.value, 
//         price: ProductPrice.value, 
//         thumbnail: ProductThumbnail.value 
//     };
//     AddProductForm.reset()
//     socket.emit('new-product', newProduct);
// })

//recibo listado productos actualizado
socket.on('product-list', products => {
    //renderizo la vista
    renderProductList(products)
})

async function renderProductList(products){
    const response = await fetch('/plantillas/product-index.ejs')
    const plantilla = await response.text()

    const html = ejs.render(plantilla, { products: products })
    document.querySelector('#TableProductsIndex').innerHTML = html
}


//FORMULARIO DE MENSAJES
const MessageForm = document.querySelector('#MessageForm')
const UserEmail = document.querySelector('#UserEmail')
const UserMessage = document.querySelector('#UserMessage')

MessageForm.addEventListener('submit', event => {
    event.preventDefault();
    const CreatedAt = moment().format("DD/MM/YYYY hh:mm") 
    const newMessage = { 
        email: UserEmail.value, 
        message: UserMessage.value.trim(), 
        created_at: CreatedAt 
    }
    UserMessage.value = '';
    socket.emit('new-message', newMessage);
})

socket.on('message-list', messages => {
    if(messages.length > 0){
        renderMessageList(messages)
    }
})

async function renderMessageList(messages){
    // traigo plantilla por fetch
    const response = await fetch('/plantillas/message-index.ejs')
    const plantilla = await response.text()

    //armo html final
    const html = ejs.render(plantilla, { messages: messages })
    document.querySelector('#ChatMessages').innerHTML = html;
}
