import { Router } from "express";
import ProductManager from "../controllers/product.manager.js";

const router = Router()
const manager= new ProductManager()

router.get('/',(req, res)=>{
    const limit = req.query.limit
    let list= manager.getProducts()
    if(limit) {
        list = list.slice(0, limit)
    } 
   // res.send(list)   
        res.render('productos', {            
            prod :  list.map(function(prod) { 
                const img = prod.thumbnails[0]     
                return  `<div class="card" style="width: 18rem; margin: 10px">
                <img class="card-img-top" src="${prod.thumbnails[0]}" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${prod.title}</h5>
                  <p class="card-text">${prod.price}</p>
                  <a href="#" class="btn btn-primary">Ver Mas</a>
                </div>
              </div> `  
              }) 
               
                           
       })
    
    
    
} )

router.get('/:pid', (req, res)=>{
    const pid= req.params.pid
    const prodSelect= manager.getProductsById(pid)
    res.send(prodSelect)
})

router.post('/', (req, res)=>{
    const data = req.body
    if(!data.title || !data.description || !data.price || !data.stock|| !data.category || !data.code || !data.category){
        res.status(206).send("faltan datos")
    }else{
        const {title , description , price , thumbnail , code , stock, category} = data
        manager.addProduct(title , description , price , thumbnail , code , stock, category)
        res.status(201).send("Producto cargado con éxito")
    }
})

router.put('/:id', (req, res)=>{
    const pid = req.params.id
    const data= req.body
    manager.updateProduct(pid, data)
    res.status(202).send("Producto Actualizado")
})

router.delete('/:pid', (req, res)=>{
    const pid= req.params.pid
    manager.deleteProduct(pid)
    res.send("Producto eliminado")
})

export default router