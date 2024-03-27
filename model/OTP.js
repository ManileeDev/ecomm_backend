const mongoose = require("mongoose")

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required : true
    },
    otpgenerated : {
        type: Number,
        required : true 
    }
},{timestamps: true})

const otpModel = mongoose.model("OTP",otpSchema)

module.exports = otpModel;