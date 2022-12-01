const Jwt = require('jsonwebtoken');
const jwtKey = "MYKEY";
const {newSignupModel, signupModel} = require('../model/signupModel');
const Authentication = async(req,res,next)=>{
    const token = req.body.token;
    const isValid = Jwt.verify(token, jwtKey, async (err) => {
      if (err) {
        res.json({ auth: false });
      } else {
        const data = JSON.parse(atob(token.split(".")[1]));
        const id = data.id;
        const result = await signupModel.findOne({ _id: id });
        if (result) {
          res.json({ auth: true, name: result.name, mobile: result.mobile });
        }else{
          res.json({auth:false,message:"USER_NOT_EXIST"});
        }
        
      }
    });
}

module.exports = {Authentication};