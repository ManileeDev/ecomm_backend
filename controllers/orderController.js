const orderModel = require("../model/orderModel");

//Create order - api/create-order
const createOrder = async (req, res) => {
  try{
    const { amount,
      address,
      userId,
      cartItems,
      paymentId,
      paymentOrderId,
      status } = req.body;
    const order = await orderModel.create({
      amount,
      address,
      userId,
      cartItems,
      paymentId,
      paymentOrderId,
      status
    })
    res.json({
      sucess: true,
      order
    })
  }
  catch(err){
    res.status(400).json({err: err.message})
  }
 
};

const getOrder = async (req, res) => {
  const { userId } = req.params;
  const order = await orderModel.find({ userId });
  res.json({
    sucess: true,
    order
  })
}


module.exports = { createOrder, getOrder };
