const { otpModel } = require('../model/signupModel');
const Jwt = require("jsonwebtoken");
const jwtKey = process.env.ENTER_NEW_PASS_KEY;

const verify = async (req,res,next)=>{

    let data = await otpModel.findOne({ mobile: req.body.mobile });
    const mobile = req.body.mobile;

      if(!data){
          res.json({message:"INVALID_DATA"});
          return;
      }
      if(typeof req.body.otp === 'undefined'){
        res.json({ message: "INVALID_OTP"});
        return;
      }
        if(req.body.otp.toString().length===4 && data.otpCount<5){
          if (data) {
            if (data.otp == req.body.otp) {
                const token = Jwt.sign({ mobile }, jwtKey, { expiresIn: "300s" });
                res.json({ message: "VALID_OTP", token:token });
            } else {
                await otpModel.updateOne({_id:data._id},{otpCount:data.otpCount+1});
                res.json({ message: "INVALID_OTP"});
            }
          } else {
            res.json({ message: "INVALID", token: "NOT_AVAILABLE" });
          }
        }else{
            res.json({ message: "LIMIT_REACHED", token: "NOT_AVAILABLE" });
        }

}

module.exports = {verify};