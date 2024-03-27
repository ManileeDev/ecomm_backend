const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cartItems: Array,
    userId: String,
    amount: String,
    status: String,
    address: {
        building: { type: String },
        street: { type: String },
        city: { type: String },
        state: { type: String },
        pin: { type: Number },
        country: { type: String },
        contact: { type: Number },
        name: { type: String },
        landmark: { type: String },
    },
    paymentId: String,
    paymentOrderId: String,
    createdAt: Date
})

const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;