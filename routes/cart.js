const express = require("express")
const {addtoCart, getCart, removeCart} = require("../controllers/cartController")

const router = express.Router();

router.post("/addtocart",addtoCart)
router.get("/getcart/:userId",getCart)
router.post("/removecart",removeCart)

module.exports = router;