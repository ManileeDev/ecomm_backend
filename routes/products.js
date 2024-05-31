const express = require("express")
const {getProducts, getSingleProduct, createProduct, deleteProduct, updateProduct} = require("../controllers/productController")
const requireAuth = require("../middlewares/requireAuth")
const router = express.Router()


router.get("/products",getProducts)
router.get("/product/:id",getSingleProduct)
router.post("/createproduct",requireAuth,createProduct)
router.delete("/deleteproduct/:id",requireAuth,deleteProduct)
router.put("/updateproduct/:id",requireAuth,updateProduct)

module.exports = router;