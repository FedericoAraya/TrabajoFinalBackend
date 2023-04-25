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
    res.send(list)
} )

router.get('/:pid', (req, res)=>{
    const pid= req.params.pid
    const prodSelect= manager.getProductsById(+pid)
    res.send(prodSelect)
})





export default router