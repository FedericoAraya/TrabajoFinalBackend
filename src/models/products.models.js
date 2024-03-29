import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = "productos"

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails: Array,
    owner:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'users',
        default: null
    }
})

mongoose.set("strictQuery", false)
productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(productCollection, productSchema)

export default productModel