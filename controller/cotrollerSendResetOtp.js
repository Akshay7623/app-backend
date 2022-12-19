const fetch = require('node-fetch');
const {otpModel} = require('../model/signupModel');
const resetOtp = async(req,res,next)=>{
    
    const mobile = req.mobile;
    const result = await otpModel.findOne({mobile: mobile});
    if (result) {
      const date = new Date().toString();
      const newOtp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000).toString();
      const Updated = await otpModel.updateOne({mobile:mobile},{otp:newOtp,otpCreatedAt:date});
      // todo call send sms api here
      
      let num = Math.random();
      let url;
      if (num < 0.5){
        url = process.env.OTP_URL_1;
      }else{
        url = process.env.OTP_URL_2;
      }
      const sendSMS =  await fetch(url,{
        method:"post",
        body:JSON.stringify({mobile:mobile,otp:newOtp}),
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${process.env.WHASAPP_BOT_KEY}`
        }
      });
      res.json({message:"OTP_SENT",mobile:mobile});
    }else{
      res.json({message:"INVALID"});
    }

    

};

module.exports={resetOtp};