const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    images : {
        type : Array,
        required : true
    },
    category : String,
    seller : String,
    stock : String,
},{timestamps: true})


const productModel = mongoose.model("Products",productSchema)

module.exports = productModel