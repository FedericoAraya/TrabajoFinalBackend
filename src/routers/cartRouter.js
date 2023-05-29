import { Router } from "express";
//import CartManager from '../dao/fsManager/cartManager.js'
import __dirname from '../utils.js'
import cartsModel from "../dao/models/carts.model.js";


const cartsRouter= Router();

cartsRouter.get('/:cid', async (req,res)=>{
    const carts = await cartsModel.find().lean().exec()
    res.render('listcarts', {carts})
})

cartsRouter.get('/', (req,res)=>{
    res.render('createcarts',{})
})

cartsRouter.post('/', async (req,res)=>{
    const cartsNew = req.body
    const cartsGenerated = new cartsModel(cartsNew)
    await cartsGenerated.save()
    res.redirect(`/carts`)
})

/*
const router = Router();
const manager = new cartManager()

router.get('/', (req, res)=>{
    const lista = manager.getCarts()
    res.status(201).send(lista)
})


router.post("/" , (req , res) =>{
    manager.createCart()
    res.status(201).send("Carrito Creado con éxito")
})

router.get("/:cid" , (req, res) =>{
    const cid= req.params.cid
    const cartList = manager.getCartById(cid)
    if(cartList == false){
        res.send(`El carrito ${cid} no existe`)
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

*/