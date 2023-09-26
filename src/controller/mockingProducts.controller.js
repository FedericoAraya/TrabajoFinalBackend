import { generateProduct } from "../utils.js";
import productModel from "../models/products.models.js";

export const addProductMocking = async (req, res) => {
    try {
        const products = []
        for (let index = 0; index < 100; index++) {
            const product = generateProduct()
            products.push(product)
        }
        const resolvedProducts = await Promise.all(products);
        const productsAdded = await productModel.create(resolvedProducts)
        res.status(201).json(productsAdded);
    } catch (error) {
        res.json({
            error
        })

    }
}