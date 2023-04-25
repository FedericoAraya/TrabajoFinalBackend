import { Router } from "express";
import cartManager from "../controllers/cart.manager.js"

const router = Router();
const manager = new cartManager()


router.post("/" , (req , res) =>{
    
})

router.get("/:cid" , (req, res) =>{

})

router.post("/.cid/products/:pid" , (req, res) =>{

})

export default router

