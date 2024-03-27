const cartModel = require("../model/cartModel")
const userModel = require("../model/userModel")

const addtoCart = async (req, res) => {
    const { userId,item_name, price,images,varient,size,qty,prodId} = req.body;
    const prodExist = await cartModel.findOne({userId ,prodId, size});
    try {
       if(!prodExist){
        const cartItems = await cartModel.create({userId,item_name,price,size,images,qty,prodId})
        return res.json({"success" : true,cartItems})
       }
       cartItems = await cartModel.findOneAndUpdate({userId,prodId,size},{item_name,images,price,qty})
       res.json({"success" : true,cartItems})
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const getCart = async(req,res)=>{
    const Id = req.params.userId;
   try{
        const cartItems = await cartModel.find({userId : Id})
        if(cartItems.length == 0){
            return res.status(400).json({message : "No Cart Items found"})
        }
        res.status(200).json(cartItems)
        console.log('inside')
   }
    catch(err){
        res.status(400).json({message : err.message})
    }
}
const removeCart = async(req,res)=>{
    const {id} = req.body;
    try{
        const removeitem = await cartModel.findByIdAndDelete(id);
        res.json({message : "Cart Item Deleted Successfully",removeitem})    
    }catch(err){
        res.json({message: err.message})
    }
}
module.exports = { addtoCart,getCart,removeCart}