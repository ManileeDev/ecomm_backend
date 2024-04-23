const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name : String,
    price : String,
    images : Array,
    category : String,
    seller : String,
    stock : String,
},{timestamps: true})


const productModel = mongoose.model("Products",productSchema)

module.exports = productModel