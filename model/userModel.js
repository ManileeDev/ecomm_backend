const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "customer",
    },
    address: {
      building: { type: String },
      street: { type: String },
      city: { type: String },
      state: { type: String },
      pin: { type: Number },
      country: { type: String },
      contact:{type: Number},
      name:{type: String},
      landmark: {type: String},
    }
  },
  { timestamps: true }
);


const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
