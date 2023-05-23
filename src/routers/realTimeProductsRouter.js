import { Router } from "express"
import ProductManager from "../controllers/productManager.js"

const router= Router()
const manager= new ProductManager()

const List= manager.getProducts()


router.get('/', (req, res)=>{
    res.render('realTimeProducts', {List})
})

router.post("/", (req, res) => {
  const data = req.body;
console.log(data);
  if (
    !data.title ||
    !data.description ||
    !data.price ||
    !data.stock ||
    !data.thumbnails ||
    !data.code ||
    !data.category
  ) {
    res.status(206).send("faltan datos");
  } else {
    manager.addProduct(
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      category
    );
    res.status(201).send("Producto cargado con éxito");
  }
});

export default router