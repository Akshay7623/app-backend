const {newSignupModel, signupModel} = require('../model/signupModel');
const Authentication = async(req,res,next)=>{
  const id = req.body.id;
  const result = await signupModel.findOne({ _id: id });
  if (result) {
    res.json({ auth: true, name: result.name, mobile: result.mobile });
  }else{
    res.json({auth:false,message:"USER_NOT_EXIST"});
  }
}
module.exports = {Authentication};