const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name : String,
    price : String,
    description : String,
    ratings : String,
    images : Array,
    category : String,
    seller : String,
    stock : String,
    numOfReviews : String,
    CreatedAt : Date
},{timestamps: true})


const productModel = mongoose.model("Products",productSchema)

module.exports = productModel