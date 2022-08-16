import mongoose from "mongoose";
import { faker } from '@faker-js/faker';
faker.locale = 'es';

import { normalize, schema, denormalize } from "normalizr";
import util from "util";

function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}


class ChatMessage {

    table = 'mensajes';


    constructor() {
        mongoose.connect('mongodb://localhost:27017/desafio_clase_22');

        this.chatSchema = new mongoose.Schema({
            author: {
                id: { type: String, required: true },
                nombre: { type: String },
                apellido: { type: String },
                edad: { type: Number },
                alias: { type: String },
                avatar: { type: String }
            },
            text: { type: String }
        })
        this.chatModel = mongoose.model(this.table, this.chatSchema);
    }


    async save(data) {

        try {
            const newChatMessage = {
                author: {
                    id: data.email,
                    nombre: faker.name.firstName(),
                    apellido: faker.name.lastName(),
                    edad: faker.random.numeric(2),
                    alias: faker.name.middleName(),
                    avatar: faker.image.avatar()
                },
                text: data.message
            }


            await this.chatModel.insertMany([newChatMessage])

            return {
                code: 200,
                message: 'Mensaje guardado'
            }
        } catch (error) {
            return {
                code: 400,
                message: error
            }
        }
    }


    async getAll() {
        const mensajes = await this.chatModel.find({})

        //normalizar respuesta.
        const data = {id: 'mensajes', mensajes: mensajes};
        const authorSchema = new schema.Entity('author', {idAttribute: 'email'});


        const normalizeMessages = await normalize(data, authorSchema);

        print(normalizeMessages)

        return normalizeMessages;
    }


}

export default ChatMessage
