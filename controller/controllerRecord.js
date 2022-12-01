const {newSignupModel} = require('../model/signupModel');

const record = async(req,res,next)=>{
    const data = req.body;
    const result = await newSignupModel.findOne({ mobile: data.mobile });
    if (result) {
      delete result.name;
      delete result.password;
      delete result._id;
      delete result.userCreatedAt;
      delete result.otp;
      res.json({message:"EXIST",auth:true});
    } else {
      res.json({message:"NOT_EXIST",auth:false});
    }
}

module.exports = {record};