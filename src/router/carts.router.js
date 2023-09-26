import { Router } from 'express'
import { addProductToCart, cartDelete, getCart, getCartById, purchaseCart,viewCartProducts } from '../controller/carts.controller.js'
import { addProduct } from '../controller/products.controller.js'
import authorize from "../middleware/userMiddleware.js"

const router = Router()
const userOnly = authorize(['user'])

router.get('/',getCart)
router.get('/products', viewCartProducts);
router.get('/:id',getCartById)
router.post('/',userOnly,addProduct)
router.post('/:cid/product/:pid',addProductToCart)
router.delete('/:cid/product/:pid',cartDelete)
router.post('/:cid/purchase',userOnly,purchaseCart)

export default router
