const express = require("express")
const {createUser,loginUser,userAddress} = require("../controllers/userController")
const { requireSignIn } = require("../middlewares/authMiddleware")

const router = express.Router()


router.post("/signup",createUser)
router.post("/login",loginUser)
router.post("/address",userAddress)





module.exports = router;