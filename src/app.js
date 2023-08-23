import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import { Server } from "socket.io";
import productRouter from "./routers/productRouter.js";
import cartsRouter from "./routers/cartRouter.js";
import homeRouter from "./routers/homeRouter.js";
import realTimeProductsRouter from "./routers/realTimeProductsRouter.js";
import chatRouter from "./routers/chat.router.js";
import __dirname from "./utils.js";
import messageModel from "./dao/models/message.model.js";
import ProductManager from "./dao/Manager/ProductManager.js";
import sessionRouter from "./routers/session.router.js";
import swaggerJSDoc from "swagger-jsdoc"
import SwaggerUiExpress from "swagger-ui-express"
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

import cookieParser from "cookie-parser";
mongoose.set("strictQuery", false);

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true })); 

const swaggerOptions = {
  definition:{
      openapi: '3.0.1',
      info:{
          title: 'Documentación Ecommerce',
          description:'Descripción de la documentación del proyecto de backend ecommerce'
      }
  },
  apis:['./src/**/*.yaml']
}

const specs = swaggerJSDoc(swaggerOptions)

app.use(cookieParser());
app.use((session({
  store: MongoStore.create({ 
    mongoUrl: "mongodb+srv://federicoaraya:cCbvYRYjjNeDJR7v@asgard.0pnjaxo.mongodb.net/",
    dbName: "test",
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
   }),
   secret: "c0d3r",
   resave: true,
   saveUninitialized: true 
})));

app.use("/", homeRouter);
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/realTimeProducts", realTimeProductsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);
app.use("/chat", chatRouter);
app.use("/session", sessionRouter);
app.use('/docs',SwaggerUiExpress.serve,SwaggerUiExpress.setup(specs))

try {
  await mongoose.connect(
    "mongodb+srv://federicoaraya:cCbvYRYjjNeDJR7v@asgard.0pnjaxo.mongodb.net/",
    {
      serverSelectionTimeoutMS: 5000,
    }
  );
  console.log("DB conected");
  const httpServer = app.listen(8080, () => {
    console.log("Server UP");
  });

  const socketServer = new Server(httpServer);

  socketServer.on("connection", (socketClient) => {
    console.log("User conected");
    const prod = new ProductManager("./src/data/productos.json");
    socketClient.on("deleteProd", (prodId) => {
      const result = prod.deleteProduct(prodId);
      if (result.error) {
        socketClient.emit("error", result);
      } else {
        socketServer.emit("products", prod.getProducts());
        socketClient.emit("result", "Producto eliminado");
      }
    });
    socketClient.on("addProd", (product) => {
      const producto = JSON.parse(product);
      const result = prod.addProduct(producto);
      if (result.error) {
        socketClient.emit("error", result);
      } else {
        socketServer.emit("products", prod.getProducts());
        socketClient.emit("result", "Producto agregado");
      }
    });
    socketClient.on("newMessage", async (message) => {
      try {
        let newMessage = await messageModel.create({
          user: message.email.value,
          message: message.message,
        });
        console.log("app", newMessage);
        socketServer.emit("emitMessage", newMessage);
      } catch (error) {
        console.log(error);
        socketClient.emit("error", error);
      }
    });
  });
} catch (error) {
  console.log(error);
}
