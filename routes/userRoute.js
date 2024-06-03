const express = require("express")
const {createUser,loginUser,userAddress, getAllUsers, deleteUser, forgotPassword, resetPassword} = require("../controllers/userController")
const requireAuth = require("../middlewares/requireAuth")

const router = express.Router()


router.post("/signup",createUser)
router.post("/login",loginUser)
router.post("/address",userAddress)
router.get("/getallusers",requireAuth,getAllUsers)
router.delete("/deleteuser/:id",requireAuth,deleteUser)
router.post("/forgotpassword",forgotPassword)
router.post("/resetpassword/:token",resetPassword)





module.exports = router;