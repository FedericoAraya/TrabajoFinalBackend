import { Router } from 'express'
import { addProduct, deleteProduct, getProductById, getProducts, updatedProduct, viewProducts } from '../controller/products.controller.js'
import authorize from "../middleware/userMiddleware.js"

const router = Router()
const adminOnly = authorize(['admin'])

router.get('/',getProducts)
router.get('/view',viewProducts)
router.get('/:id',getProductById)
router.delete('/:pid',adminOnly,deleteProduct)
router.post('/',adminOnly,addProduct)
router.put('/:pid',adminOnly,updatedProduct)


export default router