import { Router } from 'express';
const router = Router()

import Product from '../models/product.js';


//DESAFIO CLASE 22.
router.get('test', (req, res) => {
    const obj = new Product()
    const productos = obj.getTestDataProducts();

    res.json(productos)
})



router.get('/', (req, res) => {
    const products = obj.getAll()
    let productsExists = false;
    if(products.length > 0){
        productsExists = true;
    }
    console.log(products)
    res.render('productos-index', {products, productsExists})
})

router.post('/', async (req, res) => {
    const { title, price, thumbnail } = req.body
    const product = { title, price, thumbnail }

    const response = await obj.saveProduct(product)

    console.log(response)
    // save.then(() => {
    //     res.render('main', {})
    // })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    const product = obj.getById(id)

    product
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.sendStatus(404)
            console.error(error)
        })
})



router.put('/:id', (req, res) => {
    const { title, price, thumbnail } = req.body
    const product = { title, price, thumbnail }
    product.id = req.params.id

    const update = obj.updateProduct(product)
    update
        .then(() => {
            res.sendStatus(200)
        })
        .catch((e) => {
            res.sendStatus(400)
            console.log(e)
        })

})

router.delete('/:id', (req, res) => {
    obj.deleteProduct(req.params.id)
        .then(() => {
            res.sendStatus(200)
        })
        .catch((e) => {
            res.sendStatus(400)
            console.log(e)
        })
})


export default router