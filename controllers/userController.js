const UserModel = require("../model/userModel")
const bcrypt = require("bcrypt")
const validator = require("validator");
const userModel = require("../model/userModel");
const nodemailer = require('nodemailer');

const jwt = require("jsonwebtoken")

const createToken = (id) => {
    return jwt.sign({ id }, process.env.rzp_secret)
}

const createUser = async(req,res) => {
    const {fullname,email,phone,password} = req.body;
    if(!fullname || !email || !phone || !password){
        return res.status(400).json({message : "All fields must be filled"})
    }
    if(!validator.isEmail(email)){
         return res.status(400).json({message : 'Email is Invaild'})
    }

    if(!validator.isStrongPassword(password)){
         return res.status(400).json({message : 'Password is not Strong'})
    }
    try{
        const user = await UserModel.findOne({email});
    if(user){
       return res.status(400).json({message : "Email already Registered"})
    }

    const hashpassword = await bcrypt.hash(password,10)
    await UserModel.create({fullname,email,phone,password:hashpassword})
    return res.status(201).json({message : "User Registered Successfully"})
    }
    catch(err){
        res.status(400).json({message : err.message})
    }
    
}


const loginUser = async (req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message : "All fields must be filled"})
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({message :"Invalid Email"})
    }
    try{
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).json({message : "No User found with this mail!"})
        }
        const match = await bcrypt.compare(password,user.password)
        if(!match){
            return res.status(404).json({message : "Password did not match"})
        }
        if(user.role == "admin"){
            const token = createToken(user._id)
            return res.status(200).json({status: "Login Successful",user,token})
        }
        res.status(200).json({status: "Login Successful",user})
    }
    catch(e){
        res.status(400).json({err : e.message})
    }
}

const userAddress = async (req, res) => {
    const {address,userId} = req.body;
    try{
        const user = await userModel.findByIdAndUpdate(userId, {address})
        res.status(200).json({status: "Address Updated Successfully",user})
    }
    catch(e){
        res.status(400).json({err : e.message})
    }
}

const getAllUsers = async (req,res) => {
    try{
        const users = await userModel.find()
        const result =  users.map(user =>{
            return {
                fullname : user.fullname,
                email : user.email,
                phone : user.phone,
                userId : user._id
            }
        })
        res.status(200).json(result)

    }
    catch(e){
        res.status(400).json({err : e.message})
    }
}


const deleteUser = async (req, res) => {
    const {id} = req.params;
    try{
        const user = await userModel.findById(id)
        if(!user){
            return res.status(404).json({message : "User not found"})
        }
        if(user.role == "admin"){
            return res.status(400).json({message : "Admin can not be deleted"})
        }
        await userModel.findByIdAndDelete(id)
        res.status(200).json({message : "User Deleted Successfully",user})
    }
    catch(e){
        res.status(400).json({err : e.message})
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "No user Found" });
      }
      const token = jwt.sign(user.email, process.env.SECRET)
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.mail,
            pass: process.env.pass
        },
      });
  
      const mailOptions = {
        from: 'donotreplyleemailer@gmail.com',
        to: email,
        subject: `Password Reset link for ${user.fullname}`,
        text: `https://leecart.netlify.app/resetpassword/${token}`,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res
        .status(200)
        .json({status : "success",message: "Email has been sent to the registered mail" });
    } catch (err) {
      res.json({message: err.message});
    }
  };
  
  const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
      const  email = jwt.verify(token,process.env.SECRET);
      const user = await UserModel.findOne({ email });
      const match = await bcrypt.compare(password, user.password);
      const hash = await bcrypt.hash(password, 10);
  
      if (match) {
        return res.status(400).json({ message: "Password Already Exist" });
      }
  
      await UserModel.findOneAndUpdate({ email }, { password: hash });
      res.status(200).json({message: "password reset successfully",fullname : user.fullname});
    } catch (err) {
      res.json({err : err.message});
    }
  };

module.exports = {createUser,loginUser,userAddress,getAllUsers,deleteUser,forgotPassword,resetPassword}


