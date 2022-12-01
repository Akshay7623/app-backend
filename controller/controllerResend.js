const {newSignupModel, signupModel} = require('../model/signupModel');

const resend = async(req,res,next)=>{
    const mobile = req.body.mobile;
    const data = await newSignupModel.findOne({mobile:mobile});
    if(data)
    { 
        const currDate = new Date();
        const oldDate = new Date(data.userCreatedAt);
        const minutes = parseInt(Math.abs(oldDate.getTime() - currDate.getTime()) / (1000 * 60) % 60);
        
        
       if (minutes>0) {
        const date = new Date().toString();
        const newOtp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        const updated = await newSignupModel.updateOne({mobile:mobile},{userCreatedAt:date,otp:newOtp,otpCount:0});
       
        if (updated) {
            //CALLING SEND OTP API
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