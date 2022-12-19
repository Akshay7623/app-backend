const fetch = require('node-fetch');
const { ReturnDocument } = require('mongoose/node_modules/mongodb');
const {newSignupModel, signupModel} = require('../model/signupModel');

const resend = async(req,res,next)=>{
    const mobile = req.body.mobile;
    if (typeof req.body.mobile === 'undefined' || typeof req.body.mobile === 'number') {
        res.json({message:"INVALID_FORMAT"});
        return;
    }

    if(req.body.mobile.length!==10){
        res.json({message:"INVALID_FORMAT"});
        return;
    }

    const data = await newSignupModel.findOne({mobile:mobile});
    if(data)
    { 
        const currDate = new Date();
        const oldDate = new Date(parseInt(data.userCreatedAt));
        const minutes = parseInt(Math.abs(oldDate.getTime() - currDate.getTime()) / (1000 * 60) % 60);
    
       if (minutes>0) {
        const date = new Date().getTime();
        const newOtp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        const updated = await newSignupModel.updateOne({mobile:mobile},{userCreatedAt:date,otp:newOtp,otpCount:0});
       
        if (updated) {
            //CALLING SEND OTP API
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
            res.json({message:"OTP_UPDATED"});
        }else{
            res.json({message:"ERROR"});
        }
    
    }else{
        res.json({message:"TIME_ERROR"});
    }
     
    }else{
        res.json({success:false,message:"USER_NOT_EXIST"})
    }

}


module.exports = {resend};