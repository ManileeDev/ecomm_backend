const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")
const requireSignIn = async (req,res,next) => {
   try{
       const decode = jwt.verify(req.headers.authorization,process.env.SECRET)
       req.user = decode;
       next()
   }
   catch(err){
    console.log(err)
   }
}

const isAdmin = async (req,res,next) => {
    try {
        const user = await userModel.findById(req.user.id);
        if(user.role !== "admin"){
            return res.status(400).send("Unauthorised Access")
        }
        else{
            next()
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {requireSignIn,isAdmin};