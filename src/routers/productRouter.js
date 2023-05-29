import { Router } from "express";
//import ProductManager from "../dao/fsManager/productManager.js";
import prodModel from '../dao/models/product.model.js';

const router = Router();

productsRouter.get('/', async (req,res)=>{
  const products = await prodModel.find().lean().exec()
  console.log(products)
  res.render('list', {products})
})

productsRouter.get('/update/:name', async (req, res) => {
  const name = req.params.name
  const products = await prodModel.findOne({ name }).lean().exec()
  res.render('update', { products })
})

productsRouter.get('/create', (req,res)=>{
  res.render('create',{})
})

productsRouter.get('/:name', async (req,res)=>{
  const title= req.params.name
  const products= await prodModel.findOne({title}).lean().exec()
  res.render('one',{ products })
})

productsRouter.post('/', async (req,res)=>{
  const productsNew =req.body
  const productGenerated= new prodModel(productsNew)
  await productGenerated.save()
  res.redirect(`/products`)
})

productsRouter.put('/:name', async (req, res) => {
  const name = req.params.name
  console.log(name)
  const productNewdata = req.body
  console.log(productNewdata)
  try {
      await prodModel.updateOne({ name }, { ...productNewdata })
  } catch(err) {
      console.log('error.....')
      res.send({err})
  }
})

productsRouter.delete('/:name', async (req, res) => {
  const name = req.params.name
  try {
      await productsModel.deleteOne({ name })
  } catch (err) {
      res.send({err})
  }
}) 

/*
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
*/


export default router;
