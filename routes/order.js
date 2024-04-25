const express = require("express")
const {authMiddleware} = require('../middlewares/authMiddleware')
const {createOrder, getOrder} = require("../controllers/orderController")
const router = express.Router();




router.post("/create-order",createOrder)
router.get("/getorder/:userId",getOrder)


module.exports = router;