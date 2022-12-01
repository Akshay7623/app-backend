const {otpModel, signupModel} = require('../model/signupModel');
const Forgotpass = async(req,res,next)=>{
    const mobile = req.body.mobile;
    const data = await signupModel.findOne({mobile:mobile})
    if(data)
    {   
        const OtpData = await otpModel.findOne({mobile:mobile});
        

        if (OtpData) {
            const currDate = new Date();
            const oldDate = new Date(OtpData.otpCreatedAt);
            const minutes = parseInt(Math.abs(oldDate.getTime() - currDate.getTime()) / (1000 * 60) % 60);
            
            if (minutes>0) {
                const date = new Date().toString();
                const newOtp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
                const Updated = await otpModel.updateOne({mobile:mobile},{otp:newOtp,otpCreatedAt:date});
                res.json({message:"OTP_SENT",auth:true});
               }else{
                   res.json({message:"TIME_ERROR",auth:false});
               }
        }else{
            const date = new Date().toString();
            const newOtp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
            const data = otpModel({mobile:mobile,otp:newOtp,otpCreatedAt:date});
            const result = await data.save();
            res.json(result);
            //CALL SEND SMS API HERE 
        }

        

    }else{

        res.json({message:"USER_NOT_EXIST",auth:false})
    }
}

module.exports = {Forgotpass};



Jwt.verify(token, jwtKey, (err, authData) => {
    });