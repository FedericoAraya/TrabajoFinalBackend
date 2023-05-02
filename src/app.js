import express from "express";
import productRouter from "./routers/productRouter.js"
import cartRouter from "./routers/cartRouter.js"
import { Server } from "socket.io";
import __dirname from "./utils.js";
import handlebars from 'express-handlebars'

const server = express();

const httpServer = server.listen(8080, () => console.log('Server Up'));
const socketServer = new Server(httpServer)
socketServer.on('connection', () => {
    console.log("Cliente Socket conectado..");
})

server.use(express.json())
server.use(express.static( __dirname +'/public'))
server.use('/api/products', productRouter)
server.use('/api/carts', cartRouter)

server.engine('handlebars' , handlebars.engine())
server.set('views' ,__dirname + '/views')
server.set('view engine' , 'handlebars')

