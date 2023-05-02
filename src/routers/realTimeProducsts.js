import { Router } from "express";
import ProductManager from "../controllers/product.manager.js";

const router = Router();
const manager = new ProductManager();

router.get("/", (req, res) => {
    const limit = req.query.limit;
    let list = manager.getProducts();
    if (limit) {
      list = list.slice(0, limit);
    }
    res.render("home", {
      prod: list.map(function (prod) {
        return `<div class="card" style="width: 18rem; margin: 10px">
                  <img class="card-img-top" src="${prod.thumbnails[0]}" alt="Card image cap">
                  <div class="card-body">
                    <h5 class="card-title">${prod.title}</h5>
                    <p class="card-text">${prod.price}</p>
                    <a href="#" class="btn btn-primary">Ver Mas</a>
                  </div>
                </div> `;
      }),
    });
  });