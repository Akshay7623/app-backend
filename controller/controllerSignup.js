const {newSignupModel, signupModel} = require('../model/signupModel');

const Signup = async (req, res, next) => {
  const UserCheck = async () => {
    const data = await signupModel.findOne({ mobile: req.body.mobile });
    if (data) {
      //user is already registered
      console.log("user is registered");
      res.json({ auth: "useravailable" });
    } else {
      //user is not registered maybe user tried to registered but dont know
      const tried = await newSignupModel.findOne({ mobile: req.body.mobile });
      if (tried) {
        //user tried once or more then once 100% i am sure

        await newSignupModel.deleteMany({ mobile: req.body.mobile });

        let date = new Date().toString();
        req.body.otp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        req.body.userCreatedAt = date;
        let user = new newSignupModel(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;
        delete result.otp;
        delete result._id;
        delete result.userCreatedAt;
        res.json(result);
        //send otp api call
      } else {
        let date = new Date().toString();
        req.body.otp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        req.body.userCreatedAt = date;
        let user = new newSignupModel(req.body);
        let result = await user.save();
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