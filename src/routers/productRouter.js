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
    list,   
  });
});

router.get("/:pid", (req, res) => {
  const pid = req.params.pid;
  const prodSelect = manager.getProductsById(pid);
  res.render("producto", {    
    prodSelect
  })
});

router.post("/", (req, res) => {
  const data = req.body;
  if (
    !data.title ||
    !data.description ||
    !data.price ||
    !data.stock ||
    !data.category ||
    !data.code ||
    !data.category
  ) {
    res.status(206).send("faltan datos");
  } else {
    const { title, description, price, thumbnail, code, stock, category } =
      data;
    manager.addProduct(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category
    );
    res.status(201).send("Producto cargado con éxito");
  }
});

router.put("/:id", (req, res) => {
  const pid = req.params.id;
  const data = req.body;
  manager.updateProduct(pid, data);
  res.status(202).send("Producto Actualizado");
});

router.delete("/:pid", (req, res) => {
  const pid = req.params.pid;
  manager.deleteProduct(pid);
  res.send("Producto eliminado");
});

export default router;
