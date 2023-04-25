import { Router } from "express";
import cartManager from "../controllers/cart.manager.js"

const router = Router();
const manager = new cartManager()


router.post("/" , (req , res) =>{
    manager.createCart()
    res.status(201).send("Carrito Creado con éxito")
})

router.get("/:cid" , (req, res) =>{
    const cid= req.params.cid
    const cartList = manager.getProductsFromACart(cid)
    if(cartList == false){
        res.send(`The cart ${cid} doesn't exist`)
    }else{
        res.send(cartList)
    }
})

router.post("/:cid/products/:pid" , (req, res) =>{
    const cid= req.params.cid
    const pid= req.params.pid
    manager.addProductToCart(cid,pid)
    res.status(201).send(`producto ${pid} añadido al carrito ${cid}`)

})

export default router

