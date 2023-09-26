import productModel from "../models/products.models.js";

export const getProducts = async(req,res)=>{
    const products = await productModel.find().lean().exec()
    const limit  = req.query.limit || 5
    res.json(products.slice(0,parseInt(limit)))
}

export const viewProducts = async(req,res)=>{
    const products = await productModel.find().lean().exec()
    res.render('realTimeProducts',{
        data:products
    })
}

export const getProductById = async(req,res)=>{
    const id = req.params.id
    const product = await productModel.findOne({_id:id})
    res.json({
        product
    })
}

export const deleteProduct = async(req,res,next)=>{
    try {
        const id = req.params.pid
        const productDeleted = await productModel.deleteOne({_id:id})
        req.io.emit('updatedProducts', await productModel.find().lean().exec())
        res.json({
            status:"Sucess",
            message:"Producto Eliminado",
            productDeleted
        })
        
    } catch (error) {
        next(error)
        
    }
}

export const addProduct = async(req,res,next) =>{
    try {
        const product = req.body
        if(!product.title){
            return res.status(400).json({
                message: "Error no se ingresó el nombre"
            })
        }
        const productAdded = await productModel.create(product)
        req.io.emit('updatedProducts',await productModel.find().lean().exec())
        res.json({
            status:"Producto agregado",
            productAdded
        })
        
    } catch (error) {
        next(error)
    }
}

export const updatedProduct = async(req,res)=>{
    const id = req.params.pid
    const productToUpdate = req.body
    const product = await productModel.updateOne({
        _id:id
    }, productToUpdate)
    req.io.emit('updateProducts', await productModel.find().lean().exec())
    res.json({
        status: "producto actualizado",
        product
    })

}