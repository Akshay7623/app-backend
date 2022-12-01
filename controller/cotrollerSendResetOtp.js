const Jwt = require('jsonwebtoken');
const jwtKey = "MYKEY";
  
const {otpModel} = require('../model/signupModel');
const resetOtp = async(req,res,next)=>{

    const mobile = req.mobile;
     const result = await otpModel.findOne({mobile: mobile});
    if (result) {
      const date = new Date().toString();
      const newOtp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
      const Updated = await otpModel.updateOne({mobile:mobile},{otp:newOtp,otpCreatedAt:date});
      res.json({message:"OTP_SENT",mobile:mobile});
    }else{
      res.json({message:"INVALID"});
    }

    

};

module.exports={resetOtp};