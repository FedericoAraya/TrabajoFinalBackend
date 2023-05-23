import mongoose from "mongoose"

const prodCollection = "productos"

const prodSchema = mongoose.Schema({
    id: Number,
    description: String,
    price: Number,
    thumbnails: [String],
    category: String,
    stock: Number,
    title: String,
    code: String
})

const prodModel = mongoose.model(prodCollection, prodSchema)

export default prodModel