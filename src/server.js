import express from 'express';
import http from 'http';
import { Server } from 'socket.io';


import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const puerto = 8080
const server = http.createServer(app)
const io = new Server(server)


//configuración
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/layouts');

//establecer el espacio público del servidor
app.use('/', express.static(__dirname + '/public'));
app.use('/plantillas', express.static(__dirname + '/views/components'));

// Importo clases
import Product from './models/product.js';
import ChatMessage  from './models/chat-message.js';

const objProduct = new Product()
const objChatMessage = new ChatMessage()

//Rutas
import rutas from './routes/index.js';
import productos from './routes/productos.js';

app.use('/', rutas);
app.use('/api/productos', productos)


//Enciendo conexión socket
io.on('connection', async socket => {
    console.log('user connected')
    //traigo productos y mensajes
    let productList = await objProduct.getTestDataProducts()
    let messageList = await objChatMessage.getAll()

    
    //Emisión
    socket.emit('product-list', productList)
    socket.emit('message-list', messageList)

    //Recepción
    socket.on('new-product', async product => {
        await objProduct.saveProduct(product)
        productList = await objProduct.getAll()
        io.emit('product-list', productList)
    })
    socket.on('new-message', async message => {
        await objChatMessage.save(message);
        messageList = await objChatMessage.getAll()
        io.emit('message-list', messageList)
    })

})




server.listen(puerto, (error) => {
    if (error) {
        console.log(`Se produjo un error en el servidor`)
        console.error(error)
    } else {
        console.log(`Servidor iniciado en el puerto ${puerto}`)
    }
})