const express = require("express")
const {makePayment, verifyPayment} = require("../controllers/paymentController")

const router = express.Router()

router.post("/makepayment", makePayment)
router.post("/verifypayment", verifyPayment)


module.exports = router;