const fetch = require('node-fetch');
const {newSignupModel, signupModel} = require('../model/signupModel');

const Signup = async (req, res, next) => {
  const UserCheck = async () => {
    const data = await signupModel.findOne({ mobile: req.body.mobile });
    if (data) {
      //user is already registered
      res.json({ auth: "useravailable" });
    } else {
      //user is not registered maybe user tried to registered but dont know
      const tried = await newSignupModel.findOne({ mobile: req.body.mobile });
      if (typeof req.body.name === 'undefined' || typeof req.body.mobile === 'undefined' || typeof req.body.password === 'undefined') {
        res.json({auth:"INVALID_DATA"});
        return;
      }
      if(req.body.mobile.length!==10){
        res.json({auth:"INVALID_DATA"});
        return;
      }
      if(req.body.password.trim().length<6){
        res.json({auth:"INVALID_DATA"});
        return;
      }
      if (tried) {
        
        //user tried once or more then once 100% i am sure

        await newSignupModel.deleteMany({ mobile: req.body.mobile });

        let date = new Date().getTime();
        date = Math.floor(date);
        req.body.otp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        req.body.userCreatedAt = date;
        let user = new newSignupModel(req.body);
        let result = await user.save();

        let num = Math.random();
        let url;
        if (num < 0.5){
          url = process.env.OTP_URL_1;
        }else{
          url = process.env.OTP_URL_2;
        }
        const sendSMS =  await fetch(url,{
          method:"post",
          body:JSON.stringify({mobile:req.body.mobile,otp:req.body.otp}),
          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${process.env.WHASAPP_BOT_KEY}`
          }
        });
        result = result.toObject();
        delete result.password;
        delete result.otp;
        delete result._id;
        delete result.userCreatedAt;
        res.json(result);
        //send otp api call here we have only mobile number in resend

      } else {
        let date = new Date().getTime();
        date = Math.floor(date);
        req.body.otp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        req.body.userCreatedAt = date;
        let user = new newSignupModel(req.body);
        let result = await user.save();
        let num = Math.random();
        let url;
        if (num < 0.5){
          url = process.env.OTP_URL_1;
        }else{
          url = process.env.OTP_URL_2;
        }
        const sendSMS =  await fetch(url,{
          method:"post",
          body:JSON.stringify({mobile:req.body.mobile,otp:req.body.otp}),
          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${process.env.WHASAPP_BOT_KEY}`
          }
        });
        result = result.toObject();
        delete result.password;
        delete result.otp;
        delete result._id;
        delete result.userCreatedAt;
        res.json(result);
        //send otp api call
        
      }
    }
  };
  UserCheck();
};

module.exports = {Signup}