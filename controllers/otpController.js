const otpModel = require("../model/OTP")
const nodemailer = require('nodemailer');
const otpGenerator = require("otp-generator");
const userModel = require("../model/userModel");


const generateOTP = async (req,res) => {
    const {email} = req.body;
    const otpgenerated = otpGenerator.generate(4, {lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false });
    try{
        const user = await otpModel.findOne({email})
        const userExist = await userModel.findOne({email})
    if(userExist){
        return res.status(400).json({message : "Email already registered!!"})
    }
    if(!user){
        await otpModel.create({email,otpgenerated})
    }
    else{
        await otpModel.findOneAndUpdate({email},{otpgenerated})
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.mail,
          pass: process.env.pass
        }
      });
      
      const mailOptions = {
        from: 'donotreplyleemailer@gmail.com',
        to: email,
        subject: 'OTP for Account registeration Process',
        text: `OTP:${otpgenerated}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.json({message : "OTP has been generated"})
    }
    catch(e){
        res.json({err: e.message})
    }
}


const validateOTP = async (req,res) => {
    const {email,otp} = req.body;
    try{
        const user = await otpModel.findOne({email})
        if(user.otpgenerated == otp){
            return res.json({message : "OTP Verified Successfully"})
        }
        else{
            res.json({message : "Invalid OTP"})
        }
    }
    catch(e){
        res.json({err: e.message})
    }
}


module.exports = {generateOTP,validateOTP}


