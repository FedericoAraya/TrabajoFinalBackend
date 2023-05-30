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


export default cartsRouter