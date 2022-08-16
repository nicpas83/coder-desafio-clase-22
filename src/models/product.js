import { faker } from '@faker-js/faker'

faker.locale = 'es';

class Product {

    constructor(){
        this.data = [];
    }


    async getTestDataProducts(cant = 5){

        for(let i = 0; i < cant; i++){
            let product = {
                title: faker.commerce.productName(),
                price: faker.commerce.price(),
                thumbnail: faker.image.imageUrl(300, 300, 'technics', true)
            }

            this.data.push(product);
        }

        return this.data;
    }
    


}

export default Product 