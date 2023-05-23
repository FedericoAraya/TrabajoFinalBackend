import express from "express";
import productRouter from "./routers/productRouter.js";
import cartRouter from "./routers/cartRouter.js";
import realTimeProductsRouter from "./routers/realTimeProductsRouter.js";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import routerViews from "./routers/views.router.js";
import mongoose from "mongoose";

//const uri = "URL DE MONGO"

const server = express();

server.engine("handlebars", handlebars.engine());
server.set("views", __dirname + "/views");
server.set("view engine", "handlebars");

server.use(express.json());
server.use(express.static(__dirname + "/public"));
server.use("/", routerViews);
server.use("/api/products", productRouter);
server.use("/api/carts", cartRouter);
server.use("/api/realtimeproducts", realTimeProductsRouter);
server.use(express.urlencoded({ extended: true }));

mongoose.get("strictQuery", false);
try {
  await mongoose.connect(uri);
  console.log("DB conectado");
  const httpServer = server.listen(8080, () => console.log("Server Up"));
  const socketServer = new Server(httpServer);
  socketServer.on("connection", () => {
    console.log("Socket client");
  });
} catch (err) {
  console.log("No se puede conectar a DB");
}
