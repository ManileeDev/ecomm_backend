const express = require("express")
const {createUser,loginUser,userAddress, getAllUsers, deleteUser} = require("../controllers/userController")
const requireAuth = require("../middlewares/requireAuth")

const router = express.Router()


router.post("/signup",createUser)
router.post("/login",loginUser)
router.post("/address",userAddress)
router.get("/getallusers",requireAuth,getAllUsers)
router.delete("/deleteuser/:id",requireAuth,deleteUser)





module.exports = router;