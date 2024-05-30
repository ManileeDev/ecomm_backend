const express = require("express")
const {getProducts, getSingleProduct, createProduct, deleteProduct, updateProduct} = require("../controllers/productController")

const router = express.Router()


router.get("/products",getProducts)
router.get("/product/:id",getSingleProduct)
router.post("/createproduct",createProduct)
router.delete("/deleteproduct/:id",deleteProduct)
router.put("/updateproduct/:id", updateProduct)

module.exports = router;