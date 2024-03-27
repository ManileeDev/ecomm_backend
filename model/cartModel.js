const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId: String,
    prodId: String,
    item_name : String,
    price : String,
    images:Array,
    size: String,
    qty: String
},{timestamps: true})

const cartModel = mongoose.model("Cart",cartSchema)
module.exports = cartModel;