import express from "express";
import productRouter from "./routers/productRouter.js"
import cartRouter from "./routers/cartRouter.js"

const server = express();
server.listen(8080, () => console.log('Server Up'));

server.use(express.json())

server.use('/api/products', productRouter)
server.use('/api/carts', cartRouter)