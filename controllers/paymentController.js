const Razorpay = require("razorpay")
const crypto = require("crypto");

const makePayment = async (req,res) =>{
    try{
        const instance = new Razorpay({
            key_id: process.env.rzp_key,
            key_secret: process.env.rzp_secret,
        });
        const {currency,amount,receipt} = req.body;
        const order = await instance.orders.create({currency,amount,receipt});

        if(!order){
            return res.status(500).send({message : "Some error occured"});
        } 
        res.status(200).send({"success": true,order});
    }
    catch(err){
        console.log(err);
        res.status(500).send({message : "Internal Server Error"});
    }
    
}

const verifyPayment = async (req,res) => {
    try{
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256", process.env.rzp_secret).update(sign.toString()).digest("hex");
        if(razorpay_signature === expectedSign){
            return res.status(200).json({"success": true,orderId: razorpay_order_id,paymentId:razorpay_payment_id});
        }
        res.status(400).send("Invalid Signature");
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = {makePayment,verifyPayment};