require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const productRouter = require("./routes/products");
const orderRouter = require("./routes/order");
const userRouter = require("./routes/userRoute");
const otpRouter = require("./routes/Otp");
const cartRouter = require("./routes/cart")
const paymentRouter = require("./routes/payment")
const {requireSignIn, isAdmin} = require("./middlewares/authMiddleware");
const morgan = require("morgan");
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api", productRouter);
app.use("/api", orderRouter);
app.use("/api", userRouter);
app.use("/api", otpRouter);
app.use("/api",cartRouter);
app.use("/api", paymentRouter);
// app.get("/test",requireSignIn,isAdmin,(req, res) => {
//   res.send("Protected route");
// });
mongoose
  .connect(process.env.MONG_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`DB Connected and Served is running on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
